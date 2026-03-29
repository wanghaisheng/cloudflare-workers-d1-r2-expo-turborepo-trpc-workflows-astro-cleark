支付架构实现进度追踪
====================

说明：本文件用于追踪 Berberine 支付与订阅架构的具体落地进度，配合  
《payment-architecture.md》中的设计一起使用。


1. 数据库层
-----------

- [x] 在 Supabase 中为 `berberine_orders` 添加支付相关字段  
  - `payment_provider` / `payment_type`  
  - `provider_session_id` / `provider_subscription_id` / `provider_transaction_id`  
  - `currency` / `metadata`  
  - 索引：`idx_orders_provider_session`、`idx_orders_provider_transaction`
- [x] 创建 `berberine_subscriptions` 表  
  - 字段与约束按设计文档 2.2 节实现
- [x] 为 `berberine_subscriptions` 配置 RLS 策略  
  - 用户仅可查询自己的订阅  
  - 插入/更新通过服务端或 Edge Functions 完成


2. 支付服务层（后端）
---------------------

- [x] 在 Supabase Edge Function 中对接 docs/paypal 的 PayPal API（`payment-checkout`）
- [ ] 定义统一的 `PaymentOrder` / `PaymentType` 等类型（可直接复用 docs）
- [ ] 实现 `paymentService.getPaymentSession(sessionId)`  
  - 支持一次性订单与订阅订单的状态查询
- [ ] 实现取消订阅接口（调用 PayPal `/v1/billing/subscriptions/{id}/cancel`）


3. HTTP API / Edge Function 端点
-------------------------------

- [x] `payment-checkout` Edge Function  
  - 支持 `type = "one-time"`（商品）与 `type = "subscription"`（会员）  
  - 从 Supabase 读取价格 / 计划，创建订单并返回 PayPal `checkoutUrl`
- [x] `paypal-webhook` Edge Function  
  - 直接作为 PayPal Webhook 端点，更新订单与订阅状态


4. Supabase Edge Functions
--------------------------

- [x] 新建 `supabase/functions/paypal-webhook` 函数  
  - 使用 `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` 创建 client
- [x] 在函数中实现 PayPal Webhook 校验  
  - 使用 `PAYPAL_WEBHOOK_ID` 调用 PayPal 验签接口
- [x] 按 `event_type` 分发并更新数据库：
  - [x] `CHECKOUT.ORDER.COMPLETED` → 更新一次性订单状态
  - [x] `BILLING.SUBSCRIPTION.ACTIVATED / UPDATED / RE-ACTIVATED` → upsert 订阅表 + 更新首付订单
  - [x] `BILLING.SUBSCRIPTION.CANCELLED / EXPIRED / SUSPENDED` → 标记订阅为取消
  - [ ] `PAYMENT.SALE.COMPLETED / PAYMENT.CAPTURE.COMPLETED` → 处理续费或一次性支付成功
- [ ] 在 PayPal Dashboard 配置 webhook URL 与事件类型


5. 前端集成：会员订阅
--------------------

- [x] Pricing / Subscribe 页面接入新后端：
  - 点击「年付会员」按钮时，调用 `payment-checkout`（`type = "subscription"`）
  - 使用返回的 `checkoutUrl` 跳转 PayPal
- [ ] 用户支付完成后，通过 webhook 更新数据库（已部分完成，仍需真实环境验证）
- [ ] 在「设置 / 会员」页面展示：
  - 当前会员状态（active/pending_cancel/canceled）
  - 当前周期起止时间
  - 取消订阅入口（调用后端取消订阅接口）
- [ ] 使用 Supabase 客户端在前端读取 `berberine_subscriptions`，用于控制会员权益（论文解读、下载等）


6. 前端集成：商品一次性购买
--------------------------

- [x] 在产品详情页新增「立即购买」按钮，走统一的支付流程
- [x] 将商品 ID 与数量传递给 `payment-checkout`（`type = "one-time"`）
- [x] 使用返回的 `checkoutUrl` 跳转 PayPal 完成支付
- [ ] 在「我的订单」页面通过 `berberine_orders` / `berberine_order_items` 展示订单列表和详情（依赖真实订单数据进一步验证）


7. 配置与环境
-------------

- [x] 在 Supabase 项目环境变量中配置：
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `PAYPAL_CLIENT_ID`
  - `PAYPAL_CLIENT_SECRET`
  - `PAYPAL_WEBHOOK_ID`
  - `PAYPAL_ENVIRONMENT`
- [ ] 在前端 `.env` 中配置：
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - 如需要前端 PayPal JS：`VITE_PAYPAL_CLIENT_ID`


8. 验证与监控
-------------

- [ ] 在 PayPal sandbox 环境中完成端到端测试：
  - 一次性订单：创建 → 支付 → 回调 → Webhook → 订单状态更新
  - 订阅订单：创建 → 首次支付 → Webhook → 订阅表更新
  - 订阅续费：模拟周期续费事件，检查订阅周期更新与续费订单记录
  - 订阅取消：在 PayPal 控制台取消，验证本地订阅状态同步
- [ ] 为支付与订阅相关操作增加日志与告警：
  - Edge Function 的错误日志
  - 数据库中异常状态（例如订单长时间 pending）

9. 文档与指南
------------

- [x] 编写沙箱测试与生产迁移指南 (`docs/paypal/integration-guide.md`)
