/**
 * Setup utility for Orderly Network authentication
 * This file provides guidance and utilities for initial account setup
 */
export declare function getSetupInstructions(): string;
/**
 * Check if basic configuration is present (uses same logic as auth.ts)
 */
export declare function hasBasicConfig(): boolean;
/**
 * Get configuration status aligned with auth.ts requirements
 */
export declare function getConfigStatus(): {
    hasApiKey: boolean;
    hasSecretKey: boolean;
    hasAccountId: boolean;
    hasEndpoint: boolean;
    isComplete: boolean;
};
