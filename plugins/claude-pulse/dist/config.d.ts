export type LayoutType = 'default' | 'separators' | 'compact';
export type AutocompactBufferMode = 'enabled' | 'disabled';
export type AlertLevel = 'all' | 'critical' | 'none';
export interface PulseConfig {
    layout: LayoutType;
    pathLevels: 1 | 2 | 3;
    gitStatus: {
        enabled: boolean;
        showDirty: boolean;
        showAheadBehind: boolean;
    };
    display: {
        showModel: boolean;
        showContextBar: boolean;
        showConfigCounts: boolean;
        showDuration: boolean;
        showTokenBreakdown: boolean;
        showUsage: boolean;
        showTools: boolean;
        showAgents: boolean;
        showTodos: boolean;
        autocompactBuffer: AutocompactBufferMode;
        showCost: boolean;
        showStats: boolean;
    };
    alerts: {
        enabled: boolean;
        level: AlertLevel;
        showSuggestions: boolean;
        soundEnabled: boolean;
    };
    cost: {
        enabled: boolean;
        currency: 'USD';
        showBreakdown: boolean;
    };
}
export declare const DEFAULT_CONFIG: PulseConfig;
export declare function getConfigPath(): string;
export declare function loadConfig(): Promise<PulseConfig>;
export declare function saveConfig(config: Partial<PulseConfig>): Promise<void>;
//# sourceMappingURL=config.d.ts.map