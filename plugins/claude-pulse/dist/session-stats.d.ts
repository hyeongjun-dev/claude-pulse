import type { TranscriptData, SessionStats, ToolEntry } from './types.js';
/**
 * Calculate session statistics from transcript data
 */
export declare function calculateStats(transcript: TranscriptData): SessionStats;
/**
 * Format session statistics for display
 */
export declare function formatStats(stats: SessionStats): string;
/**
 * Get top N most used tools
 */
export declare function getTopTools(stats: SessionStats, n?: number): Array<{
    name: string;
    count: number;
}>;
/**
 * Calculate running tools and their elapsed time
 */
export declare function getRunningToolsInfo(tools: ToolEntry[]): {
    count: number;
    oldest: {
        name: string;
        elapsed: number;
    } | null;
};
//# sourceMappingURL=session-stats.d.ts.map