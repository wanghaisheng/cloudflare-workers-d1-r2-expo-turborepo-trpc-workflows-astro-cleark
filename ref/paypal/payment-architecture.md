Berberine 支付架构设计（PayPal）
================================

1. 目标与范围
--------------

- 支持两类支付场景：
  - 会员年付订阅（例如：29 元 / 年会员）
  - 普通商品一次性购买（Products 页面的小檗碱商品）
- 使用 PayPal 作为统一支付提供方，同时保留与 Stripe 等其它 provider 解耦的设计。
- 与 Supabase 数据库、Edge Functions、前端 React 应用打通一条完整闭环：下单 → 跳转支付 → 回调/通知 → 更新订单与订阅 → 前端展示。


2. 数据模型设计
----------------

2.1 berberine_orders 扩展（一次性 + 订阅订单）
-------------------------------------------

在现有 `public.berberine_orders` 表基础上扩展字段，使其同时支持：

- 普通商品一次性订单
- 订阅首付订单
- 订阅续费订单（可选）

建议新增字段（通过迁移实现）：

- `payment_provider TEXT`  
  - 支付提供方标识，例如：`'paypal'`
- `payment_type TEXT`  
  - 支付类型：`'one-time' | 'subscription' | 'renew'`
- `provider_session_id TEXT`  
  - PayPal 侧用于查询的会话 ID  
  - 一次性：PayPal order id（`/v2/checkout/orders/{id}`）  
  - 订阅：PayPal subscription id（`/v1/billing/subscriptions/{id}`）
- `provider_subscription_id TEXT`  
  - PayPal subscription id 的冗余存储，便于 JOIN 订阅表
- `provider_transaction_id TEXT`  
  - 实际收款交易 ID（capture / sale id），用于幂等和对账
- `currency TEXT`  
  - 货币代码，例如：`'CNY'`
- `metadata JSONB DEFAULT '{}'`  
  - 存业务侧元数据，例如：
    - `plan_id`：业务定价表里的会员计划 ID（如 `membership_yearly_29`）
    - `locale`：下单时使用的语言
    - `items`：一次性订单的简要明细

索引建议：

- `idx_orders_provider_session (payment_provider, provider_session_id)`
- `idx_orders_provider_transaction (payment_provider, provider_transaction_id)`


2.2 berberine_subscriptions（长期会员状态）
------------------------------------------

新增 `public.berberine_subscriptions` 表，用于记录每个用户的会员订阅状态。该表是 docs/paypal/types.txt 中 `SubscriptionInfo` 的落地版本。

核心字段：

- 主键与关联：
  - `id UUID PRIMARY KEY`
  - `user_id UUID NOT NULL`
  - `payment_provider TEXT NOT NULL`（如 `'paypal'`）
  - `provider_subscription_id TEXT NOT NULL`  
    - PayPal subscription.id，对应 `/v1/billing/subscriptions/{id}`  
    - 需要唯一索引
- 业务维度：
  - `plan_id TEXT NOT NULL`  
    - 业务定价表中的会员计划 ID，例如 `membership_yearly_29`
  - `description TEXT`  
    - 会员名称描述，例如「年付会员」
- 价格与周期：
  - `amount_cents INTEGER NOT NULL`  
    - 价格（分）整型，避免浮点误差
  - `currency TEXT NOT NULL`  
    - 货币代码，例如 `'CNY'`
  - `interval TEXT NOT NULL`  
    - 计费周期，例如 `'year'`
  - `interval_count INTEGER NOT NULL DEFAULT 1`  
    - 间隔倍数，例如 1 年
- 当前周期：
  - `current_period_start TIMESTAMPTZ NOT NULL`
  - `current_period_end TIMESTAMPTZ NOT NULL`
- 状态与取消信息：
  - `status TEXT NOT NULL DEFAULT 'active'`  
    - 推荐值：`'active' | 'pending_cancel' | 'canceled' | 'expired' | 'trialing'`
  - `canceled_at TIMESTAMPTZ`  
    - 用户发起取消的时间
  - `canceled_end_at TIMESTAMPTZ`  
    - 实际停用时间（通常为当前周期结束时间）
  - `canceled_reason TEXT`
  - `canceled_reason_type TEXT`
