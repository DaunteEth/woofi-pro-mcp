import { signAsync, getPublicKeyAsync } from '@noble/ed25519';
// Environment variables - default to mainnet to match MCP configuration
const BASE_URL = process.env.WOOFI_BASE_ENDPOINT || "https://api.orderly.org";
const SECRET_KEY = process.env.WOOFI_SECRET_KEY; // This should be the base58 encoded private key
const ACCOUNT_ID = process.env.WOOFI_ACCOUNT_ID;
/**
 * Base58 alphabet used by Bitcoin and Orderly
 */
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
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
 * Encode Uint8Array to base58
 */
function encodeBase58(bytes) {
    if (bytes.length === 0)
        return '';
    // Convert to big integer
    let num = 0n;
    for (const byte of bytes) {
        num = num * 256n + BigInt(byte);
    }
    // Convert to base58
    let result = '';
    while (num > 0) {
        result = BASE58_ALPHABET[Number(num % 58n)] + result;
        num = num / 58n;
    }
    // Handle leading zeros
    for (const byte of bytes) {
        if (byte === 0)
            result = '1' + result;
        else
            break;
    }
    return result;
}
/**
 * Derive the public key from private key for use in orderly-key header
 */
async function derivePublicKey(privateKeyBase58) {
    const privateKeyBytes = decodeBase58(privateKeyBase58);
    const publicKeyBytes = await getPublicKeyAsync(privateKeyBytes);
    return encodeBase58(publicKeyBytes);
}
/**
 * Create normalized request content for signing per Orderly spec:
 * timestamp + HTTP_METHOD + path + query + body (if any)
 * Following the exact pattern from official documentation
 */
function createSignatureContent(timestamp, method, url, body) {
    let message = `${timestamp}${method.toUpperCase()}${url.pathname}${url.search}`;
    if (body && method !== 'GET' && method !== 'DELETE') {
        message += JSON.stringify(body);
    }
    return message;
}
/**
 * Sign request using ed25519 and return base64url encoded signature
 * Following the exact pattern from official Orderly documentation
 */
async function signRequest(content, privateKeyBase58) {
    // Decode the base58 private key
    const privateKeyBytes = decodeBase58(privateKeyBase58);
    // Convert content to bytes
    const contentBytes = new TextEncoder().encode(content);
    // Sign with ed25519
    const signature = await signAsync(contentBytes, privateKeyBytes);
    // Return base64url encoded signature (matches official example: Buffer.from(signature).toString('base64url'))
    return Buffer.from(signature).toString('base64url');
}
/**
 * Create authentication headers per Orderly specification
 * Following the exact pattern from official Orderly documentation
 */
async function createAuthHeaders(method, fullUrl, body) {
    if (!SECRET_KEY || !ACCOUNT_ID) {
        throw new Error('Missing required environment variables: WOOFI_SECRET_KEY, WOOFI_ACCOUNT_ID');
    }
    const timestamp = Date.now();
    const url = new URL(fullUrl);
    // Create content to sign
    const content = createSignatureContent(timestamp, method, url, body);
    // Sign the content
    const signature = await signRequest(content, SECRET_KEY);
    // Derive the public key from the private key (as per Orderly docs)
    const publicKeyBase58 = await derivePublicKey(SECRET_KEY);
    // Content-Type per Orderly spec
    const contentType = (method === 'GET' || method === 'DELETE')
        ? 'application/x-www-form-urlencoded'
        : 'application/json';
    return {
        'Content-Type': contentType,
        'orderly-account-id': ACCOUNT_ID,
        'orderly-key': `ed25519:${publicKeyBase58}`, // MUST include ed25519: prefix per official docs
        'orderly-signature': signature,
        'orderly-timestamp': timestamp.toString()
    };
}
/**
 * Make authenticated request to Orderly API
 * Following the exact pattern from official Orderly documentation
 */
export async function signAndSendRequest(method, endpoint, data) {
    const url = `${BASE_URL}${endpoint}`;
    // Create authentication headers using full URL (matches official example)
    // AUTH_VERSION: 1.0.1 - FIXED ed25519: prefix and signature encoding
    const headers = await createAuthHeaders(method, url, data);
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
    if (!SECRET_KEY || !ACCOUNT_ID) {
        throw new Error('Missing required environment variables. Please check:\n' +
            '- WOOFI_SECRET_KEY (your base58 encoded private key)\n' +
            '- WOOFI_ACCOUNT_ID (your Orderly account ID)');
    }
    console.log(`🔧 Auth config validated:`);
    console.log(`📍 Base URL: ${BASE_URL}`);
    console.log(`🔑 Account ID: ${ACCOUNT_ID}`);
    console.log(`🔐 Private Key: ${SECRET_KEY ? '[SET]' : 'NOT SET'}`);
}
/**
 * Create EIP-712 domain for Orderly Network settlement
 */
function createEIP712Domain(chainId = 421614) {
    return {
        name: "Orderly",
        version: "1",
        chainId: chainId,
        verifyingContract: "0x6F7a338F2aA472838dEFD3283eB360d4Dff5D203"
    };
}
/**
 * Create EIP-712 types for settlement
 */
function createSettlePnLTypes() {
    return {
        Settlement: [
            { name: "brokerId", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "chainType", type: "string" },
            { name: "settleNonce", type: "uint64" },
            { name: "timestamp", type: "uint64" }
        ]
    };
}
/**
 * Create EIP-712 types for liquidation claim
 */
function createLiquidationTypes() {
    return {
        ClaimLiquidation: [
            { name: "brokerId", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "chainType", type: "string" },
            { name: "liquidationId", type: "uint64" },
            { name: "liquidatorId", type: "string" },
            { name: "symbol", type: "string" },
            { name: "positionQty", type: "string" },
            { name: "costPosition", type: "string" },
            { name: "liquidatorFee", type: "string" },
            { name: "insuranceFundFee", type: "string" },
            { name: "markPrice", type: "string" },
            { name: "sumUnitaryFundings", type: "string" },
            { name: "liquidatedTime", type: "uint64" },
            { name: "timestamp", type: "uint64" }
        ]
    };
}
/**
 * Create EIP-712 types for insurance fund claim
 */
function createInsuranceFundTypes() {
    return {
        ClaimInsuranceFund: [
            { name: "brokerId", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "chainType", type: "string" },
            { name: "liquidationId", type: "uint64" },
            { name: "transferAmountToInsuranceFund", type: "string" },
            { name: "timestamp", type: "uint64" }
        ]
    };
}
/**
 * Export EIP-712 helper functions for use in endpoints
 */
export { createEIP712Domain, createSettlePnLTypes, createLiquidationTypes, createInsuranceFundTypes };
