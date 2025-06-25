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
/**
 * Get public liquidated positions (public endpoint)
 */
export declare function getLiquidatedPositions(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Get liquidations (private endpoint for user's liquidation data)
 */
export declare function getLiquidations(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Get liquidation history (private endpoint)
 */
export declare function getLiquidationHistory(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Get liquidation details by ID (private endpoint)
 */
export declare function getLiquidationById(liquidationId: string): Promise<any>;
/**
 * Get liquidation orders (private endpoint)
 */
export declare function getLiquidationOrders(params?: z.infer<typeof liquidationQuerySchema>): Promise<any>;
/**
 * Get insurance fund details (public endpoint)
 */
export declare function getInsuranceFund(): Promise<any>;
export {};
