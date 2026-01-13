import type { PulseConfig } from './config.js';
import type { GitStatus } from './git.js';
export interface StdinData {
    transcript_path?: string;
    cwd?: string;
    model?: {
        id?: string;
        display_name?: string;
    };
    context_window?: {
        context_window_size?: number;
        current_usage?: {
            input_tokens?: number;
            output_tokens?: number;
            cache_creation_input_tokens?: number;
            cache_read_input_tokens?: number;
        };
    };
}
export interface ToolEntry {
    id: string;
    name: string;
    target?: string;
    status: 'running' | 'completed' | 'error';
    startTime: Date;
    endTime?: Date;
    duration?: number;
}
export interface AgentEntry {
    id: string;
    type: string;
    model?: string;
    description?: string;
    status: 'running' | 'completed';
    startTime: Date;
    endTime?: Date;
}
export interface TodoItem {
    content: string;
    status: 'pending' | 'in_progress' | 'completed';
}
export interface UsageWindow {
    utilization: number | null;
    resetAt: Date | null;
}
export interface UsageData {
    planName: string | null;
    fiveHour: number | null;
    sevenDay: number | null;
    fiveHourResetAt: Date | null;
    sevenDayResetAt: Date | null;
    apiUnavailable?: boolean;
}
export declare function isLimitReached(data: UsageData): boolean;
export interface CostData {
    inputTokens: number;
    outputTokens: number;
    cacheTokens: number;
    totalCost: number;
    currency: string;
}
export interface SessionStats {
    totalToolCalls: number;
    completedToolCalls: number;
    errorToolCalls: number;
    errorRate: number;
    avgToolDuration: number;
    mostUsedTools: Map<string, number>;
    totalAgentCalls: number;
    todoCompletionRate: number;
}
export interface ContextAlert {
    level: 'warning' | 'critical' | 'danger';
    percent: number;
    message: string;
    suggestion?: string;
    triggered: boolean;
}
export interface TranscriptData {
    tools: ToolEntry[];
    agents: AgentEntry[];
    todos: TodoItem[];
    sessionStart?: Date;
}
export interface RenderContext {
    stdin: StdinData;
    transcript: TranscriptData;
    claudeMdCount: number;
    rulesCount: number;
    mcpCount: number;
    hooksCount: number;
    sessionDuration: string;
    gitStatus: GitStatus | null;
    usageData: UsageData | null;
    config: PulseConfig;
    costData: CostData;
    sessionStats: SessionStats;
    contextAlert: ContextAlert | null;
}
//# sourceMappingURL=types.d.ts.map