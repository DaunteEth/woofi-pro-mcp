import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';
// Zod schemas for input validation
const claimLiquidationSchema = z.object({
    liquidation_id: z.string(),
});
/**
 * Get liquidation data
 */
export async function getLiquidations() {
    validateConfig();
    console.log('📋 Getting liquidations...');
    try {
        const result = await signAndSendRequest('GET', '/v1/liquidation');
        console.log('✅ Liquidations retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get liquidations:', error);
        throw error;
    }
}
/**
 * Claim liquidation
 */
export async function claimLiquidation(params) {
    validateConfig();
    // Validate input parameters
    const validatedParams = claimLiquidationSchema.parse(params);
    console.log('📋 Claiming liquidation:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/liquidation/claim', validatedParams);
        console.log('✅ Liquidation claimed successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to claim liquidation:', error);
        throw error;
    }
}
/**
 * Get liquidation history
 */
export async function getLiquidationHistory() {
    validateConfig();
    console.log('📋 Getting liquidation history...');
    try {
        const result = await signAndSendRequest('GET', '/v1/liquidation/history');
        console.log('✅ Liquidation history retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get liquidation history:', error);
        throw error;
    }
}
