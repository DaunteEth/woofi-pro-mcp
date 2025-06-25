# 🚀 WOOFi Pro MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A **Model Context Protocol (MCP)** server providing **18 comprehensive trading tools** for WOOFi Pro and Orderly Network integration. Built for **universal compatibility** with Cursor IDE, Claude Desktop, Windsurf, and all MCP-compatible applications.

## ✨ Features

- **18 Trading Tools**: Complete suite for DeFi and derivatives trading
- **Orderly Network API**: Direct integration with institutional-grade infrastructure  
- **Universal Compatibility**: Works with Cursor, Claude Desktop, Windsurf, and all MCP clients
- **One-Command Setup**: Simple NPX command for instant access
- **Account Management**: Portfolio tracking, PnL analysis, position monitoring
- **Order Management**: Advanced order types, batch operations
- **Asset Operations**: Deposits, withdrawals, balance tracking
- **Position Management**: Real-time position data, liquidation monitoring
- **Funding & Liquidations**: Funding rate tracking, liquidation analysis
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

## 🚀 Universal Setup (Works Everywhere!)

### One Command - All Platforms

You can use this MCP server on **any MCP-compatible platform** with a single NPX command:

```bash
npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro
```

**Supported Platforms:**
- ✅ **Cursor IDE** 
- ✅ **Claude Desktop**
- ✅ **Windsurf**
- ✅ **Any MCP Client**

### Platform-Specific Setup

#### Cursor IDE

Add to your `.cursor/mcp.json`:

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
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "your_account_id_here",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
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
        "git+https://github.com/DaunteEth/execution-agent.git",
        "woofi-pro"
      ],
      "env": {
        "WOOFI_API_KEY": "your_orderly_api_key_here",
        "WOOFI_SECRET_KEY": "your_orderly_secret_key_here",
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "your_account_id_here",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

#### Windsurf

Use the same configuration as Claude Desktop in your Windsurf MCP settings.

#### Other MCP Clients

The command structure is universal. Consult your specific client's documentation for adding MCP servers.

## 🔧 Quick Start Guide

### 1. Get Your API Credentials

1. **Create WOOFi Pro Account**: Visit [WOOFi Pro](https://pro.woo.org)
2. **Complete KYC**: Complete identity verification
3. **Generate API Keys**: Go to API Management and create keys with `read` and `trading` permissions
4. **Copy Your Details**: Note your API key, secret key, and account ID

### 2. Add to Your Platform

Choose your platform above and add the configuration with your real API credentials.

### 3. Restart Your Application

Restart your IDE/application to load the MCP server.

### 4. Start Trading!

You can now use natural language to trade:
- "Show me my account balance"
- "Place a limit buy order for 0.001 BTC at $90,000"
- "What are my current positions?"

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `WOOFI_API_KEY` | Your Orderly API key | `6Nn7hUFANgm2wbvy...` |
| `WOOFI_SECRET_KEY` | Your Orderly secret key | `5Hd7DLap5XV5qP3t...` |  
| `WOOFI_BASE_ENDPOINT` | API endpoint | `https://api.orderly.org` |
| `WOOFI_ACCOUNT_ID` | Your account ID | `0xd8bc14ea4e7ab8c6...` |
| `WOOFI_CHAIN_ID` | Blockchain ID | `42161` (Arbitrum) |
| `WOOFI_BROKER_ID` | Broker identifier | `woofi_pro` |

## 💡 Usage Examples

### Check Account Status
```typescript
// Get account information and active keys
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

// Check specific symbol position
await get_position_by_symbol({ symbol: "PERP_BTC_USDC" });
```

### Asset Management
```typescript
// View asset transaction history
await get_asset_history({});

// Create withdrawal request
await create_withdraw_request({
  token: "USDC",
  amount: "100",
  address: "0x..."
});
```

## 🔍 Troubleshooting

### Common Issues

#### "0 tools enabled"
- ✅ Verify all environment variables are set correctly
- ✅ Check API key has trading permissions  
- ✅ Restart your application after configuration changes
- ✅ Ensure executable name `woofi-pro` is in args array

#### Authentication errors
- ✅ Validate API credentials with Orderly Network
- ✅ Check account verification status on WOOFi Pro
- ✅ Verify API key expiration date
- ✅ Ensure broker integration is active

#### Connection issues
- ✅ Check network connectivity to `https://api.orderly.org`
- ✅ Verify firewall settings allow HTTPS connections
- ✅ Test API endpoint accessibility

### Debug Commands

```bash
# Test server directly with NPX
WOOFI_API_KEY=test WOOFI_SECRET_KEY=test npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro

# Check tool availability
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | WOOFI_API_KEY=test npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro
```

### Alternative Setup Methods

If NPX doesn't work, you can also:

1. **Clone and build locally**:
```bash
git clone https://github.com/DaunteEh/execution-agent.git
cd execution-agent
npm install && npm run build
node dist/index.js
```

2. **Use local path in config**:
```json
{
  "command": "node",
  "args": ["dist/index.js"],
  "cwd": "/path/to/execution-agent"
}
```

## 📚 Documentation & Resources

- **Orderly Network API**: [https://orderly.network/docs/build-on-omnichain/evm-api/introduction](https://orderly.network/docs/build-on-omnichain/evm-api/introduction)
- **WOOFi Pro**: [https://learn.woo.org/](https://learn.woo.org/)
- **Model Context Protocol**: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
- **MCP Best Practices**: Based on [OSP Marketing Tools](https://github.com/open-strategy-partners/osp_marketing_tools) patterns

## ⚖️ License

MIT License - see [LICENSE](LICENSE) file for details.

## 🚨 Security Notice

- Never commit real API keys to version control
- Use environment variables for sensitive configuration  
- Regularly rotate your API keys
- Monitor your trading activity and API usage
- The `.cursor/mcp.json` in this repo contains placeholders only

## 🙏 Acknowledgments

- Configuration patterns inspired by [Open Strategy Partners](https://github.com/open-strategy-partners/osp_marketing_tools)
- Built with [Model Context Protocol](https://modelcontextprotocol.io/)
- Powered by [Orderly Network](https://orderly.network/)

---

**Ready to trade with AI? Use the universal NPX command and start trading with natural language on any platform! 🚀** 