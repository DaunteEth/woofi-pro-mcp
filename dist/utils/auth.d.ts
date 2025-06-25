/**
 * Make authenticated request to Orderly API
 * Following the exact pattern from official Orderly documentation
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
/**
 * Create EIP-712 domain for Orderly Network settlement
 */
declare function createEIP712Domain(chainId?: number): any;
/**
 * Create EIP-712 types for settlement
 */
declare function createSettlePnLTypes(): any;
/**
 * Create EIP-712 types for liquidation claim
 */
declare function createLiquidationTypes(): any;
/**
 * Create EIP-712 types for insurance fund claim
 */
declare function createInsuranceFundTypes(): any;
/**
 * Export EIP-712 helper functions for use in endpoints
 */
export { createEIP712Domain, createSettlePnLTypes, createLiquidationTypes, createInsuranceFundTypes };
