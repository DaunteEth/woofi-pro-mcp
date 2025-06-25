import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';
// === REGULAR ORDER SCHEMAS ===
const orderParamsSchema = z.object({
    symbol: z.string().describe("Trading symbol (e.g., PERP_ETH_USDC)"),
    side: z.enum(['BUY', 'SELL']).describe("Order side"),
    order_type: z.enum(['LIMIT', 'MARKET', 'IOC', 'FOK', 'POST_ONLY', 'ASK', 'BID']).describe("Order type"),
    order_price: z.number().optional().describe("Order price (required for LIMIT orders)"),
    order_quantity: z.number().optional().describe("Order quantity"),
    order_amount: z.number().optional().describe("Order amount in quote currency"),
    client_order_id: z.string().optional().describe("Custom order ID (max 36 chars)"),
    visible_quantity: z.number().optional().describe("Visible quantity on orderbook"),
    reduce_only: z.boolean().optional().describe("Reduce only flag"),
    slippage: z.number().optional().describe("Slippage tolerance for MARKET orders"),
    order_tag: z.string().optional().describe("Order tag"),
    level: z.number().min(0).max(4).optional().describe("Price level for ASK/BID orders"),
    post_only_adjust: z.boolean().optional().describe("Adjust price for POST_ONLY orders"),
});
const batchOrderSchema = z.object({
    orders: z.array(orderParamsSchema).describe("Array of orders to create")
});
const editOrderSchema = z.object({
    order_id: z.string().describe("Order ID to edit"),
    order_quantity: z.number().optional().describe("New order quantity"),
    order_price: z.number().optional().describe("New order price"),
});
// === ALGO ORDER SCHEMAS ===
const algoOrderParamsSchema = z.object({
    symbol: z.string().describe("Trading symbol"),
    algo_type: z.enum(['STOP', 'TP_SL', 'POSITIONAL_TP_SL', 'BRACKET', 'TAKE_PROFIT', 'STOP_LOSS']).describe("Algorithm order type"),
    type: z.enum(['LIMIT', 'MARKET', 'CLOSE_POSITION']).optional().describe("Order type"),
    quantity: z.number().optional().describe("Order quantity"),
    side: z.enum(['BUY', 'SELL']).optional().describe("Order side"),
    price: z.number().optional().describe("Order price"),
    trigger_price: z.number().optional().describe("Trigger price"),
    trigger_price_type: z.enum(['MARK_PRICE']).optional().describe("Trigger price type"),
    reduce_only: z.boolean().optional().describe("Reduce only flag"),
    visible_quantity: z.boolean().optional().describe("Visible quantity flag"),
    client_order_id: z.string().optional().describe("Custom order ID"),
    order_tag: z.string().optional().describe("Order tag"),
    child_orders: z.array(z.any()).optional().describe("Child orders for complex algos"),
});
const editAlgoOrderSchema = z.object({
    order_id: z.string().describe("Algo order ID to edit"),
    quantity: z.number().optional().describe("New quantity"),
    price: z.number().optional().describe("New price"),
    trigger_price: z.number().optional().describe("New trigger price"),
});
// === QUERY SCHEMAS ===
const orderQuerySchema = z.object({
    symbol: z.string().optional().describe("Filter by symbol"),
    status: z.enum(['NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED', 'REJECTED', 'INCOMPLETE', 'COMPLETED']).optional().describe("Filter by status"),
    tag: z.string().optional().describe("Filter by tag"),
    order_type: z.enum(['LIMIT', 'MARKET', 'IOC', 'FOK', 'POST_ONLY', 'ASK', 'BID']).optional().describe("Filter by order type"),
    order_tag: z.string().optional().describe("Filter by order tag"),
    side: z.enum(['BUY', 'SELL']).optional().describe("Filter by side"),
    start_t: z.number().optional().describe("Start time filter"),
    end_t: z.number().optional().describe("End time filter"),
    size: z.number().optional().describe("Page size"),
    page: z.number().optional().describe("Page number"),
});
const algoOrderQuerySchema = z.object({
    symbol: z.string().optional().describe("Filter by symbol"),
    algo_type: z.enum(['STOP', 'TP_SL', 'POSITIONAL_TP_SL', 'BRACKET']).optional().describe("Filter by algo type"),
    size: z.number().optional().describe("Page size"),
    page: z.number().optional().describe("Page number"),
});
const cancelAllAfterSchema = z.object({
    timeout: z.number().describe("Timeout in milliseconds")
});
// === REGULAR ORDER FUNCTIONS ===
/**
 * Create a regular order
 */
