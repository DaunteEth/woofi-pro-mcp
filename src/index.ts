#!/usr/bin/env node

import { Command } from "commander";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { configureWOOFiProForClient, MCPCredentials } from "./utils/auto-config.js";

// Hardcoded configuration values (non-sensitive, standard values)
const WOOFI_BASE_ENDPOINT = "https://api.orderly.org";
const WOOFI_BROKER_ID = "woofi_pro";
const WOOFI_CHAIN_ID = "42161"; // Arbitrum

// Load .env file from working directory (like CCXT does)
const envPath = path.resolve(process.cwd(), '.env');
const envExamplePath = path.resolve(process.cwd(), '.env.example');

try {
  dotenv.config({ path: envPath });
  console.error(`🔧 Loading environment from: ${envPath}`);
} catch (error) {
  console.error(`⚠️  Could not load .env from: ${envPath}`);
}

// Import endpoint modules
import * as Account from "./endpoints/account.js";
import * as Orders from "./endpoints/orders.js";
import * as Assets from "./endpoints/assets.js";
import * as Positions from "./endpoints/positions.js";
import * as Liquidations from "./endpoints/liquidations.js";
import * as Funding from "./endpoints/funding.js";
import { getSetupInstructions } from "./utils/setup.js";
import { validateConfig } from "./utils/auth.js";

// Simplified configuration schema - only user-specific values
export const configSchema = z.object({
  WOOFI_API_KEY: z.string().describe("WOOFi API Key"),
  WOOFI_SECRET_KEY: z.string().describe("WOOFi Secret Key"),
  WOOFI_ACCOUNT_ID: z.string().optional().describe("WOOFi Account ID"),
});

// Global configuration storage
let globalConfig: z.infer<typeof configSchema>;

// Check if .env file exists and provide helpful setup instructions
function checkEnvSetup() {
  const hasEnv = fs.existsSync(envPath);
  const hasEnvExample = fs.existsSync(envExamplePath);

  if (!hasEnv) {
    console.error("");
    console.error("🚨 No .env file found!");
    console.error(`📂 Looking for: ${envPath}`);
    console.error("");
    
    if (hasEnvExample) {
      console.error("💡 Quick setup:");
      console.error(`   cp .env.example .env`);
      console.error(`   # Edit .env with your API credentials`);
    } else {
      console.error("💡 Create .env file with:");
      console.error("   WOOFI_API_KEY=your_api_key");
      console.error("   WOOFI_SECRET_KEY=your_secret_key");
      console.error("   WOOFI_ACCOUNT_ID=your_account_id");
    }
    console.error("");
    console.error("🔒 Security: API keys should ONLY be in .env files, never in MCP config!");
    console.error("");
    return false;
  }
  return true;
}

// Initialize configuration - only user-specific values from env
function initializeConfig() {
  try {
    // Check for .env file setup
    const hasValidEnv = checkEnvSetup();
    
    // Load from environment variables (loaded by dotenv)
    const envConfig = {
      WOOFI_API_KEY: process.env.WOOFI_API_KEY,
      WOOFI_SECRET_KEY: process.env.WOOFI_SECRET_KEY,
      WOOFI_ACCOUNT_ID: process.env.WOOFI_ACCOUNT_ID,
    };

    // Validate required environment variables
    if (!envConfig.WOOFI_API_KEY || !envConfig.WOOFI_SECRET_KEY) {
      console.error("❌ Missing required environment variables!");
      console.error("   Required: WOOFI_API_KEY, WOOFI_SECRET_KEY");
      
      if (hasValidEnv) {
        console.error("   Check your .env file has these values set");
      }
      
      throw new Error("Missing required API credentials");
    }

    console.error("✅ Using environment variables from .env file");
    globalConfig = configSchema.parse(envConfig);
    
    // Set global environment variables for endpoint modules (including hardcoded values)
    process.env.WOOFI_API_KEY = globalConfig.WOOFI_API_KEY;
    process.env.WOOFI_SECRET_KEY = globalConfig.WOOFI_SECRET_KEY;
    process.env.WOOFI_BASE_ENDPOINT = WOOFI_BASE_ENDPOINT;
    process.env.WOOFI_CHAIN_ID = WOOFI_CHAIN_ID;
    process.env.WOOFI_BROKER_ID = WOOFI_BROKER_ID;
    if (globalConfig.WOOFI_ACCOUNT_ID) process.env.WOOFI_ACCOUNT_ID = globalConfig.WOOFI_ACCOUNT_ID;
    
    console.error(`✅ Configuration initialized - Endpoint: ${WOOFI_BASE_ENDPOINT}`);
    console.error(`🔧 Using hardcoded values: Broker=${WOOFI_BROKER_ID}, Chain=${WOOFI_CHAIN_ID}`);
  } catch (error) {
    console.error("❌ Configuration error:", error);
    console.error("");
    console.error("📖 For detailed setup instructions, visit:");
    console.error("   https://github.com/DaunteEth/execution-agent#setup");
    console.error("");
    throw error;
  }
}

