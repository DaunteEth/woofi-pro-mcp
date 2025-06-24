Below is a comprehensive, TypeScript-focused guide to building a modular MCP server with Smithery and the Orderly Network REST API. All REST endpoints are organized exactly according to Orderly’s official categories, and every file, URL, and configuration you need—along with relevant docs—is listed. Feel free to skip ahead to the section you need.

---

## Summary

You’ll start by scaffolding your project with Smithery’s TypeScript CLI, then define your Smithery and Cursor configs, create modular endpoint wrappers matching Orderly’s categories (Account, Orders, Assets, Positions, Liquidations, Funding), wire them into your `src/index.ts` via the Smithery and Anthropic MCP SDKs, and finally test locally and deploy. All URLs reference the 2025 docs for Smithery and Orderly.

---

## 1. Preparation

* **Smithery CLI (TypeScript MCPs):**
  Getting-Started guide: [https://smithery.ai/docs/build/getting-started](https://smithery.ai/docs/build/getting-started) ([smithery.ai][1])
* **Orderly REST API Intro:**
  Base URLs—Mainnet: `https://api.orderly.org/`, Testnet: `https://testnet-api.orderly.org/` ([orderly.network][2])
* **WOOFi Pro Base Endpoint:**
  `https://api.woo.org` (HMAC-SHA256 signing required)

---

## 2. Scaffold Your Project

Run Smithery’s CLI to bootstrap a TypeScript MCP server:

```bash
npx @smithery/cli plugin init \
  --name woofi-pro \
  --description "WOOFi Pro & Orderly trading tools" \
  --host http://localhost:3000
```

This creates `package.json`, `tsconfig.json`, a stub `src/index.ts`, and `plugin-manifest.json` ([smithery.ai][1]).

---

## 3. Smithery & Cursor Configs

### 3.1 `smithery.yaml`

```yaml
startCommand:
  type: stdio
  command: "npm"
  args: ["run","start"]
configSchema:
  type: object
  properties:
    WOOFI_API_KEY:       { type: string }
    WOOFI_SECRET_KEY:    { type: string }
    WOOFI_BASE_ENDPOINT: { type: string }
    WOOFI_ACCOUNT_ID:    { type: string }
    WOOFI_CHAIN_ID:      { type: string }
    WOOFI_BROKER_ID:     { type: string }
  required:
    - WOOFI_API_KEY
    - WOOFI_SECRET_KEY
    - WOOFI_BASE_ENDPOINT
```

Smithery project config reference: [https://smithery.ai/docs/build/project-config](https://smithery.ai/docs/build/project-config) ([smithery.ai][3]).

### 3.2 `plugin-manifest.json`

```jsonc
{
  "mcp_version":"1.0.0",
  "name":"woofi-pro",
  "version":"1.0.0",
  "description":"WOOFi Pro & Orderly trading tools",
  "tools":[
    {
      "name":"get_account_info",
      "description":"Fetch account balances and fee tiers",
      "parameters":{ "type":"object","properties":{} },
      "http":{ "method":"GET","url":"https://api.orderly.org/v1/account","headers":{} }
    },
    {
      "name":"get_positions",
      "description":"List open positions",
      "parameters":{ "type":"object","properties":{"symbol":{"type":"string"}} },
      "http":{ "method":"GET","url":"https://api.orderly.org/v1/positions","headers":{} }
    },
    {
      "name":"create_order",
      "description":"Place a spot/perp order on Orderly",
      "parameters":{ /* symbol, order_type, order_quantity, etc. */ },
      "http":{ "method":"POST","url":"https://api.orderly.org/v1/order","headers":{"Content-Type":"application/json"} }
    },
    {
      "name":"batch_create_orders",
      "description":"Batch-create up to 10 orders",
      "parameters":{ /* same as create_order in array */ },
      "http":{ "method":"POST","url":"https://api.orderly.org/v1/batch-order","headers":{"Content-Type":"application/json"} }
    },
    {
      "name":"create_woofi_order",
      "description":"Place an order via WOOFi Pro",
      "parameters":{ /* tokenIn, tokenOut, amountIn */ },
      "http":{ "method":"POST","url":"{{env.WOOFI_BASE_ENDPOINT}}/evm-api/restful-api/private/create-order","headers":{"Content-Type":"application/json"} }
    }
    // …add other tools (cancel_order, get_trades, funding_rates, etc.)…
  ]
}
```

Smithery HTTP-connector manifest: [https://smithery.ai/docs/build/getting-started](https://smithery.ai/docs/build/getting-started) ([smithery.ai][4]).

### 3.3 `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "woofi-pro": {
      "command":"npm",
      "args":["run","start"],
      "env":{
        "WOOFI_API_KEY":"…",
        "WOOFI_SECRET_KEY":"…",
        "WOOFI_BASE_ENDPOINT":"https://api.woo.org",
        "WOOFI_ACCOUNT_ID":"…",
        "WOOFI_CHAIN_ID":"42161",
        "WOOFI_BROKER_ID":"woofi_pro"
      }
    }
  }
}
```

Cursor integration docs: [https://smithery.ai/docs/use](https://smithery.ai/docs/use) ([smithery.ai][5]).

---

## 4. Modular Endpoint Wrappers

Create `src/endpoints/` with files matching Orderly’s categories. Each exports functions performing the HTTP calls (handling headers, signing, etc.).

### 4.1 Account Endpoints (`account.ts`)

```ts
// src/endpoints/account.ts
import fetch from "node-fetch";

