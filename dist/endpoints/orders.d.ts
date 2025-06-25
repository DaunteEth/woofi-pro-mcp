import { z } from 'zod';
declare const orderParamsSchema: z.ZodObject<{
    symbol: z.ZodString;
    side: z.ZodEnum<["BUY", "SELL"]>;
    order_type: z.ZodEnum<["LIMIT", "MARKET", "IOC", "FOK", "POST_ONLY", "ASK", "BID"]>;
    order_price: z.ZodOptional<z.ZodNumber>;
    order_quantity: z.ZodOptional<z.ZodNumber>;
    order_amount: z.ZodOptional<z.ZodNumber>;
    client_order_id: z.ZodOptional<z.ZodString>;
    visible_quantity: z.ZodOptional<z.ZodNumber>;
    reduce_only: z.ZodOptional<z.ZodBoolean>;
    slippage: z.ZodOptional<z.ZodNumber>;
    order_tag: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodNumber>;
    order_amount_type: z.ZodOptional<z.ZodEnum<["BASIC", "PERCENTAGE"]>>;
    is_hedge: z.ZodOptional<z.ZodBoolean>;
    post_only_adjust: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    side: "BUY" | "SELL";
    order_type: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID";
    order_price?: number | undefined;
    order_quantity?: number | undefined;
    order_amount?: number | undefined;
    client_order_id?: string | undefined;
    visible_quantity?: number | undefined;
    reduce_only?: boolean | undefined;
    slippage?: number | undefined;
    order_tag?: string | undefined;
    level?: number | undefined;
    order_amount_type?: "BASIC" | "PERCENTAGE" | undefined;
    is_hedge?: boolean | undefined;
    post_only_adjust?: boolean | undefined;
}, {
    symbol: string;
    side: "BUY" | "SELL";
    order_type: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID";
    order_price?: number | undefined;
    order_quantity?: number | undefined;
    order_amount?: number | undefined;
    client_order_id?: string | undefined;
    visible_quantity?: number | undefined;
    reduce_only?: boolean | undefined;
    slippage?: number | undefined;
    order_tag?: string | undefined;
    level?: number | undefined;
    order_amount_type?: "BASIC" | "PERCENTAGE" | undefined;
    is_hedge?: boolean | undefined;
    post_only_adjust?: boolean | undefined;
}>;
declare const batchOrderSchema: z.ZodObject<{
    orders: z.ZodArray<z.ZodObject<{
        symbol: z.ZodString;
        side: z.ZodEnum<["BUY", "SELL"]>;
        order_type: z.ZodEnum<["LIMIT", "MARKET", "IOC", "FOK", "POST_ONLY", "ASK", "BID"]>;
        order_price: z.ZodOptional<z.ZodNumber>;
        order_quantity: z.ZodOptional<z.ZodNumber>;
        order_amount: z.ZodOptional<z.ZodNumber>;
        client_order_id: z.ZodOptional<z.ZodString>;
        visible_quantity: z.ZodOptional<z.ZodNumber>;
        reduce_only: z.ZodOptional<z.ZodBoolean>;
        slippage: z.ZodOptional<z.ZodNumber>;
        order_tag: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodNumber>;
        order_amount_type: z.ZodOptional<z.ZodEnum<["BASIC", "PERCENTAGE"]>>;
        is_hedge: z.ZodOptional<z.ZodBoolean>;
        post_only_adjust: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        side: "BUY" | "SELL";
        order_type: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID";
        order_price?: number | undefined;
        order_quantity?: number | undefined;
        order_amount?: number | undefined;
        client_order_id?: string | undefined;
        visible_quantity?: number | undefined;
        reduce_only?: boolean | undefined;
        slippage?: number | undefined;
        order_tag?: string | undefined;
        level?: number | undefined;
        order_amount_type?: "BASIC" | "PERCENTAGE" | undefined;
        is_hedge?: boolean | undefined;
        post_only_adjust?: boolean | undefined;
    }, {
        symbol: string;
        side: "BUY" | "SELL";
        order_type: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID";
        order_price?: number | undefined;
        order_quantity?: number | undefined;
        order_amount?: number | undefined;
        client_order_id?: string | undefined;
        visible_quantity?: number | undefined;
        reduce_only?: boolean | undefined;
        slippage?: number | undefined;
        order_tag?: string | undefined;
        level?: number | undefined;
        order_amount_type?: "BASIC" | "PERCENTAGE" | undefined;
        is_hedge?: boolean | undefined;
        post_only_adjust?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    orders: {
        symbol: string;
        side: "BUY" | "SELL";
        order_type: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID";
        order_price?: number | undefined;
        order_quantity?: number | undefined;
        order_amount?: number | undefined;
        client_order_id?: string | undefined;
        visible_quantity?: number | undefined;
        reduce_only?: boolean | undefined;
        slippage?: number | undefined;
        order_tag?: string | undefined;
        level?: number | undefined;
        order_amount_type?: "BASIC" | "PERCENTAGE" | undefined;
        is_hedge?: boolean | undefined;
        post_only_adjust?: boolean | undefined;
    }[];
}, {
    orders: {
        symbol: string;
        side: "BUY" | "SELL";
        order_type: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID";
        order_price?: number | undefined;
        order_quantity?: number | undefined;
        order_amount?: number | undefined;
        client_order_id?: string | undefined;
        visible_quantity?: number | undefined;
        reduce_only?: boolean | undefined;
        slippage?: number | undefined;
        order_tag?: string | undefined;
        level?: number | undefined;
        order_amount_type?: "BASIC" | "PERCENTAGE" | undefined;
        is_hedge?: boolean | undefined;
        post_only_adjust?: boolean | undefined;
    }[];
}>;
declare const orderQuerySchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["NEW", "PARTIALLY_FILLED", "FILLED", "CANCELLED", "REJECTED", "INCOMPLETE", "COMPLETED"]>>;
    tag: z.ZodOptional<z.ZodString>;
    order_type: z.ZodOptional<z.ZodEnum<["LIMIT", "MARKET", "IOC", "FOK", "POST_ONLY", "ASK", "BID"]>>;
    order_tag: z.ZodOptional<z.ZodString>;
    side: z.ZodOptional<z.ZodEnum<["BUY", "SELL"]>>;
    start_t: z.ZodOptional<z.ZodNumber>;
    end_t: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    symbol?: string | undefined;
    side?: "BUY" | "SELL" | undefined;
    status?: "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED" | "REJECTED" | "INCOMPLETE" | "COMPLETED" | undefined;
    order_type?: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID" | undefined;
    order_tag?: string | undefined;
    tag?: string | undefined;
    start_t?: number | undefined;
    end_t?: number | undefined;
    size?: number | undefined;
    page?: number | undefined;
}, {
    symbol?: string | undefined;
    side?: "BUY" | "SELL" | undefined;
    status?: "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED" | "REJECTED" | "INCOMPLETE" | "COMPLETED" | undefined;
    order_type?: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID" | undefined;
    order_tag?: string | undefined;
    tag?: string | undefined;
    start_t?: number | undefined;
    end_t?: number | undefined;
    size?: number | undefined;
    page?: number | undefined;
}>;
/**
 * Create an order
 */
export declare function createOrder(params: z.infer<typeof orderParamsSchema>): Promise<any>;
/**
 * Cancel an order by ID
 */
export declare function cancelOrder(orderId: string): Promise<any>;
/**
 * Cancel all pending orders for a symbol
 */
export declare function cancelAllOrders(symbol?: string): Promise<any>;
/**
 * Get orders with optional filtering
 */
export declare function getOrders(params?: z.infer<typeof orderQuerySchema>): Promise<any>;
/**
 * Get order by ID
 */
export declare function getOrder(orderId: string): Promise<any>;
/**
 * Create multiple orders in batch
 */
export declare function batchCreateOrders(params: z.infer<typeof batchOrderSchema>): Promise<any>;
export {};
