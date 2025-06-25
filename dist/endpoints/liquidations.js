import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';
// Zod schemas for input validation
const liquidationQuerySchema = z.object({
    symbol: z.string().optional(),
    start_t: z.number().optional(),
    end_t: z.number().optional(),
    page: z.number().optional(),
    size: z.number().optional(),
});
/**
 * Get public liquidated positions (public endpoint)
 */
export async function getLiquidatedPositions(params) {
    validateConfig();
    // Validate and prepare query parameters
    const validatedParams = params ? liquidationQuerySchema.parse(params) : {};
    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString()
        ? `/v1/public/liquidated_positions?${queryParams.toString()}`
        : '/v1/public/liquidated_positions';
    console.log('📋 Getting liquidated positions with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Liquidated positions retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get liquidated positions:', error);
        throw error;
    }
}
/**
 * Get liquidations (private endpoint for user's liquidation data)
 */
export async function getLiquidations(params) {
    validateConfig();
    // Validate and prepare query parameters
    const validatedParams = params ? liquidationQuerySchema.parse(params) : {};
    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString()
        ? `/v1/liquidations?${queryParams.toString()}`
        : '/v1/liquidations';
    console.log('📋 Getting user liquidations with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ User liquidations retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get user liquidations:', error);
        throw error;
    }
}
/**
 * Get liquidation history (private endpoint)
 */
export async function getLiquidationHistory(params) {
    validateConfig();
    // Validate and prepare query parameters
    const validatedParams = params ? liquidationQuerySchema.parse(params) : {};
    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString()
        ? `/v1/liquidation/history?${queryParams.toString()}`
        : '/v1/liquidation/history';
    console.log('📋 Getting liquidation history with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Liquidation history retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get liquidation history:', error);
        throw error;
    }
}
/**
 * Get liquidation details by ID (private endpoint)
 */
export async function getLiquidationById(liquidationId) {
    validateConfig();
    if (!liquidationId) {
        throw new Error('Liquidation ID is required');
    }
    console.log(`📋 Getting liquidation details for ID: ${liquidationId}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/liquidation/${encodeURIComponent(liquidationId)}`);
        console.log('✅ Liquidation details retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get liquidation details:', error);
        throw error;
    }
}
/**
 * Get liquidation orders (private endpoint)
 */
export async function getLiquidationOrders(params) {
    validateConfig();
    // Validate and prepare query parameters
    const validatedParams = params ? liquidationQuerySchema.parse(params) : {};
    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString()
        ? `/v1/liquidation/orders?${queryParams.toString()}`
        : '/v1/liquidation/orders';
    console.log('📋 Getting liquidation orders with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Liquidation orders retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get liquidation orders:', error);
        throw error;
    }
}
/**
 * Get insurance fund details (public endpoint)
 */
export async function getInsuranceFund() {
    validateConfig();
    console.log('📋 Getting insurance fund details...');
    try {
        const result = await signAndSendRequest('GET', '/v1/public/insurance_fund');
        console.log('✅ Insurance fund details retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get insurance fund details:', error);
        throw error;
    }
}
