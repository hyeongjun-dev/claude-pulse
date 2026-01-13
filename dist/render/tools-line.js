import { green, red, yellow, dim, cyan } from './colors.js';
/**
 * Renders the tools activity line
 */
export function renderToolsLine(ctx) {
    const tools = ctx.transcript.tools;
    if (tools.length === 0) {
        return null;
    }
    const parts = [];
    // Find running tools
    const runningTools = tools.filter(t => t.status === 'running');
    const completedTools = tools.filter(t => t.status === 'completed');
    const errorTools = tools.filter(t => t.status === 'error');
    // Show running tools first (with spinner)
    for (const tool of runningTools.slice(0, 2)) {
        const targetPart = tool.target ? `: ${cyan(tool.target)}` : '';
        parts.push(`${yellow('◐')} ${tool.name}${targetPart}`);
    }
    if (runningTools.length > 2) {
        parts.push(dim(`+${runningTools.length - 2} running`));
    }
    // Aggregate completed tools by name
    const completedCounts = new Map();
    for (const tool of completedTools) {
        const count = completedCounts.get(tool.name) ?? 0;
        completedCounts.set(tool.name, count + 1);
    }
    // Show completed tools (sorted by count)
    const sortedCompleted = [...completedCounts.entries()].sort((a, b) => b[1] - a[1]);
    for (const [name, count] of sortedCompleted.slice(0, 5)) {
        const countStr = count > 1 ? ` ×${count}` : '';
        parts.push(`${green('✓')} ${name}${countStr}`);
    }
    if (sortedCompleted.length > 5) {
        const remainingCount = sortedCompleted.slice(5).reduce((sum, [, c]) => sum + c, 0);
        parts.push(dim(`+${remainingCount} more`));
    }
    // Show error count if any
    if (errorTools.length > 0) {
        parts.push(`${red('✗')} ${errorTools.length} error${errorTools.length > 1 ? 's' : ''}`);
    }
    return parts.join(' | ');
}
/**
 * Get summary of tool activity
 */
export function getToolSummary(tools) {
    return {
        running: tools.filter(t => t.status === 'running').length,
        completed: tools.filter(t => t.status === 'completed').length,
        errors: tools.filter(t => t.status === 'error').length,
        total: tools.length,
    };
}
//# sourceMappingURL=tools-line.js.map