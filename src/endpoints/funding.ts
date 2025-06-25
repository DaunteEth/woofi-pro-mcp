import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';

// Zod schema for funding fee history query parameters
const fundingFeeHistoryQuerySchema = z.object({
  symbol: z.string().optional(),
  start_t: z.string().optional(),
  end_t: z.string().optional(), 
  page: z.string().optional(),
  size: z.string().optional(),
});

/**
 * Get funding fee history
 */
export async function getFundingFeeHistory(params?: z.infer<typeof fundingFeeHistoryQuerySchema>) {
  validateConfig();
  
  // Validate and prepare query parameters
  const validatedParams = params ? fundingFeeHistoryQuerySchema.parse(params) : {};
  
  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(validatedParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = queryParams.toString() 
    ? `/v1/funding_fee/history?${queryParams.toString()}`
    : '/v1/funding_fee/history';
  
  console.log(`📋 Getting funding fee history with params:`, validatedParams);
  
  try {
    const result = await signAndSendRequest('GET', endpoint);
    console.log('✅ Funding fee history retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get funding fee history:', error);
    throw error;
  }
} 