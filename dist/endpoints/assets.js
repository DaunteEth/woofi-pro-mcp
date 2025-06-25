import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';
// Zod schemas for input validation
const withdrawRequestSchema = z.object({
    token: z.string(),
    amount: z.string(),
    address: z.string(),
    extra_memo: z.string().optional(),
    network_type: z.string().optional(),
});
/**
 * Get asset transaction history
 */
export async function getAssetHistory() {
    validateConfig();
    console.log('📋 Getting asset history...');
    try {
        const result = await signAndSendRequest('GET', '/v1/asset/history');
        console.log('✅ Asset history retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get asset history:', error);
        throw error;
    }
}
/**
 * Get current holdings
 */
export async function getHoldings() {
    validateConfig();
    console.log('📋 Getting current holdings...');
    try {
        const result = await signAndSendRequest('GET', '/v1/client/holding');
        console.log('✅ Current holdings retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get current holdings:', error);
        throw error;
    }
}
/**
 * Create a withdrawal request
 */
export async function createWithdrawRequest(params) {
    validateConfig();
    // Validate input parameters
    const validatedParams = withdrawRequestSchema.parse(params);
    console.log('📋 Creating withdrawal request:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/withdraw_request', validatedParams);
        console.log('✅ Withdrawal request created successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to create withdrawal request:', error);
        throw error;
    }
}
/**
 * Settle PnL
 */
export async function settlePnl() {
    validateConfig();
    console.log('📋 Settling PnL...');
    try {
        const result = await signAndSendRequest('POST', '/v1/settle_pnl');
        console.log('✅ PnL settled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to settle PnL:', error);
        throw error;
    }
}
