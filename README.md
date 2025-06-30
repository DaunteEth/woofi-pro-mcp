# 🚀 WOOFi Pro MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A **Model Context Protocol (MCP)** server providing **40 comprehensive trading tools** for WOOFi Pro and Orderly Network integration. Built for **universal compatibility** with Cursor IDE, Claude Desktop, Windsurf, and all MCP-compatible applications.

## ✨ Features

- **🎯 Platform-Specific Configuration**: Smithery-style commands for precise MCP client targeting
- **40 Trading Tools**: Complete suite for DeFi and derivatives trading
- **Orderly Network API**: Direct integration with institutional-grade infrastructure  
- **Universal Compatibility**: Works with Cursor, Claude Desktop, Windsurf, and all MCP clients
- **Flexible Setup**: Auto-config, .env files, OR direct config - all methods supported
- **CCXT-Style Security**: API keys never hardcoded in our repo, always user-provided
- **Automatic Authentication**: Seamless ed25519 signature-based auth
- **Multi-Platform Support**: Claude Desktop, Cursor IDE, VSCode, and Windsurf
- **Safe Config Management**: Creates backups before making any changes

## 🎯 Available Tools (40 Total)

| Category | Count | Tools | Description |
|----------|-------|--------|-------------|
| **Account** | 3 | `get_account_info`, `get_positions`, `get_orders` | Account information and key details |
| **Orders** | 18 | `create_order`, `batch_create_orders`, `edit_order`, `cancel_order`, `cancel_order_by_client_id`, `cancel_all_pending_orders`, `cancel_all_after`, `get_orders`, `get_order_by_id`, `get_order_by_client_id`, `create_algo_order`, `edit_algo_order`, `cancel_algo_order`, `cancel_algo_order_by_client_id`, `cancel_all_pending_algo_orders`, `get_algo_orders`, `get_algo_order_by_id`, `get_algo_order_by_client_id` | Complete order management and execution |
| **Assets** | 8 | `get_asset_history`, `get_holdings`, `create_withdraw_request`, `get_settle_pnl_nonce`, `request_pnl_settlement`, `get_pnl_settlement_history`, `create_internal_transfer`, `get_internal_transfer_history` | Asset operations, PnL settlement, and transfers |
| **Positions** | 3 | `get_all_positions`, `get_position_by_symbol`, `get_position_history` | Position tracking and management |
| **Liquidations** | 6 | `get_liquidated_positions`, `get_liquidations`, `get_positions_under_liquidation`, `claim_liquidated_positions`, `claim_insurance_fund`, `get_insurance_fund` | Liquidation monitoring and claims |
| **Funding** | 1 | `get_funding_fee_history` | Funding rate data and history |

## 🚀 Quick Setup

### 🎯 Option A: Auto-Configuration (Recommended)

**Choose your platform and configure instantly** - Smithery-style commands:

**Claude Desktop:**
```bash
npx -y git+https://github.com/DaunteEth/woofi-pro-mcp woofi-pro \
  --client claude \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

**Cursor IDE:**
```bash
npx -y git+https://github.com/DaunteEth/woofi-pro-mcp woofi-pro \
  --client cursor \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

**VSCode:**
```bash
npx -y git+https://github.com/DaunteEth/woofi-pro-mcp woofi-pro \
  --client vscode \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

**Windsurf:**
```bash
npx -y git+https://github.com/DaunteEth/woofi-pro-mcp.git woofi-pro \
  --client windsurf \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

**What this does:**
- 🎯 **Targets specific platform** - Configure exactly what you want
- 📋 **Creates backups** of existing configurations
- ⚙️ **Updates your MCP config** with WOOFi Pro server + credentials
- ✅ **Ready to use immediately** - just restart your MCP application!

### 🟦 Option B: .env File Method

**Step 1: Create .env file**
```bash
cp .env.example .env
# Edit .env with your credentials
```