- 管理与扩展：
  - `billing_url TEXT`  
    - PayPal 自动扣款管理链接
  - `metadata JSONB DEFAULT '{}'`
  - `created_at TIMESTAMPTZ DEFAULT now()`
  - `updated_at TIMESTAMPTZ DEFAULT now()`

约束与索引：

- 唯一索引：`(payment_provider, provider_subscription_id)`
- 索引：`user_id`

RLS 策略建议：

- 只允许用户 `SELECT` 自己的记录（`user_id = auth.uid()`）
- 插入 / 更新由服务端（后端 API 或 Edge Function）通过 service key 完成。


3. 支付服务抽象（Payment Service）
---------------------------------

支付服务层参考 docs/paypal 中的抽象：

- 类型定义：`docs/paypal/types.txt`
  - `PaymentOrder`：创建支付时的通用入参
  - `PaymentType`：`ONE_TIME | SUBSCRIPTION | RENEW`
  - `PaymentSession` / `CheckoutSession`
  - `PaymentEvent` / `PaymentEventType`
- PayPal 具体实现：`docs/paypal/paypal.txt` 中的 `PayPalProvider`

统一设计原则：

- 业务代码只构造 `PaymentOrder`，不直接关心 PayPal 具体 API。
- `paymentService.createPayment(order)` 内部选择 provider（当前为 PayPal）并调用 `PayPalProvider`。
- 通过 `PaymentType` 区分一次性与订阅：
  - 一次性购买：`PaymentType.ONE_TIME`
  - 首次订阅支付：`PaymentType.SUBSCRIPTION`
  - 续费（若需要通过本地 API 触发）：`PaymentType.RENEW`

3.1 一次性购买（普通商品）
------------------------

流程：

1. 业务构造 `PaymentOrder`：
   - `type = ONE_TIME`
   - `price = { amount: 金额（分）, currency: 'CNY' }`
   - `description = '小檗碱商品订单'` 或具体商品标题
   - `successUrl`、`cancelUrl` 指向后端 callback 端点
   - `metadata` 包含 `order_no`、商品明细等
2. `PayPalProvider.createPayment` 调用 `createOneTimePayment`：
   - 请求 `POST /v2/checkout/orders`
   - 从响应中取出 `approve` 类型的链接作为 `checkoutUrl`
3. 返回 `CheckoutSession`，其中 `checkoutInfo.sessionId` 为 PayPal order id。

3.2 订阅（会员年付）
-------------------

流程：

1. 业务构造 `PaymentOrder`：
   - `type = SUBSCRIPTION`
   - `price` 用于展示
   - `plan`：
     - `name`：会员名称，例如「年付会员」
     - `description`：权益描述
     - `interval = YEAR`，`intervalCount = 1`
     - `trialPeriodDays`（可选）
   - `successUrl`、`cancelUrl` 指向 callback 端点
   - `metadata` 包含 `order_no`、`plan_id`、`user_id`
2. `PayPalProvider.createPayment` 调用 `createSubscriptionPayment`：
   - `POST /v1/catalogs/products` 创建 Product
   - `POST /v1/billing/plans` 创建 Plan
   - `POST /v1/billing/subscriptions` 创建 Subscription
3. 返回 `CheckoutSession`，其中：
   - `checkoutInfo.sessionId = subscription.id`
   - `checkoutInfo.checkoutUrl` 为 `approve` 链接。

> **注**：Product 与 Plan 的创建已改为通过初始化脚本 `paypal-init` 预先完成，运行时仅需引用 `plan_id`。


4. 后端 API 设计
----------------

4.1 POST /api/payment/checkout
------------------------------

用途：

- 商品一次性订单：从 Products 页或购物车创建订单并跳转 PayPal。
- 会员订阅：从 Pricing / Subscribe 页创建订阅订单并跳转 PayPal。

请求示例（JSON）：

```json
{
  "type": "one-time",
  "planId": "membership_yearly_29",
  "items": [
    { "productId": "xxx", "quantity": 2 }
  ],
  "callbackBaseUrl": "https://berberine.app"
}
```

主要步骤：

1. 根据请求类型：
   - 一次性订单：从 Supabase `berberine_products` 读取价格并计算总额。
   - 订阅订单：从定价表（pricing.json）读取会员价格与 Plan 配置。
