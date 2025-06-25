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
declare const settlePnlRequestSchema: z.ZodObject<{
    signature: z.ZodString;
    userAddress: z.ZodString;
    verifyingContract: z.ZodString;
    message: z.ZodObject<{
        brokerId: z.ZodString;
        chainId: z.ZodNumber;
        chainType: z.ZodString;
        settleNonce: z.ZodNumber;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        brokerId: string;
        chainId: number;
        chainType: string;
        settleNonce: number;
        timestamp: number;
    }, {
        brokerId: string;
        chainId: number;
        chainType: string;
        settleNonce: number;
        timestamp: number;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        brokerId: string;
        chainId: number;
        chainType: string;
        settleNonce: number;
        timestamp: number;
    };
    signature: string;
    userAddress: string;
    verifyingContract: string;
}, {
    message: {
        brokerId: string;
        chainId: number;
        chainType: string;
        settleNonce: number;
        timestamp: number;
    };
    signature: string;
    userAddress: string;
    verifyingContract: string;
}>;
declare const internalTransferSchema: z.ZodObject<{
    token: z.ZodString;
    amount: z.ZodString;
    fromAccountId: z.ZodString;
    toAccountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
    amount: string;
    fromAccountId: string;
    toAccountId: string;
}, {
    token: string;
    amount: string;
    fromAccountId: string;
    toAccountId: string;
}>;
declare const holdingsQuerySchema: z.ZodObject<{
    all: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    all?: boolean | undefined;
}, {
    all?: boolean | undefined;
}>;
declare const historyQuerySchema: z.ZodObject<{
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
 * Get asset transaction history
 */
export declare function getAssetHistory(): Promise<any>;
/**
 * Get current holdings (properly implemented as per API docs)
 */
export declare function getHoldings(params?: z.infer<typeof holdingsQuerySchema>): Promise<any>;
/**
 * Create a withdrawal request
 */
export declare function createWithdrawRequest(params: z.infer<typeof withdrawRequestSchema>): Promise<any>;
/**
 * Get settle PnL nonce
 */
export declare function getSettlePnlNonce(): Promise<any>;
/**
 * Request PnL settlement (properly implemented with EIP-712 signature)
 */
export declare function requestPnlSettlement(params: z.infer<typeof settlePnlRequestSchema>): Promise<any>;
/**
 * Get PnL settlement history
 */
export declare function getPnlSettlementHistory(params?: z.infer<typeof historyQuerySchema>): Promise<any>;
/**
 * Create internal transfer
 */
export declare function createInternalTransfer(params: z.infer<typeof internalTransferSchema>): Promise<any>;
/**
 * Get internal transfer history
 */
export declare function getInternalTransferHistory(params?: z.infer<typeof historyQuerySchema>): Promise<any>;
export {};
