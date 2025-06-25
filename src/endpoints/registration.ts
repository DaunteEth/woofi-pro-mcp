import { signAndSendRequest, validateConfig, getBaseUrl } from '../utils/auth.js';

/**
 * Get registration nonce (PUBLIC endpoint - no auth required)
 */
export async function getRegistrationNonce() {
  console.log('🔐 Getting registration nonce...');
  
  try {
    // This is a PUBLIC endpoint, so we use a simple fetch but with consistent base URL
    const response = await fetch(`${getBaseUrl()}/v1/registration_nonce`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Registration nonce retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get registration nonce:', error);
    throw error;
  }
}

/**
 * Register account (PUBLIC endpoint - requires wallet signature, not API key signature)
 */
export async function registerAccount(params: {
  registration_nonce: string;
  wallet_address: string;
  signature: string;
  user_address?: string;
  broker_id?: string;
}) {
  console.log('🔐 Registering account...');
  
  try {
    // This is a PUBLIC endpoint, so we use a simple fetch but with consistent base URL
    const response = await fetch(`${getBaseUrl()}/v1/register_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Account registered successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to register account:', error);
    throw error;
  }
}

/**
 * Get Orderly key info (PUBLIC endpoint - no auth required)
 */
export async function getOrderlyKey(params: {
  account_id: string;
  orderly_key: string;
}) {
  console.log('🔐 Getting Orderly key info...');
  
  try {
    // This is a PUBLIC endpoint, so we use a simple fetch but with consistent base URL
    const queryParams = new URLSearchParams({
      account_id: params.account_id,
      orderly_key: params.orderly_key,
    });
    
    const response = await fetch(`${getBaseUrl()}/v1/get_orderly_key?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Orderly key info retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get Orderly key info:', error);
    throw error;
  }
}

/**
 * Add Orderly key (PUBLIC endpoint - requires wallet signature, not API key signature)
 */
export async function addOrderlyKey(params: {
  account_id: string;
  orderly_key: string;
  signature: string;
  expiration?: number;
  scope?: string;
  tag?: string;
}) {
  console.log('🔐 Adding Orderly key...');
  
  try {
    // This is a PUBLIC endpoint, so we use a simple fetch but with consistent base URL
    const response = await fetch(`${getBaseUrl()}/v1/orderly_key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Orderly key added successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to add Orderly key:', error);
    throw error;
  }
}

/**
 * Get current Orderly key info (PRIVATE endpoint - requires authentication)
 */
export async function getCurrentOrderlyKeyInfo(params?: {
  key_status?: string;
}) {
  validateConfig();
  
  console.log('🔐 Getting current Orderly key info...');
  
  try {
    let path = '/v1/client/key_info';
    if (params?.key_status) {
      path += `?key_status=${params.key_status}`;
    }
    
    const result = await signAndSendRequest('GET', path);
    console.log('✅ Current Orderly key info retrieved successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to get current Orderly key info:', error);
    throw error;
  }
}

/**
 * Remove Orderly key (PRIVATE endpoint - requires authentication)
 */
export async function removeOrderlyKey(params: {
  orderly_key: string;
}) {
  validateConfig();
  
  console.log('🔐 Removing Orderly key...');
  
  try {
    const result = await signAndSendRequest('DELETE', '/v1/orderly_key', {
      orderly_key: params.orderly_key,
    });
    console.log('✅ Orderly key removed successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to remove Orderly key:', error);
    throw error;
  }
} 