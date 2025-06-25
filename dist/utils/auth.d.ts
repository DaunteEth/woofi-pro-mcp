/**
 * Make authenticated request to Orderly API
 */
export declare function signAndSendRequest<T = any>(method: string, endpoint: string, data?: any): Promise<T>;
/**
 * Get base URL for API requests
 */
export declare function getBaseUrl(): string;
/**
 * Validate that all required configuration is present
 */
export declare function validateConfig(): void;
