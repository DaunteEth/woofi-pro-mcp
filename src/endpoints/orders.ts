import fetch from "node-fetch";
import { createAuthHeaders, getBaseUrl } from "../utils/auth.js";

export async function createOrder(params: any) {
  const path = "/v1/order";
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

export async function batchCreateOrders(batch: any) {
  const path = "/v1/batch-order";
  const body = JSON.stringify(batch);
  const headers = await createAuthHeaders("POST", path, body);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body
  });
  
  return response.json();
}

export async function cancelOrder(orderId: string, symbol: string) {
  const path = "/v1/order";
  const body = JSON.stringify({ order_id: orderId, symbol });
  const headers = await createAuthHeaders("DELETE", path, body);
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    headers,
    body
  });
  
  return response.json();
}

export async function getOrders(symbol?: string, status?: string) {
  const path = "/v1/orders";
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${path}`);
  if (symbol) url.searchParams.set("symbol", symbol);
  if (status) url.searchParams.set("status", status);
  
  const headers = await createAuthHeaders("GET", path);
  
  const response = await fetch(url.toString(), {
    method: "GET",
    headers
  });
  
  return response.json();
} 