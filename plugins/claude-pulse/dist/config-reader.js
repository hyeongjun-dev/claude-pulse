import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
export async function countConfigs(cwd) {
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
            const settings = JSON.parse(content);
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
    }
    catch {
        // Ignore errors, return 0 counts
    }
    return { claudeMdCount, rulesCount, mcpCount, hooksCount };
}
function countClaudeMdFiles(cwd, homeDir) {
    let count = 0;
    const pathsToCheck = [
        // Global CLAUDE.md
        homeDir ? path.join(homeDir, '.claude', 'CLAUDE.md') : null,
        // Project CLAUDE.md
        cwd ? path.join(cwd, 'CLAUDE.md') : null,
        cwd ? path.join(cwd, '.claude', 'CLAUDE.md') : null,
    ].filter(Boolean);
    for (const p of pathsToCheck) {
        try {
            if (fs.existsSync(p)) {
                count++;
            }
        }
        catch {
            // Ignore
        }
    }
    return count;
}
//# sourceMappingURL=config-reader.js.map