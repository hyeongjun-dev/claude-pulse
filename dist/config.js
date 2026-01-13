import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
export const DEFAULT_CONFIG = {
    layout: 'default',
    pathLevels: 1,
    gitStatus: {
        enabled: true,
        showDirty: true,
        showAheadBehind: false,
    },
    display: {
        showModel: true,
        showContextBar: true,
        showConfigCounts: true,
        showDuration: true,
        showTokenBreakdown: true,
        showUsage: true,
        showTools: true,
        showAgents: true,
        showTodos: true,
        autocompactBuffer: 'enabled',
        // Extended defaults
        showCost: true,
        showStats: true,
    },
    alerts: {
        enabled: true,
        level: 'critical',
        showSuggestions: true,
        soundEnabled: false,
    },
    cost: {
        enabled: true,
        currency: 'USD',
        showBreakdown: true,
    },
};
export function getConfigPath() {
    const homeDir = os.homedir();
    return path.join(homeDir, '.claude', 'plugins', 'claude-pulse', 'config.json');
}
function validatePathLevels(value) {
    return value === 1 || value === 2 || value === 3;
}
function validateLayout(value) {
    return value === 'default' || value === 'separators' || value === 'compact';
}
function validateAutocompactBuffer(value) {
    return value === 'enabled' || value === 'disabled';
}
function validateAlertLevel(value) {
    return value === 'all' || value === 'critical' || value === 'none';
}
function mergeConfig(userConfig) {
    const layout = validateLayout(userConfig.layout)
        ? userConfig.layout
        : DEFAULT_CONFIG.layout;
    const pathLevels = validatePathLevels(userConfig.pathLevels)
        ? userConfig.pathLevels
        : DEFAULT_CONFIG.pathLevels;
    const gitStatus = {
        enabled: typeof userConfig.gitStatus?.enabled === 'boolean'
            ? userConfig.gitStatus.enabled
            : DEFAULT_CONFIG.gitStatus.enabled,
        showDirty: typeof userConfig.gitStatus?.showDirty === 'boolean'
            ? userConfig.gitStatus.showDirty
            : DEFAULT_CONFIG.gitStatus.showDirty,
        showAheadBehind: typeof userConfig.gitStatus?.showAheadBehind === 'boolean'
            ? userConfig.gitStatus.showAheadBehind
            : DEFAULT_CONFIG.gitStatus.showAheadBehind,
    };
    const display = {
        showModel: typeof userConfig.display?.showModel === 'boolean'
            ? userConfig.display.showModel
            : DEFAULT_CONFIG.display.showModel,
        showContextBar: typeof userConfig.display?.showContextBar === 'boolean'
            ? userConfig.display.showContextBar
            : DEFAULT_CONFIG.display.showContextBar,
        showConfigCounts: typeof userConfig.display?.showConfigCounts === 'boolean'
            ? userConfig.display.showConfigCounts
            : DEFAULT_CONFIG.display.showConfigCounts,
        showDuration: typeof userConfig.display?.showDuration === 'boolean'
            ? userConfig.display.showDuration
            : DEFAULT_CONFIG.display.showDuration,
        showTokenBreakdown: typeof userConfig.display?.showTokenBreakdown === 'boolean'
            ? userConfig.display.showTokenBreakdown
            : DEFAULT_CONFIG.display.showTokenBreakdown,
        showUsage: typeof userConfig.display?.showUsage === 'boolean'
            ? userConfig.display.showUsage
            : DEFAULT_CONFIG.display.showUsage,
        showTools: typeof userConfig.display?.showTools === 'boolean'
            ? userConfig.display.showTools
            : DEFAULT_CONFIG.display.showTools,
        showAgents: typeof userConfig.display?.showAgents === 'boolean'
            ? userConfig.display.showAgents
            : DEFAULT_CONFIG.display.showAgents,
        showTodos: typeof userConfig.display?.showTodos === 'boolean'
            ? userConfig.display.showTodos
            : DEFAULT_CONFIG.display.showTodos,
        autocompactBuffer: validateAutocompactBuffer(userConfig.display?.autocompactBuffer)
            ? userConfig.display.autocompactBuffer
            : DEFAULT_CONFIG.display.autocompactBuffer,
        showCost: typeof userConfig.display?.showCost === 'boolean'
            ? userConfig.display.showCost
            : DEFAULT_CONFIG.display.showCost,
        showStats: typeof userConfig.display?.showStats === 'boolean'
            ? userConfig.display.showStats
            : DEFAULT_CONFIG.display.showStats,
    };
    const alerts = {
        enabled: typeof userConfig.alerts?.enabled === 'boolean'
            ? userConfig.alerts.enabled
            : DEFAULT_CONFIG.alerts.enabled,
        level: validateAlertLevel(userConfig.alerts?.level)
            ? userConfig.alerts.level
            : DEFAULT_CONFIG.alerts.level,
        showSuggestions: typeof userConfig.alerts?.showSuggestions === 'boolean'
            ? userConfig.alerts.showSuggestions
            : DEFAULT_CONFIG.alerts.showSuggestions,
        soundEnabled: typeof userConfig.alerts?.soundEnabled === 'boolean'
            ? userConfig.alerts.soundEnabled
            : DEFAULT_CONFIG.alerts.soundEnabled,
    };
    const cost = {
        enabled: typeof userConfig.cost?.enabled === 'boolean'
            ? userConfig.cost.enabled
            : DEFAULT_CONFIG.cost.enabled,
        currency: 'USD',
        showBreakdown: typeof userConfig.cost?.showBreakdown === 'boolean'
            ? userConfig.cost.showBreakdown
            : DEFAULT_CONFIG.cost.showBreakdown,
    };
    return { layout, pathLevels, gitStatus, display, alerts, cost };
}
export async function loadConfig() {
    const configPath = getConfigPath();
    try {
        if (!fs.existsSync(configPath)) {
            return DEFAULT_CONFIG;
        }
        const content = fs.readFileSync(configPath, 'utf-8');
        const userConfig = JSON.parse(content);
        return mergeConfig(userConfig);
    }
    catch {
        return DEFAULT_CONFIG;
    }
}
export async function saveConfig(config) {
    const configPath = getConfigPath();
    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    const currentConfig = await loadConfig();
    const mergedConfig = mergeConfig({ ...currentConfig, ...config });
    fs.writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
}
//# sourceMappingURL=config.js.map