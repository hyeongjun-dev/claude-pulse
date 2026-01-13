import type { RenderContext, ToolEntry } from '../types.js';
/**
 * Renders the tools activity line
 */
export declare function renderToolsLine(ctx: RenderContext): string | null;
/**
 * Get summary of tool activity
 */
export declare function getToolSummary(tools: ToolEntry[]): {
    running: number;
    completed: number;
    errors: number;
    total: number;
};
//# sourceMappingURL=tools-line.d.ts.map