import { formatCost, getCostBreakdown } from '../cost-tracker.js';
import { cyan, dim, green, getCostColor, RESET } from './colors.js';
/**
 * Renders the cost tracking line
 */
export function renderCostLine(ctx) {
    if (!ctx.config.cost.enabled || !ctx.config.display.showCost) {
        return null;
    }
    const costData = ctx.costData;
    if (costData.totalCost === 0) {
        return null;
    }
    const parts = [];
    const costColor = getCostColor(costData.totalCost);
    // Main cost display
    const formattedCost = formatCost(costData);
    parts.push(`${cyan('💰')} Cost: ${costColor}${formattedCost}${RESET}`);
    // Token breakdown
    const tokens = [];
    if (costData.inputTokens > 0) {
        tokens.push(`in: ${formatTokenCount(costData.inputTokens)}`);
    }
    if (costData.outputTokens > 0) {
        tokens.push(`out: ${formatTokenCount(costData.outputTokens)}`);
    }
    if (costData.cacheTokens > 0) {
        tokens.push(`cache: ${formatTokenCount(costData.cacheTokens)}`);
    }
    if (tokens.length > 0) {
        parts.push(dim(`(${tokens.join(', ')})`));
    }
    return parts.join(' ');
}
/**
 * Renders detailed cost breakdown (for stats command)
 */
export function renderCostBreakdown(ctx) {
    const lines = [];
    if (!ctx.config.cost.enabled) {
        return lines;
    }
    const breakdown = getCostBreakdown(ctx.stdin, ctx.config);
    lines.push(`${cyan('Cost Breakdown:')}`);
    lines.push(`  Input tokens:  ${breakdown.input}`);
    lines.push(`  Output tokens: ${breakdown.output}`);
    lines.push(`  Cache tokens:  ${breakdown.cache}`);
    lines.push(`  ${green('Total:')}         ${breakdown.total}`);
    return lines;
}
function formatTokenCount(n) {
    if (n >= 1000000) {
        return `${(n / 1000000).toFixed(1)}M`;
    }
    if (n >= 1000) {
        return `${(n / 1000).toFixed(1)}k`;
    }
    return n.toString();
}
//# sourceMappingURL=cost-line.js.map