export async function createOrder(params) {
    validateConfig();
    const validatedParams = orderParamsSchema.parse(params);
    console.log('📋 Creating order:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/order', validatedParams);
        console.log('✅ Order created successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to create order:', error);
        throw error;
    }
}
/**
 * Create multiple orders in batch
 */
export async function batchCreateOrders(params) {
    validateConfig();
    const validatedParams = batchOrderSchema.parse(params);
    console.log('📋 Creating batch orders:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/batch-order', validatedParams);
        console.log('✅ Batch orders created successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to create batch orders:', error);
        throw error;
    }
}
/**
 * Edit an existing order
 */
export async function editOrder(params) {
    validateConfig();
    const validatedParams = editOrderSchema.parse(params);
    const { order_id, ...updateData } = validatedParams;
    console.log(`🔧 Editing order ${order_id}:`, updateData);
    try {
        const result = await signAndSendRequest('PUT', `/v1/order`, { order_id, ...updateData });
        console.log('✅ Order edited successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to edit order:', error);
        throw error;
    }
}
/**
 * Cancel an order by order ID
 */
export async function cancelOrder(orderId) {
    validateConfig();
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    console.log(`🚫 Cancelling order: ${orderId}`);
    try {
        const result = await signAndSendRequest('DELETE', `/v1/order/${orderId}`);
        console.log('✅ Order cancelled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to cancel order:', error);
        throw error;
    }
}
/**
 * Cancel an order by client order ID
 */
export async function cancelOrderByClientId(clientOrderId) {
    validateConfig();
    if (!clientOrderId) {
        throw new Error('Client Order ID is required');
    }
    console.log(`🚫 Cancelling order by client ID: ${clientOrderId}`);
    try {
        const result = await signAndSendRequest('DELETE', `/v1/client/order/${clientOrderId}`);
        console.log('✅ Order cancelled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to cancel order by client ID:', error);
        throw error;
    }
}
/**
 * Cancel all pending orders
 */
export async function cancelAllPendingOrders(symbol) {
    validateConfig();
    const endpoint = symbol ? `/v1/orders?symbol=${encodeURIComponent(symbol)}` : '/v1/orders';
    console.log(`🚫 Cancelling all pending orders${symbol ? ` for ${symbol}` : ''}`);
    try {
        const result = await signAndSendRequest('DELETE', endpoint);
        console.log('✅ All pending orders cancelled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to cancel all pending orders:', error);
        throw error;
    }
}
/**
 * Cancel all orders after a timeout
 */
export async function cancelAllAfter(params) {
    validateConfig();
    const validatedParams = cancelAllAfterSchema.parse(params);
    console.log('🚫 Setting cancel all after timeout:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/cancel-all-after', validatedParams);
        console.log('✅ Cancel all after set successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to set cancel all after:', error);
        throw error;
    }
}
/**
 * Get orders with filtering
 */
export async function getOrders(params) {
    validateConfig();
    const validatedParams = params ? orderQuerySchema.parse(params) : {};
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString() ? `/v1/orders?${queryParams.toString()}` : '/v1/orders';
    console.log('📋 Getting orders with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Orders retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get orders:', error);
        throw error;
    }
}
/**
 * Get order by order ID
 */
export async function getOrderById(orderId) {
    validateConfig();
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    console.log(`📋 Getting order: ${orderId}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/order/${orderId}`);
        console.log('✅ Order retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get order:', error);
        throw error;
    }
}
/**
 * Get order by client order ID
 */
export async function getOrderByClientId(clientOrderId) {
    validateConfig();
    if (!clientOrderId) {
        throw new Error('Client Order ID is required');
    }
    console.log(`📋 Getting order by client ID: ${clientOrderId}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/client/order/${clientOrderId}`);
        console.log('✅ Order retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get order by client ID:', error);
        throw error;
    }
}
// === ALGO ORDER FUNCTIONS ===
/**
 * Create an algo order
 */
