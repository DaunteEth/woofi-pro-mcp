import { z } from 'zod';
import { signAndSendRequest, validateConfig } from '../utils/auth.js';

// Zod schemas for input validation
const withdrawRequestSchema = z.object({
  token: z.string(),
  amount: z.string(),
  address: z.string(),
  extra_memo: z.string().optional(),
  network_type: z.string().optional(),
});

const settlePnlRequestSchema = z.object({
  signature: z.string(),
  userAddress: z.string(),
  verifyingContract: z.string(),
  message: z.object({
    brokerId: z.string(),
    chainId: z.number(),
    chainType: z.string(),
    settleNonce: z.number(),
    timestamp: z.number(),
  }),
});

const internalTransferSchema = z.object({
  token: z.string(),
  amount: z.string(),
  fromAccountId: z.string(),
  toAccountId: z.string(),
});

const holdingsQuerySchema = z.object({
  all: z.boolean().optional(),
});

const historyQuerySchema = z.object({
  symbol: z.string().optional(),
  start_t: z.string().optional(),
  end_t: z.string().optional(),
  page: z.string().optional(),
  size: z.string().optional(),
});

/**
 * Get asset transaction history
 */
export async function getAssetHistory() {
  validateConfig();
  
  console.log('📋 Getting asset history...');
  
  try {
    const result = await signAndSendRequest('GET', '/v1/asset/history');
    console.log('✅ Asset history retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get asset history:', error);
    throw error;
  }
}

/**
 * Get current holdings (properly implemented as per API docs)
 */
export async function getHoldings(params?: z.infer<typeof holdingsQuerySchema>) {
  validateConfig();
  
  // Validate query parameters
  const validatedParams = params ? holdingsQuerySchema.parse(params) : {};
  
  // Build query string
  const queryParams = new URLSearchParams();
  if (validatedParams.all !== undefined) {
    queryParams.append('all', validatedParams.all.toString());
  }

  const endpoint = queryParams.toString() 
    ? `/v1/client/holding?${queryParams.toString()}`
    : '/v1/client/holding';
  
  console.log('📋 Getting current holdings...');
  
  try {
    const result = await signAndSendRequest('GET', endpoint);
    console.log('✅ Current holdings retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get current holdings:', error);
    throw error;
  }
}

/**
 * Create a withdrawal request  
 */
export async function createWithdrawRequest(params: z.infer<typeof withdrawRequestSchema>) {
  validateConfig();
  
  // Validate input parameters
  const validatedParams = withdrawRequestSchema.parse(params);
  
  console.log('📋 Creating withdrawal request:', validatedParams);
  
  try {
    const result = await signAndSendRequest('POST', '/v1/withdraw_request', validatedParams);
    console.log('✅ Withdrawal request created successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to create withdrawal request:', error);
    throw error;
  }
}

/**
 * Get settle PnL nonce
 */
export async function getSettlePnlNonce() {
  validateConfig();
  
  console.log('📋 Getting settle PnL nonce...');
  
  try {
    const result = await signAndSendRequest('GET', '/v1/settle_nonce');
    console.log('✅ Settle PnL nonce retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get settle PnL nonce:', error);
    throw error;
  }
}

/**
 * Request PnL settlement (properly implemented with EIP-712 signature)
 */
export async function requestPnlSettlement(params: z.infer<typeof settlePnlRequestSchema>) {
  validateConfig();
  
  // Validate input parameters
  const validatedParams = settlePnlRequestSchema.parse(params);
  
  console.log('📋 Requesting PnL settlement:', validatedParams);
  
  try {
    const result = await signAndSendRequest('POST', '/v1/settle_pnl', validatedParams);
    console.log('✅ PnL settlement requested successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to request PnL settlement:', error);
    throw error;
  }
}

/**
 * Get PnL settlement history
 */
export async function getPnlSettlementHistory(params?: z.infer<typeof historyQuerySchema>) {
  validateConfig();
  
  // Validate and prepare query parameters
  const validatedParams = params ? historyQuerySchema.parse(params) : {};
  
  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(validatedParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = queryParams.toString() 
    ? `/v1/pnl_settlement/history?${queryParams.toString()}`
    : '/v1/pnl_settlement/history';
  
  console.log('📋 Getting PnL settlement history...');
  
  try {
    const result = await signAndSendRequest('GET', endpoint);
    console.log('✅ PnL settlement history retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get PnL settlement history:', error);
    throw error;
  }
}

/**
 * Create internal transfer
 */
export async function createInternalTransfer(params: z.infer<typeof internalTransferSchema>) {
  validateConfig();
  
  // Validate input parameters
  const validatedParams = internalTransferSchema.parse(params);
  
  console.log('📋 Creating internal transfer:', validatedParams);
  
  try {
    const result = await signAndSendRequest('POST', '/v1/internal_transfer', validatedParams);
    console.log('✅ Internal transfer created successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to create internal transfer:', error);
    throw error;
  }
}

/**
 * Get internal transfer history
 */
export async function getInternalTransferHistory(params?: z.infer<typeof historyQuerySchema>) {
  validateConfig();
  
  // Validate and prepare query parameters
  const validatedParams = params ? historyQuerySchema.parse(params) : {};
  
  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(validatedParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const endpoint = queryParams.toString() 
    ? `/v1/internal_transfer/history?${queryParams.toString()}`
    : '/v1/internal_transfer/history';
  
  console.log('📋 Getting internal transfer history...');
  
  try {
    const result = await signAndSendRequest('GET', endpoint);
    console.log('✅ Internal transfer history retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get internal transfer history:', error);
    throw error;
  }
} 