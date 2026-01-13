import type { RenderContext } from '../types.js';
import { formatAlert, shouldPlaySound, getTerminalBell } from '../context-alert.js';
import { alertColor, RESET, bold, dim } from './colors.js';

/**
 * Renders the context alert line
 */
export function renderAlertLine(ctx: RenderContext): string | null {
  if (!ctx.config.alerts.enabled || !ctx.contextAlert) {
    return null;
  }

  const alert = ctx.contextAlert;
  const color = alertColor(alert.level);

  let line = `${color}${formatAlert(alert)}${RESET}`;

  // Add terminal bell for sound alert
  if (shouldPlaySound(alert, ctx.config)) {
    line = getTerminalBell() + line;
  }

  return line;
}

/**
 * Renders alert with more details (for critical situations)
 */
export function renderDetailedAlert(ctx: RenderContext): string[] | null {
  if (!ctx.contextAlert) {
    return null;
  }

  const alert = ctx.contextAlert;
  const lines: string[] = [];
  const color = alertColor(alert.level);

  // Header
  lines.push(`${color}${'━'.repeat(50)}${RESET}`);
  lines.push(`${color}${bold(alert.message)}${RESET}`);
  lines.push(`${color}Context Usage: ${alert.percent}%${RESET}`);

  // Suggestion
  if (alert.suggestion) {
    lines.push('');
    lines.push(`${dim('Suggestion:')} ${alert.suggestion}`);
  }

  // Quick actions
  lines.push('');
  lines.push(`${dim('Quick Actions:')}`);
  lines.push(`  ${dim('•')} Type ${bold('/compact')} to summarize conversation`);
  lines.push(`  ${dim('•')} Type ${bold('/clear')} to start fresh`);
  lines.push(`  ${dim('•')} Consider breaking task into smaller parts`);

  lines.push(`${color}${'━'.repeat(50)}${RESET}`);

  return lines;
}

/**
 * Get alert severity indicator
 */
export function getAlertIndicator(ctx: RenderContext): string {
  if (!ctx.contextAlert) {
    return '';
  }

  const alert = ctx.contextAlert;

  switch (alert.level) {
    case 'danger':
      return '🚨';
    case 'critical':
      return '⚠️';
    case 'warning':
      return '📢';
    default:
      return '';
  }
}