// Simple configuration validation (no circular dependency)
function validateAuthenticationConfig() {
  try {
    console.error("🔐 Validating authentication configuration...");
    
    // Use existing validateConfig() from auth.ts - just checks env vars, no API calls
    validateConfig();
    
    console.error("✅ Authentication configuration validated");
    console.error("🔄 Cache Bust:", new Date().toISOString());
    console.error("📦 Auth Version: 1.0.1 - WORKING AUTHENTICATION");
    return true;
  } catch (error) {
    console.error("❌ Authentication configuration invalid:", error);
    console.error("");
    console.error(getSetupInstructions());
    return false;
  }
}

// CLI argument parsing and auto-configuration mode
async function handleCLICommands() {
  const program = new Command();
  
  program
    .name('woofi-pro')
    .description('WOOFi Pro MCP Server with auto-configuration')
    .version('1.0.1');

  program
    .option('--client <client>', 'Target MCP client: claude, cursor, vscode, windsurf')
    .option('--api-key <key>', 'WOOFi API Key for configuration')
    .option('--secret-key <key>', 'WOOFi Secret Key for configuration')
    .option('--account-id <id>', 'WOOFi Account ID for configuration')
    .parse();

  const options = program.opts();

  // Check if user wants client-specific configuration
  if (options.client || options.apiKey || options.secretKey || options.accountId) {
    console.log('🚀 WOOFi Pro MCP Server - Client Configuration Mode');
    console.log('');

    // Validate all required options are provided
    if (!options.client || !options.apiKey || !options.secretKey || !options.accountId) {
      console.error('❌ Client configuration requires all four options:');
      console.error('   --client <claude|cursor|vscode|windsurf>');
      console.error('   --api-key <your_api_key>');
      console.error('   --secret-key <your_secret_key>');
      console.error('   --account-id <your_account_id>');
      console.error('');
      console.error('💡 Examples:');
      console.error('   # Configure for Claude Desktop');
      console.error('   npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro \\');
      console.error('     --client claude --api-key=your_key --secret-key=your_secret --account-id=your_id');
      console.error('');
      console.error('   # Configure for Cursor IDE');
      console.error('   npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro \\');
      console.error('     --client cursor --api-key=your_key --secret-key=your_secret --account-id=your_id');
      process.exit(1);
    }

    // Validate client type
    const validClients = ['claude', 'cursor', 'vscode', 'windsurf'];
    if (!validClients.includes(options.client)) {
      console.error(`❌ Invalid client: ${options.client}`);
      console.error(`   Supported clients: ${validClients.join(', ')}`);
      process.exit(1);
    }

    // Perform client-specific configuration
    const credentials: MCPCredentials = {
      apiKey: options.apiKey,
      secretKey: options.secretKey,
      accountId: options.accountId
    };

    try {
      await configureWOOFiProForClient(options.client, credentials);
      process.exit(0);
    } catch (error) {
      console.error(`❌ Configuration failed for ${options.client}:`, error);
      process.exit(1);
    }
  }

  // No CLI options provided, continue with normal MCP server mode
  return false;
}

