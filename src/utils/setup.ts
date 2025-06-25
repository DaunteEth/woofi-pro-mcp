/**
 * Setup utility for Orderly Network authentication
 * This file provides guidance and utilities for initial account setup
 */

export function getSetupInstructions(): string {
  return `
🔧 WOOFi Pro MCP Server - Initial Setup Required

Your Orderly Network account needs to be set up before the MCP server can function.
This is a one-time setup process that requires wallet interaction.

📋 SETUP STEPS:

1. 📱 **Connect Your Wallet**
   - Use a Web3 wallet (MetaMask, WalletConnect, etc.)
   - Ensure you have some ETH for gas fees

2. 🌐 **Visit Orderly Network**
   - Go to: https://app.orderly.network/
   - Connect your wallet and complete account registration

3. 🔑 **Generate API Keys**
   - In your Orderly account settings, generate API keys
   - This creates the ed25519 key pair needed for API access

4. ⚙️ **Configure Environment**
   Set these environment variables:
   - WOOFI_API_KEY=<your_orderly_public_key>
   - WOOFI_SECRET_KEY=<your_orderly_private_key>
   - WOOFI_BASE_ENDPOINT=https://api.orderly.org
   - WOOFI_ACCOUNT_ID=<your_account_id>

5. 🔄 **Restart MCP Server**
   - Restart Cursor IDE or reconnect to the MCP server
   - Authentication will be validated automatically

📚 DOCUMENTATION:
- Orderly API Setup: https://orderly.network/docs/build-on-omnichain/evm-api/api-authentication
- Key Management: https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/public/add-orderly-key

⚠️  NOTE: This setup requires wallet signatures and cannot be fully automated.
Once set up, the MCP server will handle all authentication automatically.
  `.trim();
}

/**
 * Check if basic configuration is present (uses same logic as auth.ts)
 */
export function hasBasicConfig(): boolean {
  return !!(
    process.env.WOOFI_API_KEY &&
    process.env.WOOFI_SECRET_KEY &&
    process.env.WOOFI_ACCOUNT_ID
  );
}

/**
 * Get configuration status aligned with auth.ts requirements
 */
export function getConfigStatus(): {
  hasApiKey: boolean;
  hasSecretKey: boolean;
  hasAccountId: boolean;
  hasEndpoint: boolean;
  isComplete: boolean;
} {
  const hasApiKey = !!process.env.WOOFI_API_KEY;
  const hasSecretKey = !!process.env.WOOFI_SECRET_KEY;
  const hasAccountId = !!process.env.WOOFI_ACCOUNT_ID;
  const hasEndpoint = !!process.env.WOOFI_BASE_ENDPOINT;
  
  return {
    hasApiKey,
    hasSecretKey,
    hasAccountId,
    hasEndpoint,
    isComplete: hasApiKey && hasSecretKey && hasAccountId, // Match auth.ts requirements
  };
} 