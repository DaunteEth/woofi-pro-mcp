import { signAsync } from '@noble/ed25519';
// Environment variables - default to mainnet to match MCP configuration
const BASE_URL = process.env.WOOFI_BASE_ENDPOINT || "https://api.orderly.org";
const API_KEY = process.env.WOOFI_API_KEY; // This should be the ed25519 public key WITH prefix
const SECRET_KEY = process.env.WOOFI_SECRET_KEY; // This should be the base58 encoded private key
const ACCOUNT_ID = process.env.WOOFI_ACCOUNT_ID;
/**
 * Base58 alphabet used by Bitcoin and Orderly
 */
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
/**
 * Base64url encode (URL-safe base64 without padding)
 */
function base64urlEncode(bytes) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let i = 0;
    while (i < bytes.length) {
        const a = bytes[i++];
        const b = i < bytes.length ? bytes[i++] : 0;
        const c = i < bytes.length ? bytes[i++] : 0;
        result += chars[a >> 2];
        result += chars[((a & 3) << 4) | (b >> 4)];
        if (i - 1 < bytes.length)
            result += chars[((b & 15) << 2) | (c >> 6)];
        if (i - 1 < bytes.length)
            result += chars[c & 63];
    }
    return result;
}
/**
 * Decode base58 to Uint8Array
 */
function decodeBase58(s) {
    let result = 0n;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const index = BASE58_ALPHABET.indexOf(char);
        if (index === -1)
            throw new Error(`Invalid base58 character: ${char}`);
        result = result * 58n + BigInt(index);
    }
    // Convert to byte array
    const bytes = [];
    let num = result;
    while (num > 0) {
        bytes.unshift(Number(num & 0xffn));
        num = num >> 8n;
    }
    // Handle leading zeros
    for (let i = 0; i < s.length && s[i] === '1'; i++) {
        bytes.unshift(0);
    }
    return new Uint8Array(bytes);
}
/**
 * Create normalized request content for signing per Orderly spec:
 * timestamp + HTTP_METHOD + path + body (if any)
 */
function createSignatureContent(timestamp, method, path, body) {
    let content = `${timestamp}${method.toUpperCase()}${path}`;
    if (body && method !== 'GET' && method !== 'DELETE') {
        content += JSON.stringify(body);
    }
    return content;
}
/**
 * Sign request using ed25519 and return base64url encoded signature
 */
async function signRequest(content, privateKeyBase58) {
    // Decode the base58 private key
    const privateKeyBytes = decodeBase58(privateKeyBase58);
    // Convert content to bytes
    const contentBytes = new TextEncoder().encode(content);
    // Sign with ed25519
    const signature = await signAsync(contentBytes, privateKeyBytes);
    // Return base64url encoded signature (URL-safe)
    return base64urlEncode(signature);
}
/**
 * Create authentication headers per Orderly specification
 */
async function createAuthHeaders(method, path, body) {
    if (!API_KEY || !SECRET_KEY || !ACCOUNT_ID) {
        throw new Error('Missing required environment variables: WOOFI_API_KEY, WOOFI_SECRET_KEY, WOOFI_ACCOUNT_ID');
    }
    const timestamp = Date.now();
    // Create content to sign
    const content = createSignatureContent(timestamp, method, path, body);
    // Sign the content
    const signature = await signRequest(content, SECRET_KEY);
    // Clean orderly key - remove ed25519: prefix if present
    const cleanOrderlyKey = API_KEY.startsWith('ed25519:')
        ? API_KEY.substring(8)
        : API_KEY;
    // Content-Type per Orderly spec
    const contentType = (method === 'GET' || method === 'DELETE')
        ? 'application/x-www-form-urlencoded'
        : 'application/json';
    return {
        'Content-Type': contentType,
        'orderly-account-id': ACCOUNT_ID,
        'orderly-key': cleanOrderlyKey, // WITHOUT ed25519: prefix
        'orderly-signature': signature,
        'orderly-timestamp': timestamp.toString()
    };
}
/**
 * Make authenticated request to Orderly API
 */
export async function signAndSendRequest(method, endpoint, data) {
    const url = `${BASE_URL}${endpoint}`;
    // Create authentication headers
    const headers = await createAuthHeaders(method, endpoint, data);
    // Prepare request options
    const options = {
        method,
        headers,
    };
    // Add body if not GET/DELETE
    if (data && method !== 'GET' && method !== 'DELETE') {
        options.body = JSON.stringify(data);
    }
    console.log(`🔐 Making authenticated ${method} request to: ${url}`);
    console.log('📋 Headers:', Object.keys(headers).map(k => `${k}: ${k.includes('signature') ? '[SIGNATURE]' : headers[k]}`));
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Request failed: ${response.status} ${response.statusText}`);
        console.error('📄 Error response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const result = await response.json();
    console.log(`✅ Request successful:`, result);
    return result;
}
/**
 * Get base URL for API requests
 */
export function getBaseUrl() {
    return BASE_URL;
}
/**
 * Validate that all required configuration is present
 */
export function validateConfig() {
    if (!API_KEY || !SECRET_KEY || !ACCOUNT_ID) {
        throw new Error('Missing required environment variables. Please check:\n' +
            '- WOOFI_API_KEY (your ed25519 public key)\n' +
            '- WOOFI_SECRET_KEY (your base58 encoded private key)\n' +
            '- WOOFI_ACCOUNT_ID (your Orderly account ID)');
    }
    console.log(`🔧 Auth config validated:`);
    console.log(`📍 Base URL: ${BASE_URL}`);
    console.log(`🔑 Account ID: ${ACCOUNT_ID}`);
    console.log(`🗝️  Public Key: ${API_KEY ? API_KEY.substring(0, 20) + '...' : 'NOT SET'}`);
    console.log(`🔐 Private Key: ${SECRET_KEY ? '[SET]' : 'NOT SET'}`);
}
