import { z } from 'zod';
declare const positionHistoryQuerySchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    symbol?: string | undefined;
    limit?: number | undefined;
}, {
    symbol?: string | undefined;
    limit?: number | undefined;
}>;
/**
 * Get all positions
 */
export declare function getAllPositions(): Promise<any>;
/**
 * Get position for a specific symbol
 */
export declare function getPositionBySymbol(symbol: string): Promise<any>;
/**
 * Get position history
 */
export declare function getPositionHistory(params?: z.infer<typeof positionHistoryQuerySchema>): Promise<any>;
export {};