2. 生成业务订单号 `orderNo`。
3. 构造 `PaymentOrder`：
   - 设置 `type`、`price` / `plan`、`successUrl`、`cancelUrl`、`metadata`。
4. 调用 `paymentService.createPayment(order)`：
   - 内部使用 `PayPalProvider.createPayment`。
5. 在 Supabase 中创建订单记录：
   - 插入 `berberine_orders`：
     - `user_id`
     - `total_amount`、`currency`
     - `status = 'pending'`
     - `payment_provider = 'paypal'`
     - `payment_type = 'one-time' | 'subscription'`
     - `provider_session_id = checkoutInfo.sessionId`
     - `metadata` 中写入 `order_no`、`plan_id` 等
   - 一次性订单：同时写入 `berberine_order_items`。
6. 返回：

```json
{
  "checkoutUrl": "https://www.paypal.com/...",
  "orderNo": "2026..."
}
```


4.2 GET /api/payment/callback
-----------------------------

用途：

- PayPal 完成支付后同步重定向的回调端点。
- 负责更新订单与订阅表，然后再重定向到业务页面。

步骤：

1. 从查询参数中解析 `orderNo` 与 `sessionId`（或从 PayPal token 恢复）。
2. 从 `berberine_orders` 中查询对应订单。
3. 调用 `paymentProvider.getPaymentSession({ sessionId })`：
   - 一次性订单：从 `/v2/checkout/orders/{id}` 获取支付状态（必要时自动 capture）。
   - 订阅订单：从 `/v1/billing/subscriptions/{id}` 获取订阅状态，必要时轮询直到 `ACTIVE`。
4. 根据 `PaymentSession`：
   - 一次性：若支付成功，将订单状态改为 `'paid'`，写入 `provider_transaction_id` 等。
   - 订阅：
     - 在 `berberine_subscriptions` 中插入或更新记录；
     - 更新首付订单状态为 `'paid'`，写入 `provider_subscription_id`。
5. 构造回跳 URL：
   - 一次性：默认 `/settings/payments` 或订单详情页。
   - 订阅：默认 `/settings/billing`（可根据业务调整）。
6. 返回 HTTP 重定向到上述 URL。


4.3 POST /api/payment/notify/paypal
-----------------------------------

用途：

- 接收 PayPal Webhook 通知，避免用户关闭浏览器带来的「丢单」。
- 实际由 Supabase Edge Function 实现，可以直接将 Edge Function URL 配置到 PayPal。

处理逻辑参考 docs/paypal/route.txt：

- `CHECKOUT_SUCCESS`：
  - 首次支付成功（一次性或订阅首付），调用内部 `handleCheckoutSuccess`。
- `PAYMENT_SUCCESS`：
  - 若包含 `subscriptionId`：
    - 视为订阅续费，更新 `berberine_subscriptions` 当前周期，并可创建续费订单。
  - 否则：视为一次性支付成功，更新对应订单状态。
- `SUBSCRIBE_UPDATED`：
  - 更新订阅计划或周期信息。
- `SUBSCRIBE_CANCELED`：
  - 标记订阅为取消，填充 `canceled_at` 与 `canceled_end_at`。


5. Supabase Edge Functions：PayPal Webhook
------------------------------------------

目标：

- 使用 Supabase Edge Functions + service role key 完成 webhook 处理和数据库更新。
- 提供一个公开 URL：`https://<project-ref>.functions.supabase.co/paypal-webhook`。

核心步骤：

1. 在 `supabase/functions/paypal-webhook/index.ts` 中：
   - 使用 `createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)` 连接数据库。
   - 读取请求 body 与 headers。
   - 使用 `PAYPAL_WEBHOOK_ID` 调用 PayPal API 校验签名。
   - 根据 `event_type` 分发到不同 handler：
     - 订阅激活/更新：`BILLING.SUBSCRIPTION.ACTIVATED / UPDATED / RE-ACTIVATED`
     - 订阅取消/失效：`BILLING.SUBSCRIPTION.CANCELLED / EXPIRED / SUSPENDED`
     - 支付成功：`PAYMENT.SALE.COMPLETED / PAYMENT.CAPTURE.COMPLETED`
     - 订单完成：`CHECKOUT.ORDER.COMPLETED`
