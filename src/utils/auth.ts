import { sign } from '@noble/ed25519';
import bs58 from 'bs58';

// Environment variables
const BASE_URL = process.env.WOOFI_BASE_ENDPOINT || "https://testnet-api.orderly.org";
const API_KEY = process.env.WOOFI_API_KEY;
const SECRET_KEY = process.env.WOOFI_SECRET_KEY;
const ACCOUNT_ID = process.env.WOOFI_ACCOUNT_ID;

/**
 * Convert Uint8Array to base64 URL-safe string
 */
function toBase64UrlSafe(bytes: Uint8Array): string {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Create ed25519 signature for Orderly Network API
 * According to official docs: timestamp + method + path + body
 */
async function createSignature(timestamp: string, method: string, requestPath: string, body?: string): Promise<string> {
  if (!SECRET_KEY) {
    throw new Error("WOOFI_SECRET_KEY is required");
  }

  // Construct message according to official docs: timestamp + method + path + body
  const message = timestamp + method + requestPath + (body || "");
  
  // Decode base58 secret key
  const privateKeyBytes = bs58.decode(SECRET_KEY);
  
  // Create signature using ed25519
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = await sign(messageBytes, privateKeyBytes);
  
  // Convert to base64 URL-safe
  return toBase64UrlSafe(signatureBytes);
}

/**
 * Create authentication headers for Orderly Network API
 */
export async function createAuthHeaders(method: string, requestPath: string, body?: string) {
  if (!API_KEY || !ACCOUNT_ID) {
    throw new Error("WOOFI_API_KEY and WOOFI_ACCOUNT_ID are required");
  }

  const timestamp = Date.now().toString();
  const signature = await createSignature(timestamp, method, requestPath, body);
  
  return {
    "Content-Type": method === "GET" || method === "DELETE" ? "application/x-www-form-urlencoded" : "application/json",
    "orderly-timestamp": timestamp,
    "orderly-account-id": ACCOUNT_ID,
    "orderly-key": API_KEY,
    "orderly-signature": signature
  };
}

/**
 * Get base URL for API requests
 */
export function getBaseUrl(): string {
  return BASE_URL;
}

/**
 * Validate required environment variables
 */
export function validateConfig(): { isValid: boolean; missingVars: string[] } {
  const required = ['WOOFI_API_KEY', 'WOOFI_SECRET_KEY', 'WOOFI_ACCOUNT_ID'];
  const missing: string[] = [];
  
  for (const varName of required) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  return {
    isValid: missing.length === 0,
    missingVars: missing
  };
} 