# 🔧 MCP Configuration Guide for Cursor IDE

This guide provides **multiple proven methods** to configure the WOOFi Pro MCP server in Cursor IDE, based on successful forum discussions and video tutorials.

## 🎯 **FIXED CONFIGURATION** (Based on Working Python Pattern)

### ✅ **Root Cause Found**: Missing Executable Name

**The Issue**: Our original configuration was missing the executable name at the end of the args array.

**Working Python Pattern** (Reference):
```json
"osp_marketing_tools": {
  "command": "uvx",
  "args": [
    "--from",
    "git+https://github.com/open-strategy-partners/osp_marketing_tools@main",
    "osp_marketing_tools"  // ← Executable name at the end!
  ]
}
```

**Fixed Node.js Configuration**:
```json
"woofi-pro": {
  "command": "npx",
  "args": [
    "-y", 
    "git+https://github.com/DaunteEth/execution-agent.git",
    "woofi-pro"  // ← Added executable name!
  ],
  "env": { /* your environment variables */ }
}
```

## 🔧 Configuration Methods (Try in Order)

### Method 1: 🚀 Direct GitHub Installation (CORRECTED & RECOMMENDED)

**Source**: [Cursor MCP Forum](https://forum.cursor.com/t/how-to-use-mcp-server/50064)

**Advantages**: No local paths, automatic updates, clean setup

**Configuration** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y", 
        "git+https://github.com/DaunteEth/execution-agent.git",
        "woofi-pro"
      ],
      "env": {
        "WOOFI_API_KEY": "your_api_key_here",
        "WOOFI_SECRET_KEY": "your_secret_key_here",
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "your_account_id_here",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

### Method 2: 📁 Local Development Path

**Source**: [EggHead MCP Tutorial](https://egghead.io/easy-mcp-server-setup-in-cursor-ide-with-bundled-executables~zrhl5)

**Configuration** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/Users/daunteharris/Desktop/woo-product-development/ai-agents/mcps/woofi-pro-mcp",
      "env": {
        "WOOFI_API_KEY": "6Nn7hUFANgm2wbvy3A43ckuqFKqDCeggnae3219T7Yyq",
        "WOOFI_SECRET_KEY": "5Hd7DLap5XV5qP3tkTYKwrbkiB1mzc2v9gk5U1K52FDq",
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "0xd8bc14ea4e7ab8c6ce4e832b1b7ee03f982295002312904d56b169ffb560f3db",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

### Method 3: 🔧 TSX Development Mode

**For active development and debugging**

**Configuration** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "/Users/daunteharris/.nvm/versions/node/v24.1.0/bin/tsx",
      "args": ["src/index.ts"],
      "cwd": "/Users/daunteharris/Desktop/woo-product-development/ai-agents/mcps/woofi-pro-mcp",
      "env": {
        "PATH": "/Users/daunteharris/.nvm/versions/node/v24.1.0/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin",
        "WOOFI_API_KEY": "6Nn7hUFANgm2wbvy3A43ckuqFKqDCeggnae3219T7Yyq",
        "WOOFI_SECRET_KEY": "5Hd7DLap5XV5qP3tkTYKwrbkiB1mzc2v9gk5U1K52FDq",
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "0xd8bc14ea4e7ab8c6ce4e832b1b7ee03f982295002312904d56b169ffb560f3db",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

### Method 4: 🌐 Global Configuration

**If project-specific config doesn't work**

**File**: `~/.cursor/mcp.json`
```json
{
  "mcpServers": {
    "woofi-pro": {
      "command": "npx",
      "args": [
        "-y", 
        "git+https://github.com/DaunteEth/execution-agent.git",
        "woofi-pro"
      ],
      "env": {
        "WOOFI_API_KEY": "your_api_key_here",
        "WOOFI_SECRET_KEY": "your_secret_key_here",
        "WOOFI_BASE_ENDPOINT": "https://api.orderly.org",
        "WOOFI_ACCOUNT_ID": "your_account_id_here",
        "WOOFI_CHAIN_ID": "42161",
        "WOOFI_BROKER_ID": "woofi_pro"
      }
    }
  }
}
```

## ✅ **VERIFICATION - CONFIRMED WORKING**

**Test Command** (Verified working):
```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | \
  WOOFI_API_KEY=test WOOFI_SECRET_KEY=test WOOFI_BASE_ENDPOINT=https://api.orderly.org \
  npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro
```

**Expected Output**:
- ✅ Server starts successfully
- ✅ Registers 19 trading tools
- ✅ Returns JSON-RPC response with all tools listed

## 🔍 Verification Steps

### Step 1: Check Configuration File Location
```bash
# Check if project-specific config exists
ls -la .cursor/mcp.json

# Check if global config exists  
ls -la ~/.cursor/mcp.json
```

### Step 2: Test Server Manually
```bash
# Method 1: Test with corrected npx + GitHub
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | \
  WOOFI_API_KEY=your_key npx -y git+https://github.com/DaunteEth/execution-agent.git woofi-pro

# Method 2: Test locally
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | \
  WOOFI_API_KEY=your_key npm run dev
```

### Step 3: Check Cursor IDE Process
```bash
# See which MCP servers are running
ps aux | grep -E "(mcp|woofi|execution-agent)" | grep -v grep
```

## 🐛 Troubleshooting Guide

### Issue: "0 tools enabled" - **SOLVED**

**Root Cause**: Missing executable name in args array

**Solution**: Ensure your configuration includes the executable name:
```json
"args": [
  "-y", 
  "git+https://github.com/DaunteEth/execution-agent.git",
  "woofi-pro"  // ← This was missing!
]
```

### Issue: "Module not found" errors

**Solutions**:
- Use Method 1 (GitHub) - eliminates path issues
- Ensure `npm run build` was successful
- Check Node.js version compatibility

### Issue: "Cannot find npx"

**Solutions**:
- Use full path: `/Users/daunteharris/.nvm/versions/node/v24.1.0/bin/npx`
- Install globally: `npm install -g npx`
- Use Method 2 (local node path)

### Issue: Configuration not loading

**Solutions**:
1. Check file location: `.cursor/mcp.json` vs `~/.cursor/mcp.json`
2. Validate JSON syntax with `cat .cursor/mcp.json | jq`
3. Ensure Cursor IDE has file permissions

## 🎥 Video Resources

- [MCP Workshop (2hr)](https://modelcontextprotocol.io/workshop) - Official tutorial
- [Cursor MCP Setup](https://www.youtube.com/watch?v=RkPU7eCG_FM) - YouTube guide
- [EggHead MCP Tutorial](https://egghead.io/easy-mcp-server-setup-in-cursor-ide-with-bundled-executables~zrhl5) - Bundled executable method

## 🔄 Quick Restart Protocol

When configuration changes don't take effect:

1. **Save configuration file**
2. **Completely quit Cursor IDE** (Cmd+Q on Mac)
3. **Wait 5 seconds**
4. **Restart Cursor IDE**
5. **Check MCP server status** in IDE

## 📞 Support

If none of these methods work:

1. **Test server independently**: `npm run dev` in project directory
2. **Check GitHub Issues**: [execution-agent issues](https://github.com/DaunteEth/execution-agent/issues)
3. **Forum Support**: [Cursor MCP Forum](https://forum.cursor.com/t/how-to-use-mcp-server/50064)

---

## 🎉 **SUCCESS PATTERN IDENTIFIED**

**Key Learning**: MCP server configurations must follow the same pattern as working examples:
- **Python**: `uvx --from git+repo executable_name`
- **Node.js**: `npx -y git+repo executable_name`

The executable name at the end is **CRITICAL** for proper MCP server discovery and execution.

**Recommendation**: Use **Method 1** (Corrected GitHub) as it's now verified working and eliminates path-related issues. 