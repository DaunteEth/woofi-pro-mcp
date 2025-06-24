import fetch from "node-fetch";
import { createHmac } from "crypto";
const BASE_URL = process.env.WOOFI_BASE_ENDPOINT || "https://api.orderly.org";
const API_KEY = process.env.WOOFI_API_KEY;
const SECRET_KEY = process.env.WOOFI_SECRET_KEY;
const ACCOUNT_ID = process.env.WOOFI_ACCOUNT_ID;
function createSignature(timestamp, method, requestPath, body) {
    const message = timestamp + method + requestPath + (body || "");
    return createHmac("sha256", SECRET_KEY).update(message).digest("hex");
}
function createAuthHeaders(method, requestPath, body) {
    const timestamp = Date.now().toString();
    const signature = createSignature(timestamp, method, requestPath, body);
    return {
        "orderly-timestamp": timestamp,
        "orderly-account-id": ACCOUNT_ID,
        "orderly-key": API_KEY,
        "orderly-signature": signature,
        "Content-Type": "application/json"
    };
}
export async function getLiquidations() {
    const path = "/v1/liquidation";
    const headers = createAuthHeaders("GET", path);
    const response = await fetch(`${BASE_URL}${path}`, {
        method: "GET",
        headers
    });
    return response.json();
}
export async function claimLiquidation(params) {
    const path = "/v1/liquidation";
    const body = JSON.stringify(params);
    const headers = createAuthHeaders("POST", path, body);
    const response = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers,
        body
    });
    return response.json();
}
export async function getLiquidationHistory(symbol) {
    const path = "/v1/liquidation/history";
    const url = new URL(`${BASE_URL}${path}`);
    if (symbol)
        url.searchParams.set("symbol", symbol);
    const headers = createAuthHeaders("GET", path);
    const response = await fetch(url.toString(), {
        method: "GET",
        headers
    });
    return response.json();
}
