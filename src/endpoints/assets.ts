import fetch from "node-fetch";
import { createHmac } from "crypto";

const BASE_URL = process.env.WOOFI_BASE_ENDPOINT || "https://api.orderly.org";
const API_KEY = process.env.WOOFI_API_KEY;
const SECRET_KEY = process.env.WOOFI_SECRET_KEY;
const ACCOUNT_ID = process.env.WOOFI_ACCOUNT_ID;

function createSignature(timestamp: string, method: string, requestPath: string, body?: string): string {
  const message = timestamp + method + requestPath + (body || "");
  return createHmac("sha256", SECRET_KEY!).update(message).digest("hex");
}

function createAuthHeaders(method: string, requestPath: string, body?: string) {
  const timestamp = Date.now().toString();
  const signature = createSignature(timestamp, method, requestPath, body);
  
  return {
    "orderly-timestamp": timestamp,
    "orderly-account-id": ACCOUNT_ID!,
    "orderly-key": API_KEY!,
    "orderly-signature": signature,
    "Content-Type": "application/json"
  };
}

export async function getAssetHistory() {
  const path = "/v1/asset/history";
  const headers = createAuthHeaders("GET", path);
  
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function getHoldings() {
  const path = "/v1/asset/holding";
  const headers = createAuthHeaders("GET", path);
  
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function createWithdrawRequest(body: any) {
  const path = "/v1/withdraw_request";
  const requestBody = JSON.stringify(body);
  const headers = createAuthHeaders("POST", path, requestBody);
  
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: requestBody
  });
  
  return response.json();
}

export async function settlePnl() {
  const path = "/v1/pnl_settlement";
  const headers = createAuthHeaders("POST", path);
  
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers
  });
  
  return response.json();
} 