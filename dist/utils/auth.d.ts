/**
 * Create authentication headers for Orderly Network API
 */
export declare function createAuthHeaders(method: string, requestPath: string, body?: string): Promise<{
    "Content-Type": string;
    "orderly-timestamp": string;
    "orderly-account-id": string;
    "orderly-key": string;
    "orderly-signature": string;
}>;
/**
 * Get base URL for API requests
 */
export declare function getBaseUrl(): string;
/**
 * Validate required environment variables
 */
export declare function validateConfig(): {
    isValid: boolean;
    missingVars: string[];
};
