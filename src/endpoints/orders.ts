import { z } from 'zod';
import { signAndSendRequest, getBaseUrl, validateConfig } from '../utils/auth.js';

// Zod schemas for input validation
const orderParamsSchema = z.object({
  symbol: z.string(),
  side: z.enum(['BUY', 'SELL']),
  order_type: z.enum(['LIMIT', 'MARKET', 'IOC', 'FOK', 'POST_ONLY', 'ASK', 'BID']),
  order_price: z.number().optional(),
  order_quantity: z.number().optional(),
  order_amount: z.number().optional(),
  client_order_id: z.string().optional(),
  visible_quantity: z.number().optional(),
  reduce_only: z.boolean().optional(),
  slippage: z.number().optional(),
  order_tag: z.string().optional(),
  level: z.number().min(0).max(4).optional(),
  order_amount_type: z.enum(['BASIC', 'PERCENTAGE']).optional(),
  is_hedge: z.boolean().optional(),
  post_only_adjust: z.boolean().optional(),
});

const batchOrderSchema = z.object({
  orders: z.array(orderParamsSchema)
});

const orderQuerySchema = z.object({
  symbol: z.string().optional(),
  status: z.enum(['NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED', 'REJECTED', 'INCOMPLETE', 'COMPLETED']).optional(),
  tag: z.string().optional(),
  order_type: z.enum(['LIMIT', 'MARKET', 'IOC', 'FOK', 'POST_ONLY', 'ASK', 'BID']).optional(),
  order_tag: z.string().optional(),
  side: z.enum(['BUY', 'SELL']).optional(),
  start_t: z.number().optional(),
  end_t: z.number().optional(),
  size: z.number().optional(),
  page: z.number().optional(),
});

/**
 * Create an order
 */
export async function createOrder(params: z.infer<typeof orderParamsSchema>) {
  // Validate environment configuration
  validateConfig();

  // Validate input parameters
  const validatedParams = orderParamsSchema.parse(params);

  console.log(`📋 Creating order:`, validatedParams);

  try {
    const result = await signAndSendRequest(
      'POST',
      '/v1/order',
      validatedParams
    );
    
    console.log(`✅ Order created successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create order:`, error);
    throw error;
  }
}

/**
 * Cancel an order by ID
 */
export async function cancelOrder(orderId: string) {
  // Validate environment configuration
  validateConfig();

  if (!orderId) {
    throw new Error('Order ID is required');
  }

  console.log(`🚫 Cancelling order: ${orderId}`);

  try {
    const result = await signAndSendRequest(
      'DELETE',
      `/v1/order/${orderId}`
    );
    
    console.log(`✅ Order cancelled successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to cancel order:`, error);
    throw error;
  }
}

/**
 * Cancel all pending orders for a symbol
 */
export async function cancelAllOrders(symbol?: string) {
  // Validate environment configuration
  validateConfig();

  const endpoint = symbol 
    ? `/v1/orders?symbol=${encodeURIComponent(symbol)}`
    : '/v1/orders';

  console.log(`🚫 Cancelling all orders${symbol ? ` for ${symbol}` : ''}`);

  try {
    const result = await signAndSendRequest(
      'DELETE',
      endpoint
    );
    
    console.log(`✅ Orders cancelled successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to cancel orders:`, error);
    throw error;
  }
}

/**
 * Get orders with optional filtering
 */
export async function getOrders(params?: z.infer<typeof orderQuerySchema>) {
  // Validate environment configuration
  validateConfig();

  // Validate and prepare query parameters
  const validatedParams = params ? orderQuerySchema.parse(params) : {};
  
  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(validatedParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = queryParams.toString() 
    ? `/v1/orders?${queryParams.toString()}`
    : '/v1/orders';

  console.log(`📋 Getting orders with params:`, validatedParams);

  try {
    const result = await signAndSendRequest(
      'GET',
      endpoint
    );
    
    console.log(`✅ Orders retrieved successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to get orders:`, error);
    throw error;
  }
}

/**
 * Get order by ID
 */
export async function getOrder(orderId: string) {
  // Validate environment configuration
  validateConfig();

  if (!orderId) {
    throw new Error('Order ID is required');
  }

  console.log(`📋 Getting order: ${orderId}`);

  try {
    const result = await signAndSendRequest(
      'GET',
      `/v1/order/${orderId}`
    );
    
    console.log(`✅ Order retrieved successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to get order:`, error);
    throw error;
  }
}

/**
 * Create multiple orders in batch
 */
export async function batchCreateOrders(params: z.infer<typeof batchOrderSchema>) {
  // Validate environment configuration
  validateConfig();

  // Validate input parameters
  const validatedParams = batchOrderSchema.parse(params);

  console.log(`📋 Creating batch orders:`, validatedParams);

  try {
    const result = await signAndSendRequest(
      'POST',
      '/v1/batch-order',
      validatedParams
    );
    
    console.log(`✅ Batch orders created successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create batch orders:`, error);
    throw error;
  }
} 