export async function getAccountInfo() {
  return fetch("https://api.orderly.org/v1/account", { method:"GET", headers: {/* auth headers */} }).then(r=>r.json());
}

export async function getPositions(symbol?: string) {
  const url = new URL("https://api.orderly.org/v1/positions");
  if (symbol) url.searchParams.set("symbol", symbol);
  return fetch(url.toString(), { method:"GET", headers:{} }).then(r=>r.json());
}
```

Docs:

* **GET /v1/account**: [https://orderly.network/docs/build-on-omnichain/evm-api/introduction](https://orderly.network/docs/build-on-omnichain/evm-api/introduction) ([orderly.network][2])
* **GET /v1/positions**: same section ([orderly.network][2])

### 4.2 Order Endpoints (`orders.ts`)

```ts
// src/endpoints/orders.ts
import fetch from "node-fetch";

export async function createOrder(params) {
  return fetch("https://api.orderly.org/v1/order", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(params)
  }).then(r=>r.json());
}

export async function batchCreateOrders(batch) {
  return fetch("https://api.orderly.org/v1/batch-order", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(batch)
  }).then(r=>r.json());
}
```

Docs:

* **POST /v1/order**: [https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/private/create-order](https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/private/create-order) ([orderly.network][2])
* **POST /v1/batch-order**: [https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/private/batch-create-order](https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/private/batch-create-order) ([orderly.network][6])

### 4.3 Assets & PnL (`assets.ts`)

```ts
// src/endpoints/assets.ts
export async function getAssetHistory() { /* GET /v1/asset/history */ }
export async function createWithdrawRequest(body) { /* POST /v1/withdraw_request */ }
export async function settlePnl() { /* POST /v1/pnl_settlement */ }
```

Docs: [https://orderly.network/docs/build-on-omnichain/evm-api/introduction](https://orderly.network/docs/build-on-omnichain/evm-api/introduction) ([orderly.network][2]).

### 4.4 Positions (`positions.ts`)

```ts
// src/endpoints/positions.ts
export async function getAllPositions() { return getPositions(); }
export async function getPositionBySymbol(symbol) { return getPositions(symbol); }
```

Same `/v1/positions` as above ([orderly.network][2]).

### 4.5 Liquidations (`liquidations.ts`)

```ts
// src/endpoints/liquidations.ts
export async function getLiquidations() { /* GET /v1/liquidation */ }
export async function claimLiquidation(params) { /* POST /v1/liquidation */ }
```

Docs: see Orderly API reference under “Liquidation” .

### 4.6 Funding (`funding.ts`)

```ts
// src/endpoints/funding.ts
export async function getFundingRates(symbol?: string) {
  // GET /v1/funding_rates
}
```

Docs: see “Funding Rates” section .

### 4.7 WOOFi Client (`woofiClient.ts`)

```ts
// src/endpoints/woofiClient.ts
import fetch from "node-fetch";
import crypto from "crypto";

