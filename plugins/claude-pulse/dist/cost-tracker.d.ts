import type { StdinData, CostData } from './types.js';
import type { PulseConfig } from './config.js';
/**
 * Calculate cost based on token usage and model
 */
export declare function calculateCost(stdin: StdinData, config: PulseConfig): CostData;
/**
 * Format cost for display
 */
export declare function formatCost(costData: CostData): string;
/**
 * Get cost breakdown by type
 */
export declare function getCostBreakdown(stdin: StdinData, config: PulseConfig): {
    input: string;
    output: string;
    cache: string;
    total: string;
};
//# sourceMappingURL=cost-tracker.d.ts.map