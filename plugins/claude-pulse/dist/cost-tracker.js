import { MODEL_PRICING } from './constants.js';
/**
 * Calculate cost based on token usage and model
 */
export function calculateCost(stdin, config) {
    const usage = stdin.context_window?.current_usage;
    const modelName = stdin.model?.display_name ?? stdin.model?.id ?? 'default';
    // Get pricing for the model (fallback to default)
    const pricing = MODEL_PRICING[modelName] ?? MODEL_PRICING['default'];
    const inputTokens = usage?.input_tokens ?? 0;
    const outputTokens = usage?.output_tokens ?? 0;
    const cacheReadTokens = usage?.cache_read_input_tokens ?? 0;
    const cacheWriteTokens = usage?.cache_creation_input_tokens ?? 0;
    // Calculate cost per million tokens
    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    const cacheReadCost = (cacheReadTokens / 1_000_000) * pricing.cacheRead;
    const cacheWriteCost = (cacheWriteTokens / 1_000_000) * pricing.cacheWrite;
    const totalCost = inputCost + outputCost + cacheReadCost + cacheWriteCost;
    return {
        inputTokens,
        outputTokens,
        cacheTokens: cacheReadTokens + cacheWriteTokens,
        totalCost,
        currency: config.cost.currency,
    };
}
/**
 * Format cost for display
 */
export function formatCost(costData) {
    const { totalCost } = costData;
    // USD formatting
    if (totalCost >= 1) {
        return `$${totalCost.toFixed(2)}`;
    }
    if (totalCost >= 0.01) {
        return `$${totalCost.toFixed(3)}`;
    }
    if (totalCost >= 0.001) {
        return `$${totalCost.toFixed(4)}`;
    }
    return `$${totalCost.toFixed(5)}`;
}
/**
 * Get cost breakdown by type
 */
export function getCostBreakdown(stdin, config) {
    const usage = stdin.context_window?.current_usage;
    const modelName = stdin.model?.display_name ?? stdin.model?.id ?? 'default';
    const pricing = MODEL_PRICING[modelName] ?? MODEL_PRICING['default'];
    const inputTokens = usage?.input_tokens ?? 0;
    const outputTokens = usage?.output_tokens ?? 0;
    const cacheReadTokens = usage?.cache_read_input_tokens ?? 0;
    const cacheWriteTokens = usage?.cache_creation_input_tokens ?? 0;
    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    const cacheCost = (cacheReadTokens / 1_000_000) * pricing.cacheRead +
        (cacheWriteTokens / 1_000_000) * pricing.cacheWrite;
    const totalCost = inputCost + outputCost + cacheCost;
    const format = (cost) => formatCost({ totalCost: cost, currency: config.cost.currency });
    return {
        input: format(inputCost),
        output: format(outputCost),
        cache: format(cacheCost),
        total: format(totalCost),
    };
}
//# sourceMappingURL=cost-tracker.js.map