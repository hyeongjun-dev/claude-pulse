import { CONTEXT_WARNING_THRESHOLD, CONTEXT_CRITICAL_THRESHOLD, CONTEXT_DANGER_THRESHOLD, ALERT_MESSAGES, } from './constants.js';
// Track if alert has been triggered this session to avoid spam
const triggeredAlerts = new Set();
/**
 * Check context usage and generate alert if needed
 */
export function checkContextAlert(percent, config) {
    if (!config.alerts.enabled || config.alerts.level === 'none') {
        return null;
    }
    // Determine alert level based on percentage
    let level = null;
    if (percent >= CONTEXT_DANGER_THRESHOLD) {
        level = 'danger';
    }
    else if (percent >= CONTEXT_CRITICAL_THRESHOLD) {
        level = 'critical';
    }
    else if (percent >= CONTEXT_WARNING_THRESHOLD) {
        level = 'warning';
    }
    if (!level) {
        return null;
    }
    // Filter based on configured alert level
    if (config.alerts.level === 'critical' && level === 'warning') {
        return null;
    }
    // Check if we've already triggered this level
    const alertKey = `${level}-${Math.floor(percent / 5) * 5}`; // Group by 5% increments
    const alreadyTriggered = triggeredAlerts.has(alertKey);
    if (!alreadyTriggered) {
        triggeredAlerts.add(alertKey);
    }
    const alertConfig = ALERT_MESSAGES[level];
    return {
        level,
        percent,
        message: alertConfig.message,
        suggestion: config.alerts.showSuggestions ? alertConfig.suggestion : undefined,
        triggered: !alreadyTriggered, // true if this is a new alert
    };
}
/**
 * Reset alert tracking (call when starting new session)
 */
export function resetAlerts() {
    triggeredAlerts.clear();
}
/**
 * Format alert for display
 */
export function formatAlert(alert) {
    const icon = getAlertIcon(alert.level);
    let message = `${icon} ${alert.message} (${alert.percent}%)`;
    if (alert.suggestion) {
        message += ` - ${alert.suggestion}`;
    }
    return message;
}
/**
 * Get alert icon based on level
 */
function getAlertIcon(level) {
    switch (level) {
        case 'danger':
            return '🚨';
        case 'critical':
            return '⚠️';
        case 'warning':
            return '📢';
        default:
            return '❓';
    }
}
/**
 * Check if sound alert should be played
 */
export function shouldPlaySound(alert, config) {
    return (config.alerts.soundEnabled &&
        alert.triggered &&
        (alert.level === 'critical' || alert.level === 'danger'));
}
/**
 * Get terminal bell character for sound alert
 */
export function getTerminalBell() {
    return '\x07'; // ASCII BEL character
}
//# sourceMappingURL=context-alert.js.map