async function main() {
  try {
    // Check for CLI auto-configuration mode first
    const isAutoConfig = await handleCLICommands();
    if (isAutoConfig) return;

    // Initialize config
    initializeConfig();

    // Validate authentication configuration
    const authValid = validateAuthenticationConfig();
    if (!authValid) {
      console.error("⚠️  Server starting with limited functionality due to authentication issues");
    }

    const server = new McpServer({
      name: "woofi-pro",
      version: "1.0.1",
    }, {
      capabilities: {
        tools: {},
      },
    });

    console.error("🔧 Registering trading tools...");

    // Account tools
    server.tool(
      "get_account_info",
      "Fetch account balances and fee tiers",
      {},
      async () => {
        const result = await Account.getAccountInfo();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_positions",
      "List open positions",
      {
        symbol: z.string().optional().describe("Optional symbol to filter positions"),
      },
      async ({ symbol }) => {
        const result = await Account.getAccountPositions();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Order tools
    // === REGULAR ORDER MANAGEMENT TOOLS (10 tools) ===
    
    server.tool(
      "create_order",
      "Create a new regular order",
      {
        symbol: z.string().describe("Trading symbol (e.g., PERP_ETH_USDC)"),
        side: z.enum(["BUY", "SELL"]).describe("Order side"),
        order_type: z.enum(["LIMIT", "MARKET", "IOC", "FOK", "POST_ONLY", "ASK", "BID"]).describe("Order type"),
        order_price: z.number().optional().describe("Order price (required for LIMIT orders)"),
        order_quantity: z.number().optional().describe("Order quantity"),
        order_amount: z.number().optional().describe("Order amount in quote currency"),
        client_order_id: z.string().optional().describe("Custom order ID (max 36 chars)"),
        visible_quantity: z.number().optional().describe("Visible quantity on orderbook"),
        reduce_only: z.boolean().optional().describe("Reduce only flag"),
        slippage: z.number().optional().describe("Slippage tolerance for MARKET orders"),
        order_tag: z.string().optional().describe("Order tag"),
        level: z.number().optional().describe("Price level for ASK/BID orders"),
        post_only_adjust: z.boolean().optional().describe("Adjust price for POST_ONLY orders"),
      },
      async (params) => {
        const result = await Orders.createOrder(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "batch_create_orders",
      "Create multiple orders in batch",
      {
        orders: z.array(z.object({
          symbol: z.string().describe("Trading symbol"),
          side: z.enum(["BUY", "SELL"]).describe("Order side"),
          order_type: z.enum(["LIMIT", "MARKET", "IOC", "FOK", "POST_ONLY", "ASK", "BID"]).describe("Order type"),
          order_price: z.number().optional().describe("Order price"),
          order_quantity: z.number().optional().describe("Order quantity"),
          order_amount: z.number().optional().describe("Order amount"),
          client_order_id: z.string().optional().describe("Client order ID"),
          visible_quantity: z.number().optional().describe("Visible quantity"),
          reduce_only: z.boolean().optional().describe("Reduce only flag"),
          slippage: z.number().optional().describe("Slippage tolerance"),
          order_tag: z.string().optional().describe("Order tag"),
          level: z.number().optional().describe("Price level"),
          post_only_adjust: z.boolean().optional().describe("Post only adjust"),
        })).describe("Array of orders to create"),
      },
      async ({ orders }) => {
        const result = await Orders.batchCreateOrders({ orders });
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "edit_order",
      "Edit an existing order",
      {
        order_id: z.string().describe("Order ID to edit"),
        order_quantity: z.number().optional().describe("New order quantity"),
        order_price: z.number().optional().describe("New order price"),
      },
      async (params) => {
        const result = await Orders.editOrder(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_order",
      "Cancel an order by order ID",
      {
        order_id: z.string().describe("Order ID to cancel"),
      },
      async ({ order_id }) => {
        const result = await Orders.cancelOrder(order_id);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_order_by_client_id",
      "Cancel an order by client order ID",
      {
        client_order_id: z.string().describe("Client order ID to cancel"),
      },
      async ({ client_order_id }) => {
        const result = await Orders.cancelOrderByClientId(client_order_id);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_all_pending_orders",
      "Cancel all pending orders",
      {
        symbol: z.string().optional().describe("Symbol to cancel orders for (optional)"),
      },
      async ({ symbol }) => {
        const result = await Orders.cancelAllPendingOrders(symbol);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_all_after",
      "Cancel all orders after a timeout",
      {
        timeout: z.number().describe("Timeout in milliseconds"),
      },
      async (params) => {
        const result = await Orders.cancelAllAfter(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "get_orders",
      "Get orders with filtering options",
      {
        symbol: z.string().optional().describe("Filter by symbol"),
        status: z.enum(["NEW", "PARTIALLY_FILLED", "FILLED", "CANCELLED", "REJECTED", "INCOMPLETE", "COMPLETED"]).optional().describe("Filter by status"),
        tag: z.string().optional().describe("Filter by tag"),
        order_type: z.enum(["LIMIT", "MARKET", "IOC", "FOK", "POST_ONLY", "ASK", "BID"]).optional().describe("Filter by order type"),
        order_tag: z.string().optional().describe("Filter by order tag"),
        side: z.enum(["BUY", "SELL"]).optional().describe("Filter by side"),
        start_t: z.number().optional().describe("Start time filter"),
        end_t: z.number().optional().describe("End time filter"),
        size: z.number().optional().describe("Page size"),
        page: z.number().optional().describe("Page number"),
      },
      async (params) => {
        const result = await Orders.getOrders(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "get_order_by_id",
      "Get order by order ID",
      {
        order_id: z.string().describe("Order ID to retrieve"),
      },
      async ({ order_id }) => {
        const result = await Orders.getOrderById(order_id);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "get_order_by_client_id",
      "Get order by client order ID",
      {
        client_order_id: z.string().describe("Client order ID to retrieve"),
      },
      async ({ client_order_id }) => {
        const result = await Orders.getOrderByClientId(client_order_id);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    // === ALGO ORDER MANAGEMENT TOOLS (8 tools) ===
    
    server.tool(
      "create_algo_order",
      "Create an algorithmic order (stop loss, take profit, etc.)",
      {
        symbol: z.string().describe("Trading symbol"),
        algo_type: z.enum(["STOP", "TP_SL", "POSITIONAL_TP_SL", "BRACKET", "TAKE_PROFIT", "STOP_LOSS"]).describe("Algorithm order type"),
        type: z.enum(["LIMIT", "MARKET", "CLOSE_POSITION"]).optional().describe("Order type"),
        quantity: z.number().optional().describe("Order quantity"),
        side: z.enum(["BUY", "SELL"]).optional().describe("Order side"),
        price: z.number().optional().describe("Order price"),
        trigger_price: z.number().optional().describe("Trigger price"),
        trigger_price_type: z.enum(["MARK_PRICE"]).optional().describe("Trigger price type"),
        reduce_only: z.boolean().optional().describe("Reduce only flag"),
        visible_quantity: z.boolean().optional().describe("Visible quantity flag"),
        client_order_id: z.string().optional().describe("Custom order ID"),
        order_tag: z.string().optional().describe("Order tag"),
        child_orders: z.array(z.any()).optional().describe("Child orders for complex algos"),
      },
      async (params) => {
        const result = await Orders.createAlgoOrder(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "edit_algo_order",
      "Edit an existing algo order",
      {
        order_id: z.string().describe("Algo order ID to edit"),
        quantity: z.number().optional().describe("New quantity"),
        price: z.number().optional().describe("New price"),
        trigger_price: z.number().optional().describe("New trigger price"),
      },
      async (params) => {
        const result = await Orders.editAlgoOrder(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_algo_order",
      "Cancel an algo order by order ID",
      {
        order_id: z.string().describe("Algo order ID to cancel"),
        symbol: z.string().describe("Trading symbol for the algo order"),
      },
      async ({ order_id, symbol }) => {
        const result = await Orders.cancelAlgoOrder(order_id, symbol);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_algo_order_by_client_id",
      "Cancel an algo order by client order ID",
      {
        client_order_id: z.string().describe("Client order ID to cancel"),
        symbol: z.string().describe("Trading symbol for the algo order"),
      },
      async ({ client_order_id, symbol }) => {
        const result = await Orders.cancelAlgoOrderByClientId(client_order_id, symbol);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "cancel_all_pending_algo_orders",
      "Cancel all pending algo orders",
      {
        symbol: z.string().optional().describe("Symbol to cancel algo orders for (optional)"),
      },
      async ({ symbol }) => {
        const result = await Orders.cancelAllPendingAlgoOrders(symbol);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "get_algo_orders",
      "Get algo orders with filtering options",
      {
        symbol: z.string().optional().describe("Filter by symbol"),
        algo_type: z.enum(["STOP", "TP_SL", "POSITIONAL_TP_SL", "BRACKET"]).optional().describe("Filter by algo type"),
        size: z.number().optional().describe("Page size"),
        page: z.number().optional().describe("Page number"),
      },
      async (params) => {
        const result = await Orders.getAlgoOrders(params);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "get_algo_order_by_id",
      "Get algo order by order ID",
      {
        order_id: z.string().describe("Algo order ID to retrieve"),
      },
      async ({ order_id }) => {
        const result = await Orders.getAlgoOrderById(order_id);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    server.tool(
      "get_algo_order_by_client_id",
      "Get algo order by client order ID",
      {
        client_order_id: z.string().describe("Client order ID to retrieve"),
      },
      async ({ client_order_id }) => {
        const result = await Orders.getAlgoOrderByClientId(client_order_id);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
    );

    // Asset tools
    server.tool(
      "get_asset_history",
      "Get asset transaction history",
      {},
      async () => {
        const result = await Assets.getAssetHistory();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_holdings",
      "Get asset holdings",
      {},
      async () => {
        const result = await Assets.getHoldings();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "create_withdraw_request",
      "Create a withdrawal request",
      {
        token: z.string().describe("Token symbol"),
        amount: z.string().describe("Amount to withdraw"),
        address: z.string().describe("Withdrawal address"),
      },
      async (params) => {
        const result = await Assets.createWithdrawRequest(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_settle_pnl_nonce",
      "Get settle PnL nonce",
      {},
      async () => {
        const result = await Assets.getSettlePnlNonce();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "request_pnl_settlement",
      "Request PnL settlement with EIP-712 signature",
      {
        signature: z.string().describe("EIP-712 signature"),
        userAddress: z.string().describe("User address"),
        verifyingContract: z.string().describe("Verifying contract address"),
        message: z.object({
          brokerId: z.string(),
          chainId: z.number(),
          chainType: z.string(),
          settleNonce: z.number(),
          timestamp: z.number(),
        }).describe("Message object for EIP-712 signature"),
      },
      async (params) => {
        const result = await Assets.requestPnlSettlement(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_pnl_settlement_history",
      "Get PnL settlement history",
      {
        symbol: z.string().optional().describe("Optional symbol filter"),
        start_t: z.string().optional().describe("Start timestamp"),
        end_t: z.string().optional().describe("End timestamp"),
        page: z.string().optional().describe("Page number"),
        size: z.string().optional().describe("Page size"),
      },
      async (params) => {
        const result = await Assets.getPnlSettlementHistory(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "create_internal_transfer",
      "Create internal transfer between accounts",
      {
        token: z.string().describe("Token symbol"),
        amount: z.string().describe("Amount to transfer"),
        fromAccountId: z.string().describe("Source account ID"),
        toAccountId: z.string().describe("Destination account ID"),
      },
      async (params) => {
        const result = await Assets.createInternalTransfer(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_internal_transfer_history",
      "Get internal transfer history",
      {
        symbol: z.string().optional().describe("Optional symbol filter"),
        start_t: z.string().optional().describe("Start timestamp"),
        end_t: z.string().optional().describe("End timestamp"),
        page: z.string().optional().describe("Page number"),
        size: z.string().optional().describe("Page size"),
      },
      async (params) => {
        const result = await Assets.getInternalTransferHistory(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Position tools
    server.tool(
      "get_all_positions",
      "Get all positions",
      {},
      async () => {
        const result = await Positions.getAllPositions();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_position_by_symbol",
      "Get position for specific symbol",
      {
        symbol: z.string().describe("Trading symbol"),
      },
      async ({ symbol }) => {
        const result = await Positions.getPositionBySymbol(symbol);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_position_history",
      "Get position history",
      {
        symbol: z.string().optional().describe("Optional symbol to filter"),
        limit: z.number().optional().describe("Optional limit for results"),
      },
      async ({ symbol, limit }) => {
        const params: any = {};
        if (symbol) params.symbol = symbol;
        if (limit) params.limit = limit;
        const result = await Positions.getPositionHistory(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Liquidation tools
    server.tool(
      "get_liquidated_positions",
      "Get public liquidated positions",
      {
        symbol: z.string().optional().describe("Optional symbol filter"),
        start_t: z.number().optional().describe("Start timestamp"),
        end_t: z.number().optional().describe("End timestamp"),
        page: z.number().optional().describe("Page number"),
        size: z.number().optional().describe("Page size"),
      },
      async (params) => {
        const result = await Liquidations.getLiquidatedPositions(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_liquidations",
      "Get user liquidation data",
      {
        symbol: z.string().optional().describe("Optional symbol filter"),
        start_t: z.number().optional().describe("Start timestamp"),
        end_t: z.number().optional().describe("End timestamp"),
        page: z.number().optional().describe("Page number"),
        size: z.number().optional().describe("Page size"),
      },
      async (params) => {
        const result = await Liquidations.getLiquidations(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_liquidation_history",
      "Get liquidation history",
      {
        symbol: z.string().optional().describe("Optional symbol filter"),
        start_t: z.number().optional().describe("Start timestamp"),
        end_t: z.number().optional().describe("End timestamp"),
        page: z.number().optional().describe("Page number"),
        size: z.number().optional().describe("Page size"),
      },
      async (params) => {
        const result = await Liquidations.getLiquidationHistory(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_liquidation_by_id",
      "Get liquidation details by ID",
      {
        liquidation_id: z.string().describe("Liquidation ID"),
      },
      async ({ liquidation_id }) => {
        const result = await Liquidations.getLiquidationById(liquidation_id);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_liquidation_orders",
      "Get liquidation orders",
      {
        symbol: z.string().optional().describe("Optional symbol filter"),
        start_t: z.number().optional().describe("Start timestamp"),
        end_t: z.number().optional().describe("End timestamp"),
        page: z.number().optional().describe("Page number"),
        size: z.number().optional().describe("Page size"),
      },
      async (params) => {
        const result = await Liquidations.getLiquidationOrders(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    server.tool(
      "get_insurance_fund",
      "Get insurance fund details",
      {},
      async () => {
        const result = await Liquidations.getInsuranceFund();
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    // Funding tools
    server.tool(
      "get_funding_fee_history",
      "Get funding fee history",
      {
        symbol: z.string().optional().describe("Optional symbol to filter"),
        start_t: z.string().optional().describe("Start timestamp"),
        end_t: z.string().optional().describe("End timestamp"),
        page: z.string().optional().describe("Page number"),
        size: z.string().optional().describe("Page size"),
      },
      async ({ symbol, start_t, end_t, page, size }) => {
        const params: any = {};
        if (symbol) params.symbol = symbol;
        if (start_t) params.start_t = start_t;
        if (end_t) params.end_t = end_t;
        if (page) params.page = page;
        if (size) params.size = size;
        const result = await Funding.getFundingFeeHistory(params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    );

    console.error("✅ All 40 trading tools registered successfully");

    // Use STDIO transport for Cursor IDE MCP integration
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error("🟢 WOOFi Pro MCP Server running locally via STDIO with 40 tools enabled");
  } catch (error) {
    console.error("❌ Server error:", error);
    process.exit(1);
  }
}

// Handle process events
process.on('SIGINT', () => {
  console.error("🔴 Shutting down WOOFi Pro MCP Server");
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error("❌ Uncaught exception:", error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("❌ Unhandled rejection at:", promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
main();
