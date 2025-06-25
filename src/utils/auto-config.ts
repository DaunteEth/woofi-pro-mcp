import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export interface MCPCredentials {
  apiKey: string;
  secretKey: string;
  accountId: string;
}

export interface ConfigLocation {
  platform: string;
  path: string;
  exists: boolean;
}

/**
 * Get potential MCP config file locations for all platforms
 */
export async function detectMCPPlatforms(): Promise<ConfigLocation[]> {
  const home = homedir();
  const locations: Array<{ platform: string; path: string }> = [];

  // Claude Desktop locations
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA || join(home, 'AppData', 'Roaming');
    locations.push({
      platform: 'Claude Desktop (Windows)',
      path: join(appData, 'Claude', 'claude_desktop_config.json')
    });
  } else if (process.platform === 'darwin') {
    locations.push({
      platform: 'Claude Desktop (macOS)',
      path: join(home, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
    });
  } else {
    locations.push({
      platform: 'Claude Desktop (Linux)',
      path: join(home, '.config', 'Claude', 'claude_desktop_config.json')
    });
  }

  // Cursor location
  locations.push({
    platform: 'Cursor IDE',
    path: join(home, '.cursor', 'mcp.json')
  });

  // Check which files actually exist
  const results: ConfigLocation[] = [];
  for (const location of locations) {
    try {
      await fs.access(location.path);
      results.push({ ...location, exists: true });
    } catch {
      results.push({ ...location, exists: false });
    }
  }

  return results;
}

/**
 * Safely backup a file before modification
 */
async function createBackup(filePath: string): Promise<string> {
  const backupPath = `${filePath}.backup.${Date.now()}`;
  await fs.copyFile(filePath, backupPath);
  console.log(`📋 Created backup: ${backupPath}`);
  return backupPath;
}

/**
 * Safely write JSON with atomic operation
 */
async function safeWriteJSON(filePath: string, data: any): Promise<void> {
  const tempPath = `${filePath}.tmp`;
  const jsonString = JSON.stringify(data, null, 2);
  
  await fs.writeFile(tempPath, jsonString, 'utf8');
  await fs.rename(tempPath, filePath);
}

/**
 * Update MCP config file with WOOFi Pro server configuration
 */
export async function updateMCPConfig(configPath: string, credentials: MCPCredentials): Promise<void> {
  console.log(`🔧 Updating config: ${configPath}`);

  // Create backup if file exists
  try {
    await fs.access(configPath);
    await createBackup(configPath);
  } catch {
    // File doesn't exist, create directory if needed
    const dir = configPath.substring(0, configPath.lastIndexOf('/'));
    await fs.mkdir(dir, { recursive: true });
  }

  // Read existing config or create new one
  let config: any = { mcpServers: {} };
  try {
    const content = await fs.readFile(configPath, 'utf8');
    config = JSON.parse(content);
    if (!config.mcpServers) {
      config.mcpServers = {};
    }
  } catch {
    console.log(`📄 Creating new config file`);
  }

  // Add/update WOOFi Pro server configuration
  config.mcpServers['woofi-pro'] = {
    command: 'npx',
    args: [
      '-y',
      'git+https://github.com/DaunteEth/execution-agent.git',
      'woofi-pro'
    ],
    env: {
      WOOFI_API_KEY: credentials.apiKey,
      WOOFI_SECRET_KEY: credentials.secretKey,
      WOOFI_ACCOUNT_ID: credentials.accountId
    }
  };

  // Write updated config
  await safeWriteJSON(configPath, config);
  console.log(`✅ Updated successfully!`);
}

/**
 * Get platform-specific config path and name
 */
function getClientConfig(client: string): { name: string; path: string } {
  const home = homedir();
  
  switch (client) {
    case 'claude':
      if (process.platform === 'win32') {
        const appData = process.env.APPDATA || join(home, 'AppData', 'Roaming');
        return {
          name: 'Claude Desktop',
          path: join(appData, 'Claude', 'claude_desktop_config.json')
        };
      } else if (process.platform === 'darwin') {
        return {
          name: 'Claude Desktop',
          path: join(home, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
        };
      } else {
        return {
          name: 'Claude Desktop',
          path: join(home, '.config', 'Claude', 'claude_desktop_config.json')
        };
      }
      
    case 'cursor':
      return {
        name: 'Cursor IDE',
        path: join(home, '.cursor', 'mcp.json')
      };
      
    case 'vscode':
      return {
        name: 'VSCode',
        path: join(home, '.mcp.json')  // Global VSCode MCP config
      };
      
    case 'windsurf':
      return {
        name: 'Windsurf',
        path: join(home, '.windsurf', 'mcp.json')  // Assumed path for Windsurf
      };
      
    default:
      throw new Error(`Unsupported client: ${client}`);
  }
}

/**
 * Configure WOOFi Pro for a specific MCP client
 */
export async function configureWOOFiProForClient(client: string, credentials: MCPCredentials): Promise<void> {
  console.log(`🚀 Configuring WOOFi Pro for ${client.toUpperCase()}...`);
  console.log(`🔑 Using credentials:`);
  console.log(`   API Key: ${credentials.apiKey.substring(0, 8)}...`);
  console.log(`   Secret Key: ${credentials.secretKey.substring(0, 8)}...`);
  console.log(`   Account ID: ${credentials.accountId}`);
  console.log();

  const clientConfig = getClientConfig(client);
  
  console.log(`🎯 Target: ${clientConfig.name}`);
  console.log(`📂 Config: ${clientConfig.path}`);
  console.log();

  try {
    await updateMCPConfig(clientConfig.path, credentials);
    
    console.log();
    console.log(`🎉 Configuration complete for ${clientConfig.name}!`);
    console.log(`📱 Please restart ${clientConfig.name} to load the new configuration.`);
    console.log();
    console.log(`🧪 Test your setup by asking:`);
    console.log(`   "Show me my WOOFi Pro account information"`);
    
  } catch (error) {
    console.error(`❌ Failed to configure ${clientConfig.name}:`, error);
    throw error;
  }
} 