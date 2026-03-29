# PayPal 集成指南：沙箱测试与生产迁移

本指南详细说明如何在 Berberine 项目中配置 PayPal 沙箱环境进行测试，以及如何平滑迁移到生产环境。

## 1. 沙箱环境测试指南 (Sandbox Testing)

### 1.1 前置准备

你需要拥有一个 PayPal 开发者账号 (https://developer.paypal.com/)。

1.  登录 PayPal Developer Dashboard。
2.  进入 **Apps & Credentials**，确保在 **Sandbox** 模式下。
3.  创建一个 App (例如 `Berberine Sandbox`)。
4.  获取 `Client ID` 和 `Secret`。
5.  在 **Testing Tools > Sandbox Accounts** 中，你应该有两个默认账号：
    -   **Business Account**: 模拟商家（接收付款）。
    -   **Personal Account**: 模拟买家（支付款项）。
6.  (可选) 如果不使用自动化脚本，你需要在 Business Account 中手动创建订阅计划 (Product & Plan) 并获取 `Plan ID`。

### 1.2 本地/开发环境配置

我们建议使用初始化脚本来自动创建 Product 和 Plan，而不是手动创建。

1.  **设置基础环境变量**：
    在部署或本地测试前，确保已设置 `PAYPAL_CLIENT_ID` 和 `PAYPAL_CLIENT_SECRET`。

    ```bash
    supabase secrets set PAYPAL_ENVIRONMENT="sandbox"
    supabase secrets set PAYPAL_CLIENT_ID="<你的_Sandbox_Client_ID>"
    supabase secrets set PAYPAL_CLIENT_SECRET="<你的_Sandbox_Secret>"
    ```

2.  **部署初始化脚本**：
    ```bash
    supabase functions deploy paypal-init --no-verify-jwt
    ```

3.  **运行初始化脚本**：
    访问 Edge Function URL (例如 `https://<project-ref>.supabase.co/functions/v1/paypal-init`)。
    该脚本会自动：
    - 创建一个名为 "Berberine Membership" 的 Product。
    - 创建一个名为 "Yearly Membership" 的 Plan (29 CNY/Year)。
    - 返回 `productId` 和 `planId`。

4.  **保存 Plan ID**:
    将脚本返回的 `planId` 保存到 Secrets 中：
    ```bash
    supabase secrets set PAYPAL_SUBSCRIPTION_PLAN_ID="<脚本返回的_Plan_ID>"
    ```

**其他必需的环境变量：**

```bash
PAYPAL_WEBHOOK_ID="<你的_Sandbox_Webhook_ID>"
SUPABASE_URL="<你的_Supabase_URL>"
SUPABASE_SERVICE_ROLE_KEY="<你的_Service_Role_Key>"
```

### 1.3 Webhook 配置

为了在本地测试 Webhook (订单状态更新)，你需要将本地服务暴露给外网，或者直接使用部署在 Supabase 上的 Edge Function URL。

1.  **部署 Edge Functions**:
    ```bash
    supabase functions deploy payment-checkout
    supabase functions deploy paypal-webhook --no-verify-jwt
    ```
    *(注意: `paypal-webhook` 不需要 JWT 验证，因为它是由 PayPal 调用的)*

2.  **设置 Supabase Secrets**:
    ```bash
    supabase secrets set PAYPAL_ENVIRONMENT=sandbox
    supabase secrets set PAYPAL_CLIENT_ID=...
    supabase secrets set PAYPAL_CLIENT_SECRET=...
    supabase secrets set PAYPAL_SUBSCRIPTION_PLAN_ID=...
    # Webhook ID 需要在下一步获取后设置
    ```

3.  **配置 PayPal Webhook**:
    - 在 PayPal Developer Dashboard > Apps & Credentials > Your App > Sandbox。
    - 滚动到 **Webhooks** 部分，点击 **Add Webhook**。
    - **Webhook URL**: `https://<your-project-ref>.supabase.co/functions/v1/paypal-webhook`
    - **Event Types** (勾选以下事件):
        - `Payment sale completed`
        - `Payment capture completed`
        - `Checkout order completed`
        - `Billing subscription activated`
        - `Billing subscription updated`
        - `Billing subscription cancelled`
        - `Billing subscription expired`
        - `Billing subscription suspended`
        - `Billing subscription re-activated`
    - 保存后，复制生成的 **Webhook ID**。

4.  **更新 Webhook ID Secret**:
    ```bash
    supabase secrets set PAYPAL_WEBHOOK_ID=<新生成的_Webhook_ID>
    ```

### 1.4 测试流程

**A. 一次性支付测试 (普通商品)**

1.  确保数据库 `berberine_products` 中有测试商品。
2.  在前端或通过 Postman 调用 `/payment-checkout`：
    ```json
    {
      "type": "one-time",
      "items": [{ "productId": "<product_id>", "quantity": 1 }],
      "userId": "<user_id>",
      "callbackBaseUrl": "http://localhost:5173"
    }
    ```
3.  获取返回的 `checkoutUrl`，在浏览器打开。
4.  使用 **Sandbox Personal Account** 登录并支付。
5.  支付完成后，页面应跳转回 `callbackBaseUrl` 指定的页面。
6.  **验证**:
    - 检查 `berberine_orders` 表，该订单状态应变为 `paid`。
    - 检查 `berberine_order_items` 是否有对应记录。

**B. 订阅支付测试 (会员)**

1.  调用 `/payment-checkout`：
    ```json
    {
      "type": "subscription",
      "planId": "<sandbox_plan_id>",
      "userId": "<user_id>",
      "callbackBaseUrl": "http://localhost:5173"
    }
    ```
2.  打开 `checkoutUrl`，使用 **Sandbox Personal Account** 登录并同意订阅。
3.  **验证**:
    - PayPal 可能会有一定的延迟触发 Webhook。
    - 检查 `berberine_orders` 表，首付订单状态应为 `paid`。
    - 检查 `berberine_subscriptions` 表，应有一条 `status = 'active'` 的记录。

### 1.5 模拟与自动化验证

在沙箱环境下，可以使用内置脚本模拟 Webhook 事件以加速验证：

1) 手动模拟脚本  
- 续费事件（PAYMENT.SALE.COMPLETED）：
  ```bash
  API_BASE=http://localhost:8788 npm run simulate:paypal:renewal -- --subscriptionId=I-XXXX
  ```
