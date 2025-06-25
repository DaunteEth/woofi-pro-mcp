import { z } from 'zod';
declare const liquidationQuerySchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    start_t: z.ZodOptional<z.ZodNumber>;
    end_t: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    symbol?: string | undefined;
    start_t?: number | undefined;
    end_t?: number | undefined;
    size?: number | undefined;
    page?: number | undefined;
}, {
    symbol?: string | undefined;
    start_t?: number | undefined;
    end_t?: number | undefined;
    size?: number | undefined;
    page?: number | undefined;
}>;
declare const claimLiquidationSchema: z.ZodObject<{
    liquidation_id: z.ZodNumber;
    liquidator_id: z.ZodString;
    symbol: z.ZodString;
    position_qty: z.ZodString;
    cost_position: z.ZodString;
    liquidator_fee: z.ZodString;
    insurance_fund_fee: z.ZodString;
    mark_price: z.ZodString;
    sum_unitary_fundings: z.ZodString;
    liquidated_time: z.ZodNumber;
    signature: z.ZodString;
    userAddress: z.ZodString;
    verifyingContract: z.ZodString;
    message: z.ZodObject<{
        brokerId: z.ZodString;
        chainId: z.ZodNumber;
        chainType: z.ZodString;
        liquidationId: z.ZodNumber;
        liquidatorId: z.ZodString;
        symbol: z.ZodString;
        positionQty: z.ZodString;
        costPosition: z.ZodString;
        liquidatorFee: z.ZodString;
        insuranceFundFee: z.ZodString;
        markPrice: z.ZodString;
        sumUnitaryFundings: z.ZodString;
        liquidatedTime: z.ZodNumber;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        liquidatorId: string;
        positionQty: string;
        costPosition: string;
        liquidatorFee: string;
        insuranceFundFee: string;
        markPrice: string;
        sumUnitaryFundings: string;
        liquidatedTime: number;
    }, {
        symbol: string;
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        liquidatorId: string;
        positionQty: string;
        costPosition: string;
        liquidatorFee: string;
        insuranceFundFee: string;
        markPrice: string;
        sumUnitaryFundings: string;
        liquidatedTime: number;
    }>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    message: {
        symbol: string;
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        liquidatorId: string;
        positionQty: string;
        costPosition: string;
        liquidatorFee: string;
        insuranceFundFee: string;
        markPrice: string;
        sumUnitaryFundings: string;
        liquidatedTime: number;
    };
    signature: string;
    userAddress: string;
    verifyingContract: string;
    liquidation_id: number;
    liquidator_id: string;
    position_qty: string;
    cost_position: string;
    liquidator_fee: string;
    insurance_fund_fee: string;
    mark_price: string;
    sum_unitary_fundings: string;
    liquidated_time: number;
}, {
    symbol: string;
    message: {
        symbol: string;
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        liquidatorId: string;
        positionQty: string;
        costPosition: string;
        liquidatorFee: string;
        insuranceFundFee: string;
        markPrice: string;
        sumUnitaryFundings: string;
        liquidatedTime: number;
    };
    signature: string;
    userAddress: string;
    verifyingContract: string;
    liquidation_id: number;
    liquidator_id: string;
    position_qty: string;
    cost_position: string;
    liquidator_fee: string;
    insurance_fund_fee: string;
    mark_price: string;
    sum_unitary_fundings: string;
    liquidated_time: number;
}>;
declare const claimInsuranceFundSchema: z.ZodObject<{
    liquidation_id: z.ZodNumber;
    transfer_amount_to_insurance_fund: z.ZodString;
    signature: z.ZodString;
    userAddress: z.ZodString;
    verifyingContract: z.ZodString;
    message: z.ZodObject<{
        brokerId: z.ZodString;
        chainId: z.ZodNumber;
        chainType: z.ZodString;
        liquidationId: z.ZodNumber;
        transferAmountToInsuranceFund: z.ZodString;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        transferAmountToInsuranceFund: string;
    }, {
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        transferAmountToInsuranceFund: string;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        transferAmountToInsuranceFund: string;
    };
    signature: string;
    userAddress: string;
    verifyingContract: string;
    liquidation_id: number;
    transfer_amount_to_insurance_fund: string;
}, {
    message: {
        brokerId: string;
        chainId: number;
        chainType: string;
        timestamp: number;
        liquidationId: number;
        transferAmountToInsuranceFund: string;
    };
    signature: string;
    userAddress: string;
    verifyingContract: string;
    liquidation_id: number;
    transfer_amount_to_insurance_fund: string;
}>;
/**
 * Get public liquidated positions (public endpoint)
 */
export declare function getLiquidatedPositions(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Get positions under liquidation (public endpoint)
 */
export declare function getPositionsUnderLiquidation(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Get liquidations (private endpoint for user's liquidation data)
 */
export declare function getLiquidations(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Claim liquidated positions (private POST endpoint)
 */
export declare function claimLiquidatedPositions(params: z.infer<typeof claimLiquidationSchema>): Promise<any>;
/**
 * Claim insurance fund (private POST endpoint)
 */
export declare function claimInsuranceFund(params: z.infer<typeof claimInsuranceFundSchema>): Promise<any>;
/**
 * Get insurance fund details (public endpoint)
 */
export declare function getInsuranceFund(): Promise<any>;
export {};