2. 各 handler 中按如下规则更新：
   - 使用 `payment_provider + provider_subscription_id` 更新 `berberine_subscriptions`。
   - 使用 `payment_provider + provider_session_id` 或 `provider_transaction_id` 更新 `berberine_orders`。
3. 所有操作通过 service role key 完成，不受 RLS 限制。


6. 前端集成方案
----------------

6.1 会员订阅入口（Pricing / Subscribe）
-------------------------------------

现状：

- Pricing 页面已展示会员权益与 29 元 / 年价格。
- 目前通过前端组件 `PayPalYearlySection` 直接加载 PayPal JS SDK 并创建订阅。

目标：

- 逐步迁移到「后端驱动」的订阅流程：
  - Pricing / Subscribe 页面不直接调 PayPal JS，而是调用 `/api/payment/checkout`。
  - 由后端统一负责创建 PayPal 订阅与本地订单。

计划：

1. 在 Pricing / Subscribe 页中，为「订阅年付会员」按钮绑定：
   - 调用 `/api/payment/checkout`，请求体：
     - `type = "subscription"`
     - `planId = "membership_yearly_29"`
     - `callbackBaseUrl = window.location.origin`
2. 从响应中拿到 `checkoutUrl`，执行 `window.location.href = checkoutUrl`。
3. 支付完成后，用户通过 `/api/payment/callback` 被重定向回 `/settings/billing`。
4. 在账户设置或会员中心页面，前端通过 Supabase 查询：
   - 当前用户在 `berberine_subscriptions` 中是否有 `status = 'active'` 的记录。
   - 根据结果显示会员状态、到期时间、取消按钮等。


6.2 普通商品一次性购买（Products 页）
------------------------------------

现状：

- [Products.tsx](file:///e:/workspace/berberine-app/src/pages/Products.tsx) 主要负责：
  - 产品数据展示
  - 筛选、排序、搜索、虚拟化渲染
  - 当前只有跳转到 `/products/:slug` 的详情 Link，没有支付入口。

目标：

- 在商品详情页或列表卡片中增加「购买」或「加入购物车并结算」的能力。
- 下单流程使用 `/api/payment/checkout`，统一走 PayPal 一次性支付。

计划：

1. 在商品详情页新增「立即购买」按钮：
   - 收集当前商品 ID、数量（默认 1）等信息。
   - 调用 `/api/payment/checkout`，请求体：
     - `type = "one-time"`
     - `items = [{ productId, quantity }]`
     - `callbackBaseUrl = window.location.origin`
2. 由后端计算总价并创建 `berberine_orders` / `berberine_order_items`。
3. 拿到返回的 `checkoutUrl`，前端跳转 PayPal 完成支付。
4. 支付成功后：
   - callback + webhook 更新订单状态为 `'paid'`。
   - 用户在「我的订单」页面（前端通过 Supabase 查询 `berberine_orders` 和 `berberine_order_items`）可以看到新订单。


7. 配置与环境变量
------------------

前端（Vite）：

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PAYPAL_CLIENT_ID`（若继续支持前端直接加载 PayPal JS SDK）

后端 / Edge Functions：

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_ENVIRONMENT = sandbox | production`

安全原则：

- service role key 仅在后端或 Edge Functions 中使用，不注入浏览器。
- 前端只通过 anon key 访问受 RLS 控制的视图与表。


8. 实施顺序建议
----------------

1. 数据库迁移：
   - 扩展 `berberine_orders` 字段和索引。
   - 创建 `berberine_subscriptions` 表及 RLS 策略。
2. 支付服务层：
   - 在后端整合 docs/paypal 中的 `PayPalProvider` 与通用 `PaymentOrder` 模型。
   - 实现 `/api/payment/checkout` 与 `/api/payment/callback`。
3. Supabase Edge Function：
   - 实现 `paypal-webhook` 函数，完成 webhook 验证与订单/订阅表更新。
   - 在 PayPal Dashboard 配置 webhook URL 与事件类型。
4. 前端接入：
   - Pricing / Subscribe 页改用 `/api/payment/checkout` 创建订阅。
   - Products 详情页增加一次性购买流程。
5. 会员与订单展示：
   - 在用户设置页面展示会员状态与订单列表，基于 Supabase 查询实现。