export async function placeWoofiOrder(input) {
  // as shown earlier, HMAC-sign and POST to https://api.woo.org/evm-api/restful-api/private/create-order
}
```

WOOFi Pro docs: [https://learn.woo.org](https://learn.woo.org) .

---

## 5. Wire It All Together (`src/index.ts`)

```ts
import { createStatelessServer } from "@smithery/sdk/server/stateless.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod";

// Import endpoint modules:
import * as Account       from "./endpoints/account.js";
import * as Orders        from "./endpoints/orders.js";
import * as Assets        from "./endpoints/assets.js";
import * as Positions     from "./endpoints/positions.js";
import * as Liquidations  from "./endpoints/liquidations.js";
import * as Funding       from "./endpoints/funding.js";
import * as WoofiClient   from "./endpoints/woofiClient.js";

const mcp = new McpServer({ name:"woofi-pro", version:"1.0.0" });

// Register tools with Zod schemas and handlers:
mcp.registerTool("get_account_info",   { title:"Account Info",   inputSchema:z.object({}) }, Account.getAccountInfo);
mcp.registerTool("get_positions",      { title:"Positions",      inputSchema:z.object({symbol:z.string().optional()}) }, Account.getPositions);
mcp.registerTool("create_order",       { title:"Create Order",   inputSchema:z.object({/* symbol, type, qty */}) }, Orders.createOrder);
mcp.registerTool("batch_create_orders",{ title:"Batch Orders",   inputSchema:z.array(z.any()) }, Orders.batchCreateOrders);
mcp.registerTool("get_asset_history",  { title:"Asset History",  inputSchema:z.object({}) }, Assets.getAssetHistory);
mcp.registerTool("get_funding_rates",  { title:"Funding Rates",  inputSchema:z.object({symbol:z.string().optional()}) }, Funding.getFundingRates);
mcp.registerTool("create_woofi_order", { title:"WOOFi Order",     inputSchema:z.object({tokenIn:z.string(),tokenOut:z.string(),amountIn:z.string()}) }, WoofiClient.placeWoofiOrder);
// …register liquidations, PnL, etc…

const app = createStatelessServer(() => mcp).app;
app.listen(process.env.PORT||3000, () => console.log("🟢 MCP server listening")) ;
```

Smithery TypeScript SDK example: [https://github.com/smithery-ai/cli](https://github.com/smithery-ai/cli) ([github.com][7]).

---

## 6. Testing Locally

* **StdIO + Inspector:**

  ```bash
  npm run start
  npx @modelcontextprotocol/inspector node dist/index.js
  ```
* **HTTP+SSE:**

  ```bash
  curl http://localhost:3000/mcp
  curl -X POST http://localhost:3000/mcp -d '{"method":"create_order",...}'
  ```

---

## 7. CI & Deployment

* **Dockerfile** (Alpine Node 18)
* **GitHub Actions**: `install → build → test` (see [https://smithery.ai/docs/build/deployments](https://smithery.ai/docs/build/deployments)) ([smithery.ai][8])
* **Smithery Hosting:** Push to GitHub and connect your repo at [https://smithery.ai/docs/build/deployments](https://smithery.ai/docs/build/deployments) ([smithery.ai][8]).

---

This structure keeps each category of REST calls in its own module, references all the necessary URLs and docs, and shows exactly how to wire everything together in TypeScript using npx and the modern MCP frameworks.

[1]: https://smithery.ai/docs/build/getting-started?utm_source=chatgpt.com "Getting Started - Smithery Documentation"
[2]: https://orderly.network/docs/build-on-omnichain/evm-api/introduction?utm_source=chatgpt.com "Introduction - Orderly Network"
[3]: https://smithery.ai/docs/build/project-config?utm_source=chatgpt.com "Project Configuration - Smithery Documentation"
[4]: https://smithery.ai/docs/build?utm_source=chatgpt.com "Build MCPs - Smithery Documentation"
[5]: https://smithery.ai/docs/use?utm_source=chatgpt.com "Use MCPs - Smithery Documentation"
[6]: https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/private/batch-create-order?utm_source=chatgpt.com "Batch Create Order - Orderly Network"
[7]: https://github.com/smithery-ai/cli?utm_source=chatgpt.com "smithery-ai/cli: Install, manage and develop MCP servers - GitHub"
[8]: https://smithery.ai/docs/build/deployments?utm_source=chatgpt.com "Deployments - Smithery Documentation"