**Step 2: Simple config (any platform)**
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/DaunteEth/woofi-pro-mcp",
        "woofi-pro"
      ]
    }
  }
}
```

### 🟩 Option C: Direct Config Method

Add credentials directly to your MCP config:

**Claude Desktop** *(macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`)*
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/DaunteEth/woofi-pro-mcp",
        "woofi-pro"
      ],
      "env": {
        "WOOFI_API_KEY": "your_orderly_api_key_here",
        "WOOFI_SECRET_KEY": "your_orderly_secret_key_here",
        "WOOFI_ACCOUNT_ID": "your_account_id_here"
      }
    }
  }
}
```

**Cursor IDE** *(`.cursor/mcp.json`)*
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/DaunteEh/execution-agent.git",
        "woofi-pro"
      ],
      "env": {
        "WOOFI_API_KEY": "your_orderly_api_key_here",
        "WOOFI_SECRET_KEY": "your_orderly_secret_key_here",
        "WOOFI_ACCOUNT_ID": "your_account_id_here"
      }
    }
  }
}
```

## 🔧 API Credentials Setup

### 🔑 Get API Credentials
1. **Visit**: [WOOFi Pro](https://pro.woofi.com)
2. **Complete KYC**: Identity verification required
3. **Generate API Keys**: API Management → Create API keys
4. **Set Permissions**: Enable `read` and `trading` permissions
5. **Copy Credentials**: You'll need 3 values:
   - API Key
   - Secret Key  
   - Account ID

### 📁 .env File Template
```bash
# WOOFi Pro API Credentials (Required)
WOOFI_API_KEY=your_orderly_api_key_here
WOOFI_SECRET_KEY=your_orderly_secret_key_here
WOOFI_ACCOUNT_ID=your_account_id_here
```

## 🔒 Security Architecture

### ✅ Non-Sensitive (Hardcoded)
The following standard values are hardcoded for simplicity and are **not sensitive**:
- `WOOFI_BASE_ENDPOINT=https://api.orderly.org` - Public API endpoint
- `WOOFI_BROKER_ID=woofi_pro` - Standard broker identifier
- `WOOFI_CHAIN_ID=42161` - Arbitrum network chain ID

### 🔑 Sensitive (User-Provided)
These values must be provided by you and are **never hardcoded**:
- `WOOFI_API_KEY` - Your unique API key
- `WOOFI_SECRET_KEY` - Your private secret key  
- `WOOFI_ACCOUNT_ID` - Your account identifier

### 🛡️ Security Features
- **🔒 Zero hardcoded secrets** - Following 2025 MCP security best practices
- **📁 .env files gitignored** - Secrets never committed to version control
- **🔐 Automatic .env loading** - Server finds .env in working directory
- **✅ Input validation** - All parameters validated with Zod schemas
- **🏗️ Separation of concerns** - Public constants separate from private credentials

## 💡 Usage Examples

### Check Account Status
```typescript
// Get account information
await get_account_info({});

// View all positions  
await get_all_positions({});
```

### Place Orders
```typescript
// Market buy order
await create_order({
  symbol: "PERP_BTC_USDC",
  side: "BUY", 
  order_type: "MARKET",
  order_quantity: 0.001
});

// Limit sell order
await create_order({
  symbol: "PERP_ETH_USDC",
  side: "SELL",
  order_type: "LIMIT", 
  order_price: 3500,
  order_quantity: 0.1
});
```

### Advanced Features
```typescript
// PnL Settlement
await get_settle_pnl_nonce({});
await request_pnl_settlement({
  signature: "0x...",
  userAddress: "0x...",
  // ... EIP-712 signature data
});

// Liquidation Claims  
await claim_liquidated_positions({
  liquidation_id: 12345,
  // ... liquidation claim data
});
```

## 🔄 Natural Language Commands

### Account & Portfolio
- "Show me my account balance"
- "What are my current positions?"
- "Get my asset transaction history"
- "Check my PnL settlement history"

### Trading
- "Place a market buy order for 0.001 BTC"
- "Create a limit sell order for 0.1 ETH at $3500"
- "Cancel order ID 12345"
- "Show me my recent orders"
- "Create a batch of orders"

### Advanced Operations
- "Get my settle PnL nonce"
- "Show me liquidated positions"
- "Check funding fee history for BTC"
- "Create an internal transfer"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **WOOFi Pro**: [https://pro.woo.org](https://pro.woofi.com)
- **Orderly Network**: [https://orderly.network](https://orderly.network)
- **Documentation**: [https://orderly.network/docs](https://orderly.network/docs)
- **GitHub Repository**: [https://github.com/DaunteEth/execution-agent](https://github.com/DaunteEth/woofi-pro-mcp)

---

⚡ **Ready to trade?** Follow the quick setup above and start trading with natural language! 
