# 🚀 WOOFi Pro MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A **Model Context Protocol (MCP)** server providing **18 comprehensive trading tools** for WOOFi Pro and Orderly Network integration. Built for **universal compatibility** with Cursor IDE, Claude Desktop, Windsurf, and all MCP-compatible applications.

## ✨ Features

- **🎯 Platform-Specific Configuration**: Smithery-style commands for precise MCP client targeting
- **18 Trading Tools**: Complete suite for DeFi and derivatives trading
- **Orderly Network API**: Direct integration with institutional-grade infrastructure  
- **Universal Compatibility**: Works with Cursor, Claude Desktop, Windsurf, and all MCP clients
- **Flexible Setup**: Auto-config, .env files, OR direct config - all methods supported
- **CCXT-Style Security**: API keys never hardcoded in our repo, always user-provided
- **Automatic Authentication**: Seamless ed25519 signature-based auth
- **Multi-Platform Support**: Claude Desktop, Cursor IDE, VSCode, and Windsurf
- **Safe Config Management**: Creates backups before making any changes

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

### Choose Your Setup Method:

**🎯 Option A: Platform-Specific Configuration** *(NEW! Smithery-Style Commands)*

**For Claude Desktop:**
```bash
npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro \
  --client claude \
  --api-key=your_api_key \
  --secret-key=your_secret_key \
  --account-id=your_account_id
```

**For Cursor IDE:**
```bash
npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro \
  --client cursor \
  --api-key=your_api_key \
  --secret-key=your_secret_key \
  --account-id=your_account_id
```

**For VSCode:**
```bash
npx -y git+https://github.com/DaunteEh/execution-agent.git woofi-pro \
  --client vscode \
  --api-key=your_api_key \
  --secret-key=your_secret_key \
  --account-id=your_account_id
```

**For Windsurf:**
```bash
npx -y git+https://github.com/DaunteEh/execution-agent.git woofi-pro \
  --client windsurf \
  --api-key=your_api_key \
  --secret-key=your_secret_key \
  --account-id=your_account_id
```

*✅ Advantages: **Precise targeting**, follows MCP standards, explicit control*

**🟦 Option B: .env File Method** *(Recommended for development)*
```bash
# 1. Copy environment template
cp .env.example .env
# 2. Edit .env with your API credentials
# 3. Use simple MCP config (no env vars!)
```
*✅ Advantages: Keep secrets in gitignored files, easy to manage multiple environments*

**🟩 Option C: Config File Method** *(Manual configuration)*
```bash
# 1. Add credentials directly to your MCP config
# 2. No .env file needed!
# 3. Everything in one place
```
*✅ Advantages: Full control, custom configurations, manual environment management*

**✅ Supported Platforms:**
- **Cursor IDE** 
- **Claude Desktop**
- **Windsurf**
- **Any MCP Client**

## 🎯 Platform-Specific Configuration (NEW!)

**Choose your platform and configure instantly** - Smithery-style commands:

### **Claude Desktop** 
```bash
npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro \
  --client claude \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

### **Cursor IDE**
```bash
npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro \
  --client cursor \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

### **VSCode**
```bash
npx -y git+https://github.com/DaunteEh/execution-agent.git woofi-pro \
  --client vscode \
  --api-key=your_orderly_api_key_here \
  --secret-key=your_orderly_secret_key_here \
  --account-id=your_account_id_here
```

### **Windsurf**
```bash
npx -y git+https://github.com/DaunteEh/execution-agent.git woofi-pro \
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

**Example output:**
```
🚀 Configuring WOOFi Pro for CLAUDE...
🎯 Target: Claude Desktop
📂 Config: /Users/username/Library/Application Support/Claude/claude_desktop_config.json
🎉 Configuration complete for Claude Desktop!
📱 Please restart Claude Desktop to load the new configuration.
```

---

### Manual Configuration Options

#### 🟦 Option B: .env File Method

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
        "git+https://github.com/DaunteEth/execution-agent.git",
        "woofi-pro"
      ]
    }
  }
}
```

#### 🟩 Option C: Config File Method (No .env needed!)

**Claude Desktop** *(Manual setup)*

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
        "git+https://github.com/DaunteEth/execution-agent.git",
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
        "git+https://github.com/DaunteEth/execution-agent.git",
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

**Windsurf & Other MCP Clients**

Use either approach - both are supported by the MCP standard!

> **🔒 Security Note**: Both approaches are equally secure! Option A keeps secrets in .env files (gitignored), Option B keeps them in your local MCP config (never shared). Our codebase never contains any secrets - they're always user-provided.

## 🔧 Environment Setup

### 🔑 Get API Credentials (Required for both methods)
1. **Visit**: [WOOFi Pro](https://pro.woo.org)
2. **Complete KYC**: Identity verification
3. **Generate API Keys**: API Management → Create keys
4. **Permissions**: Enable `read` and `trading`

### 🟦 Option A: .env File Setup

**1. Copy Template**
```bash
cp .env.example .env
```

**2. Edit .env File**
```bash
# Only 3 variables needed!
WOOFI_API_KEY=your_orderly_api_key_here
WOOFI_SECRET_KEY=your_orderly_secret_key_here
WOOFI_ACCOUNT_ID=your_account_id_here
```

### 🟩 Option B: Direct Config Setup

**1. Get your 3 credentials from step above**

**2. Add them directly to your MCP config** (see examples above)
- Replace `your_orderly_api_key_here` with your actual API key
- Replace `your_orderly_secret_key_here` with your actual secret key  
- Replace `your_account_id_here` with your actual account ID

**3. Restart your MCP client** (Claude Desktop, Cursor, etc.)

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