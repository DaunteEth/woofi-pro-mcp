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
export async function getFundingRates(symbol) {
    const path = "/v1/funding_rates";
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
export async function getFundingRateHistory(symbol) {
    const path = "/v1/funding_rate_history";
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set("symbol", symbol);
    const headers = createAuthHeaders("GET", path);
    const response = await fetch(url.toString(), {
        method: "GET",
        headers
    });
    return response.json();
}
export async function getEstimatedFundingRate(symbol) {
    const path = "/v1/estimated_funding_rate";
    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set("symbol", symbol);
    const headers = createAuthHeaders("GET", path);
    const response = await fetch(url.toString(), {
        method: "GET",
        headers
    });
    return response.json();
}
