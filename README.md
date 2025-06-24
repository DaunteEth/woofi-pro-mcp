# WOOFi Pro MCP Server 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A **Model Context Protocol (MCP)** server providing **19 comprehensive trading tools** for WOOFi Pro and Orderly Network integration. Built for Cursor IDE and Claude Desktop.

## 🎯 Features

- **19 Trading Tools**: Complete suite for DeFi and derivatives trading
- **Orderly Network API**: Direct integration with institutional-grade infrastructure  
- **WOOFi Pro Support**: Native WOOFi ecosystem tools
- **Account Management**: Portfolio tracking, PnL analysis, position monitoring
- **Order Management**: Advanced order types, batch operations, algorithmic orders
- **Asset Operations**: Deposits, withdrawals, balance tracking
- **Position Management**: Real-time position data, liquidation monitoring
- **Funding & Liquidations**: Funding rate tracking, liquidation analysis

## 🛠️ Installation & Setup

### Method 1: Direct GitHub Installation (Recommended)

Add to your Cursor IDE `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y", 
        "git+https://github.com/DaunteEth/execution-agent.git"
      ],
      "env": {
        "WOOFI_API_KEY": "your_api_key_here",
        "WOOFI_SECRET_KEY": "your_secret_key_here", 
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "your_account_id_here",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

### Method 2: Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/DaunteEth/execution-agent.git
cd execution-agent
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the project:**
```bash
npm run build
```

4. **Configure Cursor IDE** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/execution-agent",
      "env": {
        "WOOFI_API_KEY": "your_api_key_here",
        "WOOFI_SECRET_KEY": "your_secret_key_here",
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org", 
        "WOOFI_ACCOUNT_ID": "your_account_id_here",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `WOOFI_API_KEY` | Your Orderly API key | `6Nn7hUFANgm2wbvy...` |
| `WOOFI_SECRET_KEY` | Your Orderly secret key | `5Hd7DLap5XV5qP3t...` |  
| `WOOFI_BASE_ENDPOINT` | API endpoint | `https://api.orderly.org` |
| `WOOFI_ACCOUNT_ID` | Your account ID | `0xd8bc14ea4e7ab8c6...` |
| `WOOFI_CHAIN_ID` | Blockchain ID | `42161` (Arbitrum) |
| `WOOFI_BROKER_ID` | Broker identifier | `woofi_pro` |

## 🔧 Available Tools

### Account Management (6 tools)
- `get_account_info` - Retrieve account information and statistics
- `get_account_portfolio` - Get portfolio summary with PnL
- `get_account_statistics` - Detailed trading statistics  
- `get_fee_information` - Fee structure and rates
- `get_leverage_configuration` - Leverage settings per symbol
- `get_daily_pnl_history` - Historical PnL data

### Order Management (5 tools) 
- `create_order` - Place new orders (limit, market, IOC, FOK)
- `cancel_order` - Cancel specific orders
- `get_order_details` - Order status and details
- `get_order_history` - Historical order data
- `batch_cancel_orders` - Cancel multiple orders

### Position Management (3 tools)
- `get_positions` - Current position data
- `get_position_history` - Historical position changes
- `get_aggregate_positions` - Portfolio-wide position summary

### Asset Management (3 tools)
- `get_asset_history` - Asset transaction history
- `get_holdings` - Current asset balances
- `create_withdraw_request` - Initiate withdrawals

### Market Data (2 tools)
- `get_funding_rates` - Current and historical funding rates
- `get_liquidation_info` - Liquidation data and risks

## 🚀 Usage Examples

### Check Account Status
```typescript
// Get comprehensive account information
await get_account_info({});

// View portfolio performance  
await get_account_portfolio({});
```

### Place Orders
```typescript
// Market buy order
await create_order({
  symbol: "PERP_BTC_USDC",
  side: "BUY", 
  order_type: "MARKET",
  order_amount: 100
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
await get_positions({});

// Check specific symbol
await get_positions({ symbol: "PERP_BTC_USDC" });
```

## 🔍 Troubleshooting

### Common Issues

1. **"0 tools enabled"**
   - Verify environment variables are set correctly
   - Check API key permissions
   - Ensure Cursor IDE has restarted after configuration changes

2. **Connection errors**
   - Validate API credentials with Orderly Network
   - Check network connectivity to `https://api.orderly.org`
   - Verify account is properly configured

3. **Permission errors**
   - Ensure API key has trading permissions
   - Check account verification status
   - Verify broker integration is active

### Debug Mode
```bash
# Test server directly
npm run dev

# Check tool availability
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | npm run dev
```

## 📚 Documentation

- [Orderly Network API](https://orderly.network/docs/build-on-omnichain/evm-api/introduction)
- [WOOFi Pro Documentation](https://learn.woo.org/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is for educational and development purposes. Always test with small amounts and verify all operations. Trading involves risk of loss.

---

**Built with ❤️ for the WOOFi Pro community** 