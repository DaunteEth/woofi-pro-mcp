import fetch from "node-fetch";
import { createAuthHeaders, getBaseUrl } from "../utils/auth.js";

export async function placeWoofiOrder(input: any) {
  const path = "/evm-api/restful-api/private/create-order";
  const body = JSON.stringify(input);
  const headers = await createAuthHeaders("POST", path, body);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body
  });
  
  return response.json();
}

export async function getWoofiPortfolio() {
  const path = "/evm-api/restful-api/private/portfolio";
  const headers = await createAuthHeaders("GET", path);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers
  });
  
  return response.json();
}

export async function getWoofiTokens() {
  const path = "/evm-api/restful-api/public/tokens";
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  
  return response.json();
}

export async function getWoofiQuote(tokenIn: string, tokenOut: string, amountIn: string) {
  const path = "/evm-api/restful-api/public/quote";
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set("tokenIn", tokenIn);
  url.searchParams.set("tokenOut", tokenOut);
  url.searchParams.set("amountIn", amountIn);
  
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  
  return response.json();
} 