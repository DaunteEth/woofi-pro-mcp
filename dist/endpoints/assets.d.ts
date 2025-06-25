import { z } from 'zod';
declare const withdrawRequestSchema: z.ZodObject<{
    token: z.ZodString;
    amount: z.ZodString;
    address: z.ZodString;
    extra_memo: z.ZodOptional<z.ZodString>;
    network_type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    token: string;
    amount: string;
    address: string;
    extra_memo?: string | undefined;
    network_type?: string | undefined;
}, {
    token: string;
    amount: string;
    address: string;
    extra_memo?: string | undefined;
    network_type?: string | undefined;
}>;
/**
 * Get asset transaction history
 */
export declare function getAssetHistory(): Promise<any>;
/**
 * Get current holdings
 */
export declare function getHoldings(): Promise<any>;
/**
 * Create a withdrawal request
 */
export declare function createWithdrawRequest(params: z.infer<typeof withdrawRequestSchema>): Promise<any>;
/**
 * Settle PnL
 */
export declare function settlePnl(): Promise<any>;
export {};