export async function createAlgoOrder(params) {
    validateConfig();
    const validatedParams = algoOrderParamsSchema.parse(params);
    console.log('📋 Creating algo order:', validatedParams);
    try {
        const result = await signAndSendRequest('POST', '/v1/algo/order', validatedParams);
        console.log('✅ Algo order created successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to create algo order:', error);
        throw error;
    }
}
/**
 * Edit an algo order
 */
export async function editAlgoOrder(params) {
    validateConfig();
    const validatedParams = editAlgoOrderSchema.parse(params);
    console.log('🔧 Editing algo order:', validatedParams);
    try {
        const result = await signAndSendRequest('PUT', '/v1/algo/order', validatedParams);
        console.log('✅ Algo order edited successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to edit algo order:', error);
        throw error;
    }
}
/**
 * Cancel an algo order by order ID
 */
export async function cancelAlgoOrder(orderId, symbol) {
    validateConfig();
    if (!orderId || !symbol) {
        throw new Error('Order ID and symbol are required');
    }
    console.log(`🚫 Cancelling algo order: ${orderId} for symbol: ${symbol}`);
    try {
        const endpoint = `/v1/algo/order?order_id=${encodeURIComponent(orderId)}&symbol=${encodeURIComponent(symbol)}`;
        const result = await signAndSendRequest('DELETE', endpoint);
        console.log('✅ Algo order cancelled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to cancel algo order:', error);
        throw error;
    }
}
/**
 * Cancel an algo order by client order ID
 */
export async function cancelAlgoOrderByClientId(clientOrderId, symbol) {
    validateConfig();
    if (!clientOrderId || !symbol) {
        throw new Error('Client Order ID and symbol are required');
    }
    console.log(`🚫 Cancelling algo order by client ID: ${clientOrderId} for symbol: ${symbol}`);
    try {
        const endpoint = `/v1/algo/client/order?client_order_id=${encodeURIComponent(clientOrderId)}&symbol=${encodeURIComponent(symbol)}`;
        const result = await signAndSendRequest('DELETE', endpoint);
        console.log('✅ Algo order cancelled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to cancel algo order by client ID:', error);
        throw error;
    }
}
/**
 * Cancel all pending algo orders
 */
export async function cancelAllPendingAlgoOrders(symbol) {
    validateConfig();
    const endpoint = symbol ? `/v1/algo/orders?symbol=${encodeURIComponent(symbol)}` : '/v1/algo/orders';
    console.log(`🚫 Cancelling all pending algo orders${symbol ? ` for ${symbol}` : ''}`);
    try {
        const result = await signAndSendRequest('DELETE', endpoint);
        console.log('✅ All pending algo orders cancelled successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to cancel all pending algo orders:', error);
        throw error;
    }
}
/**
 * Get algo orders with filtering
 */
export async function getAlgoOrders(params) {
    validateConfig();
    const validatedParams = params ? algoOrderQuerySchema.parse(params) : {};
    const queryParams = new URLSearchParams();
    Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });
    const endpoint = queryParams.toString() ? `/v1/algo/orders?${queryParams.toString()}` : '/v1/algo/orders';
    console.log('📋 Getting algo orders with params:', validatedParams);
    try {
        const result = await signAndSendRequest('GET', endpoint);
        console.log('✅ Algo orders retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get algo orders:', error);
        throw error;
    }
}
/**
 * Get algo order by order ID
 */
export async function getAlgoOrderById(orderId) {
    validateConfig();
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    console.log(`📋 Getting algo order: ${orderId}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/algo/order/${orderId}`);
        console.log('✅ Algo order retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get algo order:', error);
        throw error;
    }
}
/**
 * Get algo order by client order ID
 */
export async function getAlgoOrderByClientId(clientOrderId) {
    validateConfig();
    if (!clientOrderId) {
        throw new Error('Client Order ID is required');
    }
    console.log(`📋 Getting algo order by client ID: ${clientOrderId}`);
    try {
        const result = await signAndSendRequest('GET', `/v1/algo/client/order/${clientOrderId}`);
        console.log('✅ Algo order retrieved successfully:', result);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to get algo order by client ID:', error);
        throw error;
    }
}
