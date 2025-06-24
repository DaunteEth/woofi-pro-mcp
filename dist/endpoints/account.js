import fetch from "node-fetch";
import { createAuthHeaders, getBaseUrl } from "../utils/auth.js";
export async function getAccountInfo() {
    const path = "/v1/account";
    const headers = await createAuthHeaders("GET", path);
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${path}`, {
        method: "GET",
        headers
    });
    return response.json();
}
export async function getPositions(symbol) {
    const path = "/v1/positions";
    const baseUrl = getBaseUrl();
    const url = new URL(`${baseUrl}${path}`);
    if (symbol)
        url.searchParams.set("symbol", symbol);
    const headers = await createAuthHeaders("GET", path);
    const response = await fetch(url.toString(), {
        method: "GET",
        headers
    });
    return response.json();
}
