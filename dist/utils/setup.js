/**
 * Setup utility for Orderly Network authentication
 * This file provides guidance and utilities for initial account setup
 */
export function getSetupInstructions() {
    return `
🔧 WOOFi Pro MCP Server - Simple .env Setup Required

Follow these simple steps to configure your API credentials:

📋 QUICK SETUP (3 steps):

1. 📁 **Copy Environment Template**
   cp .env.example .env

2. 🔑 **Get Your API Credentials**
   - Visit: https://pro.woo.org
   - Complete KYC verification  
   - Go to API Management → Generate API Keys
   - Enable 'read' and 'trading' permissions

3. ✏️ **Edit .env File**
   Add your credentials (only 3 variables needed):
   - WOOFI_API_KEY=<your_orderly_api_key>
   - WOOFI_SECRET_KEY=<your_orderly_secret_key>
   - WOOFI_ACCOUNT_ID=<your_account_id>

💡 **Simplified Configuration:**
Standard values are now hardcoded for easier setup:
- Base endpoint: https://api.orderly.org (hardcoded)
- Broker ID: woofi_pro (hardcoded)
- Chain ID: 42161 (hardcoded)

🔒 **Security Note:**
- API credentials are ONLY in .env files (never in MCP config)
- .env files are automatically ignored by git
- Follows 2025 MCP security best practices

🔄 **After Setup:**
Restart your MCP client (Cursor/Claude Desktop/etc.) and you're ready to trade!

📚 **Documentation:**
- Orderly API Docs: https://orderly.network/docs/build-on-omnichain/evm-api/api-authentication
- GitHub Repository: https://github.com/DaunteEth/woofi-pro-mcp
  `.trim();
}
/**
 * Check if basic configuration is present (updated for new 3-variable approach)
 */
export function hasBasicConfig() {
    return !!(process.env.WOOFI_API_KEY &&
        process.env.WOOFI_SECRET_KEY &&
        process.env.WOOFI_ACCOUNT_ID);
}
/**
 * Get configuration status for new simplified approach
 */
export function getConfigStatus() {
    const hasApiKey = !!process.env.WOOFI_API_KEY;
    const hasSecretKey = !!process.env.WOOFI_SECRET_KEY;
    const hasAccountId = !!process.env.WOOFI_ACCOUNT_ID;
    return {
        hasApiKey,
        hasSecretKey,
        hasAccountId,
        isComplete: hasApiKey && hasSecretKey && hasAccountId, // Only 3 vars needed now
    };
}
