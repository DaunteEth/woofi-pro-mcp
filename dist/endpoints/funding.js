import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';
// Zod schema for funding fee history query parameters
const fundingFeeHistoryQuerySchema = z.object({
    symbol: z.string().optional(),
    start_t: z.string().optional(),
    end_t: z.string().optional(),
    page: z.string().optional(),
    size: z.string().optional(),
});
/**
 * Get funding rates for symbols
 */
export async function getFundingRates(symbol) {
    validateConfig();
    const endpoint = symbol
        ? `/v1/public/funding_rate_history/${encodeURIComponent(symbol)}`
        : '/v1/public/funding_rates';
    console.log(`📋 Getting funding rates${symbol ? ` for ${symbol}` : ''}...`);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Funding rates retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get funding rates:', error);
        throw error;
    }
}
/**
 * Get funding rate history for a symbol
 */
export async function getFundingRateHistory(symbol) {
    validateConfig();
    if (!symbol) {
        throw new Error('Symbol is required');
    }
    console.log(`📋 Getting funding rate history for ${symbol}...`);
    try {
        const result = await signAndSendRequest('GET', `/v1/public/funding_rate_history/${encodeURIComponent(symbol)}`);
        console.log('✅ Funding rate history retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get funding rate history:', error);
        throw error;
    }
}
/**
 * Get funding fee history
 */
export async function getFundingFeeHistory(params) {
    validateConfig();
    // Validate and prepare query parameters
    const validatedParams = params ? fundingFeeHistoryQuerySchema.parse(params) : {};
    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString()
        ? `/v1/funding_fee/history?${queryParams.toString()}`
        : '/v1/funding_fee/history';
    console.log(`📋 Getting funding fee history with params:`, validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Funding fee history retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get funding fee history:', error);
        throw error;
    }
}
/**
 * Get estimated funding rate for a symbol
 */
export async function getEstimatedFundingRate(symbol) {
    validateConfig();
    if (!symbol) {
        throw new Error('Symbol is required');
    }
    console.log(`📋 Getting estimated funding rate for: ${symbol}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/estimated_funding_rate?symbol=${encodeURIComponent(symbol)}`);
        console.log('✅ Estimated funding rate retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get estimated funding rate:', error);
        throw error;
    }
}
