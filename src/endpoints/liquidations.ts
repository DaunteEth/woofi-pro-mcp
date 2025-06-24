import fetch from "node-fetch";
import { createAuthHeaders, getBaseUrl } from "../utils/auth.js";

export async function getLiquidations() {
  const path = "/v1/liquidation";
  const headers = await createAuthHeaders("GET", path);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function claimLiquidation(params: any) {
  const path = "/v1/liquidation";
  const body = JSON.stringify(params);
  const headers = await createAuthHeaders("POST", path, body);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body
  });
  
  return response.json();
}

export async function getLiquidationHistory(symbol?: string) {
  const path = "/v1/liquidation/history";
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${path}`);
  if (symbol) url.searchParams.set("symbol", symbol);
  
  const headers = await createAuthHeaders("GET", path);
  
  const response = await fetch(url.toString(), {
    method: "GET",
    headers
  });
  
  return response.json();
} 