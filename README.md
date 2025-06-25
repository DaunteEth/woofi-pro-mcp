# 🚀 WOOFi Pro MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A **Model Context Protocol (MCP)** server providing **18 comprehensive trading tools** for WOOFi Pro and Orderly Network integration. Built for **universal compatibility** with Cursor IDE, Claude Desktop, Windsurf, and all MCP-compatible applications.

## ✨ Features

- **18 Trading Tools**: Complete suite for DeFi and derivatives trading
- **Orderly Network API**: Direct integration with institutional-grade infrastructure  
- **Universal Compatibility**: Works with Cursor, Claude Desktop, Windsurf, and all MCP clients
- **Simple 3-Step Setup**: Just copy .env.example → .env → add credentials
- **CCXT-Style Security**: API keys ONLY in .env files, never in MCP config
- **Automatic Authentication**: Seamless ed25519 signature-based auth

## 🎯 Available Tools

| Category | Tools | Description |
|----------|--------|-------------|
| **Account** | `get_account_info` | Account information and key details |
| **Positions** | `get_all_positions`, `get_position_by_symbol` | Position tracking and management |
| **Orders** | `create_order`, `cancel_order`, `get_orders`, `batch_create_orders` | Order management and execution |
| **Assets** | `get_asset_history`, `get_holdings`, `create_withdraw_request` | Asset and balance operations |
| **Trading** | `settle_pnl` | PnL settlement operations |
| **Funding** | `get_funding_rates`, `get_funding_rate_history` | Funding rate data |
| **Liquidations** | `get_liquidations`, `claim_liquidation` | Liquidation monitoring |
| **WOOFi** | `create_woofi_order`, `get_woofi_portfolio`, `get_woofi_tokens` | WOOFi Pro integration |

## 🚀 Universal Setup (CCXT-Style)

### 3-Step Setup (Works Everywhere!)

```bash
# 1. Copy environment template
cp .env.example .env

# 2. Edit .env with your API credentials
# (just 3 variables needed!)

# 3. Use simple MCP config (no env vars!)
```

**✅ Supported Platforms:**
- **Cursor IDE** 
- **Claude Desktop**
- **Windsurf**
- **Any MCP Client**

### Platform-Specific Configuration

#### Cursor IDE (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/DaunteEth/execution-agent.git",
        "woofi-pro"
      ]
    }
  }
}
```

#### Claude Desktop

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/DaunteEh/execution-agent.git",
        "woofi-pro"
      ]
    }
  }
}
```

#### Windsurf & Other MCP Clients

Use the same clean configuration - no environment variables needed in config files!

## 🔧 Environment Setup

### 1. Copy Template
```bash
cp .env.example .env
```

### 2. Get API Credentials
1. **Visit**: [WOOFi Pro](https://pro.woo.org)
2. **Complete KYC**: Identity verification
3. **Generate API Keys**: API Management → Create keys
4. **Permissions**: Enable `read` and `trading`

### 3. Edit .env File
```bash
# Only 3 variables needed!
WOOFI_API_KEY=your_orderly_api_key_here
WOOFI_SECRET_KEY=your_orderly_secret_key_here
WOOFI_ACCOUNT_ID=your_account_id_here
```

### 🔒 Security: Hardcoded vs Configurable

**🔧 Hardcoded (Standard Values):**
- `WOOFI_BASE_ENDPOINT=https://api.orderly.org` - Never changes
- `WOOFI_BROKER_ID=woofi_pro` - Our standard broker ID
- `WOOFI_CHAIN_ID=42161` - Arbitrum network

**🔑 Configurable (User-Specific):**
- `WOOFI_API_KEY` - Your unique API key
- `WOOFI_SECRET_KEY` - Your private key  
- `WOOFI_ACCOUNT_ID` - Your account identifier

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

### Monitor Positions
```typescript
// Get all positions
await get_all_positions({});

// Check specific symbol
await get_position_by_symbol({ symbol: "PERP_BTC_USDC" });
```

## 🔄 Commands You Can Use

### Account & Portfolio
- "Show me my account balance"
- "What are my current positions?"
- "Get my asset transaction history"

### Trading
- "Place a market buy order for 0.001 BTC"
- "Create a limit sell order for 0.1 ETH at $3500"
- "Cancel order ID 12345"
- "Show me my recent orders"

### Analysis
- "What are the current funding rates?"
- "Check funding rate history for BTC"
- "Show me liquidation data"

## 🛡️ Security Features

- **🔒 No API keys in config files** - Following 2025 MCP security best practices
- **📁 .env files gitignored** - Secrets never committed to version control
- **🔐 Automatic .env loading** - Server finds .env in working directory
- **✅ Input validation** - All parameters validated with Zod schemas
- **🏗️ Hardcoded standards** - Non-sensitive values hardcoded for simplicity

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **WOOFi Pro**: [https://pro.woo.org](https://pro.woo.org)
- **Orderly Network**: [https://orderly.network](https://orderly.network)
- **Documentation**: [https://orderly.network/docs](https://orderly.network/docs)
- **GitHub Repository**: [https://github.com/DaunteEth/execution-agent](https://github.com/DaunteEth/execution-agent)

---

⚡ **Ready to trade?** Follow the 3-step setup above and start trading with natural language! 