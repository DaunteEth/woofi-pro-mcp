import { signAndSendRequest, validateConfig } from '../utils/auth.js';

/**
 * Get account information (using key info endpoint)
 */
export async function getAccountInfo() {
  validateConfig();
  
  console.log('📋 Getting account info...');
  
  try {
    const result = await signAndSendRequest('GET', '/v1/client/key_info');
    console.log('✅ Account info retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get account info:', error);
    throw error;
  }
}

/**
 * Get account positions
 */
export async function getAccountPositions() {
  validateConfig();
  
  console.log('📋 Getting account positions...');
  
  try {
    const result = await signAndSendRequest('GET', '/v1/positions');
    console.log('✅ Positions retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get positions:', error);
    throw error;
  }
}

/**
 * Get open orders
 */
export async function getOpenOrders() {
  validateConfig();
  
  console.log('📋 Getting open orders...');
  
  try {
    const result = await signAndSendRequest('GET', '/v1/orders?status=open');
    console.log('✅ Open orders retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get open orders:', error);
    throw error;
  }
} 