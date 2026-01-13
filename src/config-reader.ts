import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

interface ConfigCounts {
  claudeMdCount: number;
  rulesCount: number;
  mcpCount: number;
  hooksCount: number;
}

export async function countConfigs(cwd?: string): Promise<ConfigCounts> {
  let claudeMdCount = 0;
  let rulesCount = 0;
  let mcpCount = 0;
  let hooksCount = 0;

  const homeDir = os.homedir();
  const settingsPath = path.join(homeDir, '.claude', 'settings.json');

  try {
    // Count CLAUDE.md files
    claudeMdCount = countClaudeMdFiles(cwd, homeDir);

    // Count from settings.json
    if (fs.existsSync(settingsPath)) {
      const content = fs.readFileSync(settingsPath, 'utf-8');
      const settings = JSON.parse(content) as {
        mcpServers?: Record<string, unknown>;
        hooks?: Record<string, unknown>;
        rules?: string[];
      };

      // Count MCPs
      if (settings.mcpServers && typeof settings.mcpServers === 'object') {
        mcpCount = Object.keys(settings.mcpServers).length;
      }

      // Count hooks
      if (settings.hooks && typeof settings.hooks === 'object') {
        hooksCount = Object.keys(settings.hooks).length;
      }

      // Count rules
      if (Array.isArray(settings.rules)) {
        rulesCount = settings.rules.length;
      }
    }
  } catch {
    // Ignore errors, return 0 counts
  }

  return { claudeMdCount, rulesCount, mcpCount, hooksCount };
}

function countClaudeMdFiles(cwd?: string, homeDir?: string): number {
  let count = 0;

  const pathsToCheck = [
    // Global CLAUDE.md
    homeDir ? path.join(homeDir, '.claude', 'CLAUDE.md') : null,
    // Project CLAUDE.md
    cwd ? path.join(cwd, 'CLAUDE.md') : null,
    cwd ? path.join(cwd, '.claude', 'CLAUDE.md') : null,
  ].filter(Boolean) as string[];

  for (const p of pathsToCheck) {
    try {
      if (fs.existsSync(p)) {
        count++;
      }
    } catch {
      // Ignore
    }
  }

  return count;
}