- 一次性支付（PAYMENT.CAPTURE.COMPLETED）：
  ```bash
  API_BASE=http://localhost:8788 npm run simulate:paypal:capture -- --orderId=ORDER-XXXX
  ```
说明：
- API_BASE 指向你的 API 地址（/api）；默认 http://localhost:8788
- 续费脚本需要订阅 ID（`berberine_subscriptions.provider_subscription_id`）
- 一次性脚本需要订单 OrderID（`berberine_orders.provider_session_id` 对应的 PayPal Order）
- 沙箱模式下请求会携带 `x-paypal-skip-verify: 1` 以跳过签名校验；需确保 `PAYPAL_ENVIRONMENT=sandbox`

2) 自动续费模拟脚本（可自动获取订阅 ID）  
- A：使用 ACCESS_TOKEN 自动读取 `/api/membership/overview`
  ```bash
  API_BASE=http://localhost:8788 ACCESS_TOKEN=<token> npm run test:paypal:renewal:auto
  ```
- B：直接指定订阅 ID
  ```bash
  API_BASE=http://localhost:8788 SUBSCRIPTION_ID=I-XXXX npm run test:paypal:renewal:auto
  ```
命令与文件：
- `scripts/simulate-paypal-webhook.js`（手动）
- `scripts/run-paypal-sandbox-test.js`（自动）
- `package.json` 脚本：
  - `simulate:paypal:renewal`
  - `simulate:paypal:capture`
  - `test:paypal:renewal:auto`

