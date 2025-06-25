/**
 * Get registration nonce (PUBLIC endpoint - no auth required)
 */
export declare function getRegistrationNonce(): Promise<any>;
/**
 * Register account (PUBLIC endpoint - requires wallet signature, not API key signature)
 */
export declare function registerAccount(params: {
    registration_nonce: string;
    wallet_address: string;
    signature: string;
    user_address?: string;
    broker_id?: string;
}): Promise<any>;
/**
 * Get Orderly key info (PUBLIC endpoint - no auth required)
 */
export declare function getOrderlyKey(params: {
    account_id: string;
    orderly_key: string;
}): Promise<any>;
/**
 * Add Orderly key (PUBLIC endpoint - requires wallet signature, not API key signature)
 */
export declare function addOrderlyKey(params: {
    account_id: string;
    orderly_key: string;
    signature: string;
    expiration?: number;
    scope?: string;
    tag?: string;
}): Promise<any>;
/**
 * Get current Orderly key info (PRIVATE endpoint - requires authentication)
 */
export declare function getCurrentOrderlyKeyInfo(params?: {
    key_status?: string;
}): Promise<any>;
/**
 * Remove Orderly key (PRIVATE endpoint - requires authentication)
 */
export declare function removeOrderlyKey(params: {
    orderly_key: string;
}): Promise<any>;
