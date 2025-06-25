#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Import endpoint modules
import * as Account from "./endpoints/account.js";
import * as Orders from "./endpoints/orders.js";
import * as Assets from "./endpoints/assets.js";
import * as Positions from "./endpoints/positions.js";
import * as Liquidations from "./endpoints/liquidations.js";
import * as Funding from "./endpoints/funding.js";
import * as WoofiClient from "./endpoints/woofi.js";
import { getSetupInstructions } from "./utils/setup.js";
import { validateConfig } from "./utils/auth.js";
// Configuration schema - Account ID is required per Orderly Network API requirements
export const configSchema = z.object({
    WOOFI_API_KEY: z.string().describe("WOOFi API Key"),
    WOOFI_SECRET_KEY: z.string().describe("WOOFi Secret Key"),
    WOOFI_BASE_ENDPOINT: z.string().describe("WOOFi Base Endpoint"),
    WOOFI_ACCOUNT_ID: z.string().optional().describe("WOOFi Account ID"),
    WOOFI_CHAIN_ID: z.string().optional().describe("WOOFi Chain ID"),
    WOOFI_BROKER_ID: z.string().optional().describe("WOOFi Broker ID"),
});
// Global configuration storage
let globalConfig;
// Initialize configuration - prioritize environment variables for local development
function initializeConfig(mcpConfig) {
    try {
        // Try to use environment variables first (for local dev)
        const envConfig = {
            WOOFI_API_KEY: process.env.WOOFI_API_KEY,
            WOOFI_SECRET_KEY: process.env.WOOFI_SECRET_KEY,
            WOOFI_BASE_ENDPOINT: process.env.WOOFI_BASE_ENDPOINT,
            WOOFI_ACCOUNT_ID: process.env.WOOFI_ACCOUNT_ID,
            WOOFI_CHAIN_ID: process.env.WOOFI_CHAIN_ID,
            WOOFI_BROKER_ID: process.env.WOOFI_BROKER_ID,
        };
        // Check if we have required env vars
        if (envConfig.WOOFI_API_KEY && envConfig.WOOFI_SECRET_KEY && envConfig.WOOFI_BASE_ENDPOINT) {
            console.error("🔧 Using environment variables");
            globalConfig = configSchema.parse(envConfig);
        }
        else if (mcpConfig) {
            console.error("🔧 Using MCP configuration");
            globalConfig = configSchema.parse(mcpConfig);
        }
        else {
            // Use default/fallback values for testing
            console.error("🔧 Using default configuration - some features may not work");
            globalConfig = {
                WOOFI_API_KEY: "test_api_key",
                WOOFI_SECRET_KEY: "test_secret_key",
                WOOFI_BASE_ENDPOINT: "https://api.orderly.org",
                WOOFI_ACCOUNT_ID: "test_account_id",
                WOOFI_CHAIN_ID: "42161",
                WOOFI_BROKER_ID: "woofi_pro",
            };
        }
        // Set global environment variables for endpoint modules
        process.env.WOOFI_API_KEY = globalConfig.WOOFI_API_KEY;
        process.env.WOOFI_SECRET_KEY = globalConfig.WOOFI_SECRET_KEY;
        process.env.WOOFI_BASE_ENDPOINT = globalConfig.WOOFI_BASE_ENDPOINT;
        if (globalConfig.WOOFI_ACCOUNT_ID)
            process.env.WOOFI_ACCOUNT_ID = globalConfig.WOOFI_ACCOUNT_ID;
        if (globalConfig.WOOFI_CHAIN_ID)
            process.env.WOOFI_CHAIN_ID = globalConfig.WOOFI_CHAIN_ID;
        if (globalConfig.WOOFI_BROKER_ID)
            process.env.WOOFI_BROKER_ID = globalConfig.WOOFI_BROKER_ID;
        console.error(`✅ Configuration initialized - Endpoint: ${globalConfig.WOOFI_BASE_ENDPOINT}`);
    }
    catch (error) {
        console.error("❌ Configuration error:", error);
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
        return true;
    }
    catch (error) {
        console.error("❌ Authentication configuration invalid:", error);
        console.error("");
        console.error(getSetupInstructions());
        return false;
    }
}
async function main() {
    try {
        // Initialize config
        initializeConfig();
        // Validate authentication configuration
        const authValid = validateAuthenticationConfig();
        if (!authValid) {
            console.error("⚠️  Server starting with limited functionality due to authentication issues");
        }
        const server = new McpServer({
            name: "woofi-pro",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        console.error("🔧 Registering trading tools...");
        // Account tools
        server.tool("get_account_info", "Fetch account balances and fee tiers", {}, async () => {
            const result = await Account.getAccountInfo();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_positions", "List open positions", {
            symbol: z.string().optional().describe("Optional symbol to filter positions"),
        }, async ({ symbol }) => {
            const result = await Account.getAccountPositions();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        // Order tools
        server.tool("create_order", "Place a spot/perp order on Orderly", {
            symbol: z.string().describe("Trading symbol (e.g., PERP_ETH_USDC)"),
            order_type: z.string().describe("LIMIT/MARKET/IOC/FOK/POST_ONLY/ASK/BID"),
            side: z.string().describe("SELL/BUY"),
            order_quantity: z.number().describe("Order quantity"),
            order_price: z.number().optional().describe("Order price (required for LIMIT orders)"),
            client_order_id: z.string().optional().describe("Client order ID"),
        }, async (params) => {
            const result = await Orders.createOrder(params);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("batch_create_orders", "Batch-create up to 10 orders", {
            orders: z.array(z.any()).describe("Array of order objects"),
        }, async ({ orders }) => {
            const result = await Orders.batchCreateOrders({ orders: orders });
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("cancel_order", "Cancel an existing order", {
            order_id: z.string().describe("Order ID to cancel"),
            symbol: z.string().describe("Trading symbol"),
        }, async ({ order_id }) => {
            const result = await Orders.cancelOrder(order_id);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_orders", "Get order history", {
            symbol: z.string().optional().describe("Optional symbol to filter"),
            status: z.string().optional().describe("Optional status to filter"),
        }, async ({ symbol, status }) => {
            const params = {};
            if (symbol)
                params.symbol = symbol;
            if (status)
                params.status = status;
            const result = await Orders.getOrders(params);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        // Asset tools
        server.tool("get_asset_history", "Get asset transaction history", {}, async () => {
            const result = await Assets.getAssetHistory();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_holdings", "Get asset holdings", {}, async () => {
            const result = await Assets.getHoldings();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("create_withdraw_request", "Create a withdrawal request", {
            token: z.string().describe("Token symbol"),
            amount: z.string().describe("Amount to withdraw"),
            address: z.string().describe("Withdrawal address"),
        }, async (params) => {
            const result = await Assets.createWithdrawRequest(params);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("settle_pnl", "Settle PnL", {}, async () => {
            const result = await Assets.settlePnl();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        // Position tools
        server.tool("get_all_positions", "Get all positions", {}, async () => {
            const result = await Positions.getAllPositions();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_position_by_symbol", "Get position for specific symbol", {
            symbol: z.string().describe("Trading symbol"),
        }, async ({ symbol }) => {
            const result = await Positions.getPositionBySymbol(symbol);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        // Liquidation tools
        server.tool("get_liquidations", "Get liquidation data", {}, async () => {
            const result = await Liquidations.getLiquidations();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("claim_liquidation", "Claim liquidation", {
            liquidation_id: z.string().describe("Liquidation ID to claim"),
        }, async (params) => {
            const result = await Liquidations.claimLiquidation(params);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        // Funding tools
        server.tool("get_funding_rates", "Get funding rates for symbols", {
            symbol: z.string().optional().describe("Optional symbol to filter funding rates"),
        }, async ({ symbol }) => {
            const result = await Funding.getFundingRates(symbol);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_funding_rate_history", "Get funding rate history", {
            symbol: z.string().describe("Symbol to get funding history for"),
        }, async ({ symbol }) => {
            const result = await Funding.getFundingRateHistory(symbol);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        // WOOFi tools
        server.tool("create_woofi_order", "Place an order via WOOFi Pro", {
            tokenIn: z.string().describe("Input token address"),
            tokenOut: z.string().describe("Output token address"),
            amountIn: z.string().describe("Input amount"),
        }, async (params) => {
            const result = await WoofiClient.createWoofiOrder(params);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_woofi_portfolio", "Get WOOFi portfolio", {}, async () => {
            const result = await WoofiClient.getWoofiPortfolio();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        server.tool("get_woofi_tokens", "Get available WOOFi tokens", {}, async () => {
            const result = await WoofiClient.getWoofiOrderHistory();
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        });
        console.error("✅ All 18 trading tools registered successfully");
        // Use STDIO transport for Cursor IDE MCP integration
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("🟢 WOOFi Pro MCP Server running locally via STDIO with 18 tools enabled");
    }
    catch (error) {
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
