import type { ContextAlert } from './types.js';
import type { PulseConfig } from './config.js';
/**
 * Check context usage and generate alert if needed
 */
export declare function checkContextAlert(percent: number, config: PulseConfig): ContextAlert | null;
/**
 * Reset alert tracking (call when starting new session)
 */
export declare function resetAlerts(): void;
/**
 * Format alert for display
 */
export declare function formatAlert(alert: ContextAlert): string;
/**
 * Check if sound alert should be played
 */
export declare function shouldPlaySound(alert: ContextAlert, config: PulseConfig): boolean;
/**
 * Get terminal bell character for sound alert
 */
export declare function getTerminalBell(): string;
//# sourceMappingURL=context-alert.d.ts.map