import { z } from 'zod';
declare const claimLiquidationSchema: z.ZodObject<{
    liquidation_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    liquidation_id: string;
}, {
    liquidation_id: string;
}>;
/**
 * Get liquidation data
 */
export declare function getLiquidations(): Promise<any>;
/**
 * Claim liquidation
 */
export declare function claimLiquidation(params: z.infer<typeof claimLiquidationSchema>): Promise<any>;
/**
 * Get liquidation history
 */
export declare function getLiquidationHistory(): Promise<any>;
export {};
