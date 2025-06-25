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
        post_only_adjust?: boolean | undefined;
    }[];
}>;
declare const editOrderSchema: z.ZodObject<{
    order_id: z.ZodString;
    order_quantity: z.ZodOptional<z.ZodNumber>;
    order_price: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    order_id: string;
    order_price?: number | undefined;
    order_quantity?: number | undefined;
}, {
    order_id: string;
    order_price?: number | undefined;
    order_quantity?: number | undefined;
}>;
declare const algoOrderParamsSchema: z.ZodObject<{
    symbol: z.ZodString;
    algo_type: z.ZodEnum<["STOP", "TP_SL", "POSITIONAL_TP_SL", "BRACKET", "TAKE_PROFIT", "STOP_LOSS"]>;
    type: z.ZodOptional<z.ZodEnum<["LIMIT", "MARKET", "CLOSE_POSITION"]>>;
    quantity: z.ZodOptional<z.ZodNumber>;
    side: z.ZodOptional<z.ZodEnum<["BUY", "SELL"]>>;
    price: z.ZodOptional<z.ZodNumber>;
    trigger_price: z.ZodOptional<z.ZodNumber>;
    trigger_price_type: z.ZodOptional<z.ZodEnum<["MARK_PRICE"]>>;
    reduce_only: z.ZodOptional<z.ZodBoolean>;
    visible_quantity: z.ZodOptional<z.ZodBoolean>;
    client_order_id: z.ZodOptional<z.ZodString>;
    order_tag: z.ZodOptional<z.ZodString>;
    child_orders: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    algo_type: "STOP" | "TP_SL" | "POSITIONAL_TP_SL" | "BRACKET" | "TAKE_PROFIT" | "STOP_LOSS";
    side?: "BUY" | "SELL" | undefined;
    client_order_id?: string | undefined;
    visible_quantity?: boolean | undefined;
    reduce_only?: boolean | undefined;
    order_tag?: string | undefined;
    type?: "LIMIT" | "MARKET" | "CLOSE_POSITION" | undefined;
    quantity?: number | undefined;
    price?: number | undefined;
    trigger_price?: number | undefined;
    trigger_price_type?: "MARK_PRICE" | undefined;
    child_orders?: any[] | undefined;
}, {
    symbol: string;
    algo_type: "STOP" | "TP_SL" | "POSITIONAL_TP_SL" | "BRACKET" | "TAKE_PROFIT" | "STOP_LOSS";
    side?: "BUY" | "SELL" | undefined;
    client_order_id?: string | undefined;
    visible_quantity?: boolean | undefined;
    reduce_only?: boolean | undefined;
    order_tag?: string | undefined;
    type?: "LIMIT" | "MARKET" | "CLOSE_POSITION" | undefined;
    quantity?: number | undefined;
    price?: number | undefined;
    trigger_price?: number | undefined;
    trigger_price_type?: "MARK_PRICE" | undefined;
    child_orders?: any[] | undefined;
}>;
declare const editAlgoOrderSchema: z.ZodObject<{
    order_id: z.ZodString;
    quantity: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    trigger_price: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    order_id: string;
    quantity?: number | undefined;
    price?: number | undefined;
    trigger_price?: number | undefined;
}, {
    order_id: string;
    quantity?: number | undefined;
    price?: number | undefined;
    trigger_price?: number | undefined;
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
    order_type?: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID" | undefined;
    order_tag?: string | undefined;
    status?: "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED" | "REJECTED" | "INCOMPLETE" | "COMPLETED" | undefined;
    tag?: string | undefined;
    start_t?: number | undefined;
    end_t?: number | undefined;
    size?: number | undefined;
    page?: number | undefined;
}, {
    symbol?: string | undefined;
    side?: "BUY" | "SELL" | undefined;
    order_type?: "LIMIT" | "MARKET" | "IOC" | "FOK" | "POST_ONLY" | "ASK" | "BID" | undefined;
    order_tag?: string | undefined;
    status?: "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELLED" | "REJECTED" | "INCOMPLETE" | "COMPLETED" | undefined;
    tag?: string | undefined;
    start_t?: number | undefined;
    end_t?: number | undefined;
    size?: number | undefined;
    page?: number | undefined;
}>;
declare const algoOrderQuerySchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    algo_type: z.ZodOptional<z.ZodEnum<["STOP", "TP_SL", "POSITIONAL_TP_SL", "BRACKET"]>>;
    size: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    symbol?: string | undefined;
    algo_type?: "STOP" | "TP_SL" | "POSITIONAL_TP_SL" | "BRACKET" | undefined;
    size?: number | undefined;
    page?: number | undefined;
}, {
    symbol?: string | undefined;
    algo_type?: "STOP" | "TP_SL" | "POSITIONAL_TP_SL" | "BRACKET" | undefined;
    size?: number | undefined;
    page?: number | undefined;
}>;
declare const cancelAllAfterSchema: z.ZodObject<{
    timeout: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    timeout: number;
}, {
    timeout: number;
}>;
/**
 * Create a regular order
 */
export declare function createOrder(params: z.infer<typeof orderParamsSchema>): Promise<any>;
/**
 * Create multiple orders in batch
 */
export declare function batchCreateOrders(params: z.infer<typeof batchOrderSchema>): Promise<any>;
/**
 * Edit an existing order
 */
export declare function editOrder(params: z.infer<typeof editOrderSchema>): Promise<any>;
/**
 * Cancel an order by order ID
 */
export declare function cancelOrder(orderId: string): Promise<any>;
/**
 * Cancel an order by client order ID
 */
export declare function cancelOrderByClientId(clientOrderId: string): Promise<any>;
/**
 * Cancel all pending orders
 */
export declare function cancelAllPendingOrders(symbol?: string): Promise<any>;
/**
 * Cancel all orders after a timeout
 */
export declare function cancelAllAfter(params: z.infer<typeof cancelAllAfterSchema>): Promise<any>;
/**
 * Get orders with filtering
 */
export declare function getOrders(params?: z.infer<typeof orderQuerySchema>): Promise<any>;
/**
 * Get order by order ID
 */
export declare function getOrderById(orderId: string): Promise<any>;
/**
 * Get order by client order ID
 */
export declare function getOrderByClientId(clientOrderId: string): Promise<any>;
/**
 * Create an algo order
 */
export declare function createAlgoOrder(params: z.infer<typeof algoOrderParamsSchema>): Promise<any>;
/**
 * Edit an algo order
 */
export declare function editAlgoOrder(params: z.infer<typeof editAlgoOrderSchema>): Promise<any>;
/**
 * Cancel an algo order by order ID
 */
export declare function cancelAlgoOrder(orderId: string): Promise<any>;
/**
 * Cancel an algo order by client order ID
 */
export declare function cancelAlgoOrderByClientId(clientOrderId: string): Promise<any>;
/**
 * Cancel all pending algo orders
 */
export declare function cancelAllPendingAlgoOrders(symbol?: string): Promise<any>;
/**
 * Get algo orders with filtering
 */
export declare function getAlgoOrders(params?: z.infer<typeof algoOrderQuerySchema>): Promise<any>;
/**
 * Get algo order by order ID
 */
export declare function getAlgoOrderById(orderId: string): Promise<any>;
/**
 * Get algo order by client order ID
 */
export declare function getAlgoOrderByClientId(clientOrderId: string): Promise<any>;
export {};
