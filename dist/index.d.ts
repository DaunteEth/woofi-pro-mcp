#!/usr/bin/env node
import { z } from "zod";
export declare const configSchema: z.ZodObject<{
    WOOFI_API_KEY: z.ZodString;
    WOOFI_SECRET_KEY: z.ZodString;
    WOOFI_BASE_ENDPOINT: z.ZodString;
    WOOFI_ACCOUNT_ID: z.ZodOptional<z.ZodString>;
    WOOFI_CHAIN_ID: z.ZodOptional<z.ZodString>;
    WOOFI_BROKER_ID: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    WOOFI_BASE_ENDPOINT: string;
    WOOFI_SECRET_KEY: string;
    WOOFI_API_KEY: string;
    WOOFI_ACCOUNT_ID?: string | undefined;
    WOOFI_CHAIN_ID?: string | undefined;
    WOOFI_BROKER_ID?: string | undefined;
}, {
    WOOFI_BASE_ENDPOINT: string;
    WOOFI_SECRET_KEY: string;
    WOOFI_API_KEY: string;
    WOOFI_ACCOUNT_ID?: string | undefined;
    WOOFI_CHAIN_ID?: string | undefined;
    WOOFI_BROKER_ID?: string | undefined;
}>;
