#!/usr/bin/env node
import { z } from "zod";
export declare const configSchema: z.ZodObject<{
    WOOFI_API_KEY: z.ZodString;
    WOOFI_SECRET_KEY: z.ZodString;
    WOOFI_ACCOUNT_ID: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    WOOFI_SECRET_KEY: string;
    WOOFI_API_KEY: string;
    WOOFI_ACCOUNT_ID?: string | undefined;
}, {
    WOOFI_SECRET_KEY: string;
    WOOFI_API_KEY: string;
    WOOFI_ACCOUNT_ID?: string | undefined;
}>;
