import { z } from 'zod';
import { signAndSendRequest, getBaseUrl, validateConfig } from '../utils/auth.js';

// Zod schema for position history query parameters
const positionHistoryQuerySchema = z.object({
  symbol: z.string().optional(),
  limit: z.number().optional(),
});

/**
 * Get all positions
 */
export async function getAllPositions() {
  validateConfig();
  
  console.log('📋 Getting all positions...');
  
  try {
    const result = await signAndSendRequest('GET', '/v1/positions');
    console.log('✅ All positions retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get positions:', error);
    throw error;
  }
}

/**
 * Get position for a specific symbol
 */
export async function getPositionBySymbol(symbol: string) {
  validateConfig();
  
  if (!symbol) {
    throw new Error('Symbol is required');
  }
  
  console.log(`📋 Getting position for symbol: ${symbol}`);
  
  try {
    const result = await signAndSendRequest('GET', `/v1/position/${encodeURIComponent(symbol)}`);
    console.log('✅ Position retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get position:', error);
    throw error;
  }
}

/**
 * Get position history
 */
export async function getPositionHistory(params?: z.infer<typeof positionHistoryQuerySchema>) {
  validateConfig();
  
  // Validate and prepare query parameters
  const validatedParams = params ? positionHistoryQuerySchema.parse(params) : {};
  
  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(validatedParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = queryParams.toString() 
    ? `/v1/position_history?${queryParams.toString()}`
    : '/v1/position_history';
  
  console.log(`📋 Getting position history with params:`, validatedParams);
  
  try {
    const result = await signAndSendRequest('GET', endpoint);
    console.log('✅ Position history retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get position history:', error);
    throw error;
  }
} 