import { z } from 'zod';
declare const woofiOrderSchema: z.ZodObject<{
    tokenIn: z.ZodString;
    tokenOut: z.ZodString;
    amountIn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
}, {
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
}>;
/**
 * Create WOOFi order
 */
export declare function createWoofiOrder(params: z.infer<typeof woofiOrderSchema>): Promise<any>;
/**
 * Get WOOFi portfolio
 */
export declare function getWoofiPortfolio(): Promise<any>;
/**
 * Get WOOFi order history
 */
export declare function getWoofiOrderHistory(): Promise<any>;
export declare function getWoofiTokens(): Promise<any>;
export declare function getWoofiQuote(tokenIn: string, tokenOut: string, amountIn: string): Promise<any>;
export {};
