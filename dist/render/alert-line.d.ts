import type { RenderContext } from '../types.js';
/**
 * Renders the context alert line
 */
export declare function renderAlertLine(ctx: RenderContext): string | null;
/**
 * Renders alert with more details (for critical situations)
 */
export declare function renderDetailedAlert(ctx: RenderContext): string[] | null;
/**
 * Get alert severity indicator
 */
export declare function getAlertIndicator(ctx: RenderContext): string;
//# sourceMappingURL=alert-line.d.ts.map