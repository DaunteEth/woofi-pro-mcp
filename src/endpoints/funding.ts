import fetch from "node-fetch";
import { createAuthHeaders, getBaseUrl } from "../utils/auth.js";

export async function getFundingRates(symbol?: string) {
  const path = "/v1/funding_rates";
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

export async function getFundingRateHistory(symbol: string) {
  const path = "/v1/funding_rate_history";
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set("symbol", symbol);
  
  const headers = await createAuthHeaders("GET", path);
  
  const response = await fetch(url.toString(), {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function getEstimatedFundingRate(symbol: string) {
  const path = "/v1/estimated_funding_rate";
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set("symbol", symbol);
  
  const headers = await createAuthHeaders("GET", path);
  
  const response = await fetch(url.toString(), {
    method: "GET",
    headers
  });
  
  return response.json();
} 