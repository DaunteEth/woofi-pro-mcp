import fetch from "node-fetch";
import { createAuthHeaders, getBaseUrl } from "../utils/auth.js";

export async function getAssetHistory() {
  const path = "/v1/asset/history";
  const headers = await createAuthHeaders("GET", path);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function getHoldings() {
  const path = "/v1/asset/holding";
  const headers = await createAuthHeaders("GET", path);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function createWithdrawRequest(body: any) {
  const path = "/v1/withdraw_request";
  const requestBody = JSON.stringify(body);
  const headers = await createAuthHeaders("POST", path, requestBody);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body: requestBody
  });
  
  return response.json();
}

export async function settlePnl() {
  const path = "/v1/pnl_settlement";
  const headers = await createAuthHeaders("POST", path);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers
  });
  
  return response.json();
} 