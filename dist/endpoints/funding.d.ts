import { z } from 'zod';
declare const fundingFeeHistoryQuerySchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    start_t: z.ZodOptional<z.ZodString>;
    end_t: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    symbol?: string | undefined;
    start_t?: string | undefined;
    end_t?: string | undefined;
    size?: string | undefined;
    page?: string | undefined;
}, {
    symbol?: string | undefined;
    start_t?: string | undefined;
    end_t?: string | undefined;
    size?: string | undefined;
    page?: string | undefined;
}>;
/**
 * Get funding fee history
 */
export declare function getFundingFeeHistory(params?: z.infer<typeof fundingFeeHistoryQuerySchema>): Promise<any>;
export {};
