/**
 * Setup utility for Orderly Network authentication
 * This file provides guidance and utilities for initial account setup
 */
export declare function getSetupInstructions(): string;
/**
 * Check if basic configuration is present (updated for new 3-variable approach)
 */
export declare function hasBasicConfig(): boolean;
/**
 * Get configuration status for new simplified approach
 */
export declare function getConfigStatus(): {
    hasApiKey: boolean;
    hasSecretKey: boolean;
    hasAccountId: boolean;
    isComplete: boolean;
};
