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
// Schema for claiming liquidated positions
const claimLiquidationSchema = z.object({
    liquidation_id: z.number(),
    liquidator_id: z.string(),
    symbol: z.string(),
    position_qty: z.string(),
    cost_position: z.string(),
    liquidator_fee: z.string(),
    insurance_fund_fee: z.string(),
    mark_price: z.string(),
    sum_unitary_fundings: z.string(),
    liquidated_time: z.number(),
    signature: z.string(),
    userAddress: z.string(),
    verifyingContract: z.string(),
    message: z.object({
        brokerId: z.string(),
        chainId: z.number(),
        chainType: z.string(),
        liquidationId: z.number(),
        liquidatorId: z.string(),
        symbol: z.string(),
        positionQty: z.string(),
        costPosition: z.string(),
        liquidatorFee: z.string(),
        insuranceFundFee: z.string(),
        markPrice: z.string(),
        sumUnitaryFundings: z.string(),
        liquidatedTime: z.number(),
        timestamp: z.number(),
    }),
});
// Schema for claiming insurance fund
const claimInsuranceFundSchema = z.object({
    liquidation_id: z.number(),
    transfer_amount_to_insurance_fund: z.string(),
    signature: z.string(),
    userAddress: z.string(),
    verifyingContract: z.string(),
    message: z.object({
        brokerId: z.string(),
        chainId: z.number(),
        chainType: z.string(),
        liquidationId: z.number(),
        transferAmountToInsuranceFund: z.string(),
        timestamp: z.number(),
    }),
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
 * Get positions under liquidation (public endpoint)
 */
export async function getPositionsUnderLiquidation(params) {
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
        ? `/v1/public/liquidation?${queryParams.toString()}`
        : '/v1/public/liquidation';
    console.log('📋 Getting positions under liquidation with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Positions under liquidation retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get positions under liquidation:', error);
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
 * Claim liquidated positions (private POST endpoint)
 */
export async function claimLiquidatedPositions(params) {
    validateConfig();
    // Validate input parameters
    const validatedParams = claimLiquidationSchema.parse(params);
    console.log('📋 Claiming liquidated positions:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/liquidation', validatedParams);
        console.log('✅ Liquidated positions claimed successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to claim liquidated positions:', error);
        throw error;
    }
}
/**
 * Claim insurance fund (private POST endpoint)
 */
export async function claimInsuranceFund(params) {
    validateConfig();
    // Validate input parameters
    const validatedParams = claimInsuranceFundSchema.parse(params);
    console.log('📋 Claiming insurance fund:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/claim_insurance_fund', validatedParams);
        console.log('✅ Insurance fund claimed successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to claim insurance fund:', error);
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
