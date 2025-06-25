import { z } from 'zod';
import { signAndSendRequest, getBaseUrl, validateConfig } from '../utils/auth.js';
// Zod schemas for input validation
const woofiOrderSchema = z.object({
    tokenIn: z.string(),
    tokenOut: z.string(),
    amountIn: z.string(),
});
/**
 * Create WOOFi order
 */
export async function createWoofiOrder(params) {
    validateConfig();
    // Validate input parameters
    const validatedParams = woofiOrderSchema.parse(params);
    console.log('📋 Creating WOOFi order:', validatedParams);
    try {
        // Note: WOOFi endpoints may use different base URL - check env vars
        const woofiBaseUrl = process.env.WOOFI_BASE_ENDPOINT || getBaseUrl();
        const result = await signAndSendRequest('POST', '/evm-api/restful-api/private/order', validatedParams);
        console.log('✅ WOOFi order created successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to create WOOFi order:', error);
        throw error;
    }
}
/**
 * Get WOOFi portfolio
 */
export async function getWoofiPortfolio() {
    validateConfig();
    console.log('📋 Getting WOOFi portfolio...');
    try {
        const result = await signAndSendRequest('GET', '/evm-api/restful-api/private/portfolio');
        console.log('✅ WOOFi portfolio retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get WOOFi portfolio:', error);
        throw error;
    }
}
/**
 * Get WOOFi order history
 */
export async function getWoofiOrderHistory() {
    validateConfig();
    console.log('📋 Getting WOOFi order history...');
    try {
        const result = await signAndSendRequest('GET', '/evm-api/restful-api/private/orders');
        console.log('✅ WOOFi order history retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get WOOFi order history:', error);
        throw error;
    }
}
export async function getWoofiTokens() {
    const path = "/evm-api/restful-api/public/tokens";
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}
export async function getWoofiQuote(tokenIn, tokenOut, amountIn) {
    const path = "/evm-api/restful-api/public/quote";
    const baseUrl = getBaseUrl();
    const url = new URL(`${baseUrl}${path}`);
    url.searchParams.set("tokenIn", tokenIn);
    url.searchParams.set("tokenOut", tokenOut);
    url.searchParams.set("amountIn", amountIn);
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}