验证清单：
- 订阅续费（SALE）：
  - `berberine_subscriptions`：`current_period_start`/`current_period_end` 更新，`status='active'`
  - `berberine_orders`：新增一条 `status='paid'`、`payment_type='subscription_renewal'`，`provider_transaction_id` 唯一（重复触发不应重复）
- 一次性（CAPTURE）：
  - `berberine_orders`：匹配 `provider_session_id` 的订单更新为 `status='paid'`，写入 `provider_transaction_id`
- 设置页（/settings）：
  - 来源显示为「PayPal 订阅」
  - 周期起止时间与数据库一致
  - 展示「最近续费」金额/币种/日期
  - 若存在失败/取消订单，显示红色「最近失败」提示
  - 「查看全部订单/兑换记录」对话框展示完整列表
- 幂等与日志：
  - 重复发送相同交易 ID 不应新增重复订单
  - `berberine_webhook_events` 记录处理状态与错误信息

常见问题：
- 400「Invalid webhook signature」：
  - 确认 `PAYPAL_ENVIRONMENT=sandbox`
  - 请求包含 `x-paypal-skip-verify: 1`
  - 若由 Dashboard 触发，确保 `PAYPAL_WEBHOOK_ID` 正确
- 找不到订阅/订单：
  - 续费：检查 `subscriptionId` 是否来自 `berberine_subscriptions.provider_subscription_id`
  - 一次性：检查 `orderId` 是否为 `berberine_orders.provider_session_id` 对应的 PayPal Order

---

## 2. 生产环境迁移指南 (Production Migration)

当沙箱测试通过后，按照以下步骤切换到生产环境。

### 2.1 PayPal 生产环境准备

1.  登录 PayPal Developer Dashboard。
2.  切换到 **Live** 模式。
3.  创建一个 Live App (例如 `Berberine Production`)。
4.  获取生产环境的 `Client ID` 和 `Secret`。
5.  使用真实的 PayPal 商家账号登录 https://www.paypal.com/。
6.  创建真实的订阅计划 (Product & Plan)，获取生产环境的 `Plan ID`。

### 2.2 配置生产 Webhook

1.  在 Live App 设置中，添加 Webhook。
2.  **URL**: `https://<your-project-ref>.supabase.co/functions/v1/paypal-webhook` (通常 URL 不变，除非你有独立的生产环境项目)。
3.  **Event Types**: 选择与沙箱环境相同的事件类型。
4.  获取生产环境的 **Webhook ID**。

### 2.3 更新 Supabase Secrets (生产环境)

你需要更新 Supabase 上的环境变量。

**重要**: 建议先在通过 `supabase secrets list` 备份当前配置，或确保你有记录。

运行以下命令更新 Secrets：

```bash
supabase secrets set PAYPAL_ENVIRONMENT="production"
supabase secrets set PAYPAL_CLIENT_ID="<生产环境_Client_ID>"
supabase secrets set PAYPAL_CLIENT_SECRET="<生产环境_Secret>"
supabase secrets set PAYPAL_WEBHOOK_ID="<生产环境_Webhook_ID>"
supabase secrets set PAYPAL_SUBSCRIPTION_PLAN_ID="<生产环境_Plan_ID>"
```

### 2.4 验证生产环境

1.  **小额真实支付验证**:
    - 在生产环境中进行一次真实的订阅或购买（建议创建一个低价的测试商品或 Plan，或者支付后立即退款）。
    - 确认资金进入了你的 PayPal 商家账户。
    - 确认数据库状态正确更新。

2.  **日志监控**:
    - 在 Supabase Dashboard 中监控 Edge Functions 的日志，确保没有报错。

### 2.5 回滚方案

如果生产环境出现问题，可以通过将环境变量切回沙箱值来进行回滚（前提是代码逻辑兼容，目前代码逻辑是通过环境变量控制的，是兼容的）。

```bash
supabase secrets set PAYPAL_ENVIRONMENT="sandbox"
# ... 重新设置沙箱的 ID 和 Secret
```
