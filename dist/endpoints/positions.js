import { signAndSendRequest, validateConfig } from '../utils/auth.js';
/**
 * Get all positions
 */
export async function getAllPositions() {
    validateConfig();
    console.log('📋 Getting all positions...');
    try {
        const result = await signAndSendRequest('GET', '/v1/positions');
        console.log('✅ All positions retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get positions:', error);
        throw error;
    }
}
/**
 * Get position for a specific symbol
 */
export async function getPositionBySymbol(symbol) {
    validateConfig();
    if (!symbol) {
        throw new Error('Symbol is required');
    }
    console.log(`📋 Getting position for symbol: ${symbol}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/position/${encodeURIComponent(symbol)}`);
        console.log('✅ Position retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get position:', error);
        throw error;
    }
}
/**
 * Get aggregated positions
 */
export async function getAggregatedPositions() {
    validateConfig();
    console.log('📋 Getting aggregated positions...');
    try {
        const result = await signAndSendRequest('GET', '/v1/positions/aggregate');
        console.log('✅ Aggregated positions retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get aggregated positions:', error);
        throw error;
    }
}
