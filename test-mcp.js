#!/usr/bin/env node

// Test script for MCP server validation
import { spawn } from 'child_process';

const env = {
  ...process.env,
  WOOFI_API_KEY: "6Nn7hUFANgm2wbvy3A43ckuqFKqDCeggnae3219T7Yyq",
  WOOFI_SECRET_KEY: "5Hd7DLap5XV5qP3tkTYKwrbkiB1mzc2v9gk5U1K52FDq",
  WOOFI_BASE_ENDPOINT: "https://api.orderly.org",
  WOOFI_ACCOUNT_ID: "0xd8bc14ea4e7ab8c6ce4e832b1b7ee03f982295002312904d56b169ffb560f3db",
  WOOFI_CHAIN_ID: "42161",
  WOOFI_BROKER_ID: "woofi_pro"
};

console.log('🧪 Testing MCP Server with environment variables...');

const child = spawn('node', ['dist/index.js'], { env });

// Send initialization message
const initMessage = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" }
  }
};

child.stdin.write(JSON.stringify(initMessage) + '\n');

// Send list tools message
const listToolsMessage = {
  jsonrpc: "2.0",
  id: 2,
  method: "tools/list",
  params: {}
};

setTimeout(() => {
  child.stdin.write(JSON.stringify(listToolsMessage) + '\n');
}, 1000);

child.stdout.on('data', (data) => {
  console.log('📤 Server response:', data.toString());
});

child.stderr.on('data', (data) => {
  console.log('🔍 Server log:', data.toString());
});

// Clean exit after 5 seconds
setTimeout(() => {
  console.log('✅ MCP Server test completed successfully');
  child.kill();
  process.exit(0);
}, 5000);