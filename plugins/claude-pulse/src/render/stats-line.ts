import type { RenderContext } from '../types.js';
import { getTopTools } from '../session-stats.js';
import { cyan, dim, green, yellow, red } from './colors.js';

/**
 * Renders the session statistics line
 */
export function renderStatsLine(ctx: RenderContext): string | null {
  if (!ctx.config.display.showStats) {
    return null;
  }

  const stats = ctx.sessionStats;

  if (stats.totalToolCalls === 0) {
    return null;
  }

  const parts: string[] = [];

  // Tool success rate
  const successRate = stats.totalToolCalls > 0
    ? ((stats.completedToolCalls / stats.totalToolCalls) * 100).toFixed(0)
    : '0';
  const rateColorFn = stats.errorRate > 10 ? red : (stats.errorRate > 5 ? yellow : green);
  parts.push(`${cyan('📊')} Tools: ${stats.completedToolCalls}/${stats.totalToolCalls} (${rateColorFn(`${successRate}%`)})`);

  // Average tool duration
  if (stats.avgToolDuration > 0) {
    const avgStr = stats.avgToolDuration >= 1000
      ? `${(stats.avgToolDuration / 1000).toFixed(1)}s`
      : `${Math.round(stats.avgToolDuration)}ms`;
    parts.push(dim(`avg: ${avgStr}`));
  }

  // Top tools (compact)
  const topTools = getTopTools(stats, 2);
  if (topTools.length > 0) {
    const topStr = topTools.map(t => `${t.name}:${t.count}`).join(', ');
    parts.push(dim(`top: ${topStr}`));
  }

  // Error rate if significant
  if (stats.errorToolCalls > 0) {
    parts.push(`${red(`${stats.errorToolCalls} errors`)}`);
  }

  return parts.join(' | ');
}

/**
 * Renders detailed statistics (for stats command)
 */
export function renderDetailedStats(ctx: RenderContext): string[] {
  const lines: string[] = [];
  const stats = ctx.sessionStats;

  lines.push(`${cyan('Session Statistics:')}`);
  lines.push('');

  // Tool Statistics
  lines.push(`${green('Tool Calls:')}`);
  lines.push(`  Total:     ${stats.totalToolCalls}`);
  lines.push(`  Completed: ${stats.completedToolCalls}`);
  lines.push(`  Errors:    ${stats.errorToolCalls}`);
  lines.push(`  Success:   ${((stats.completedToolCalls / Math.max(stats.totalToolCalls, 1)) * 100).toFixed(1)}%`);

  if (stats.avgToolDuration > 0) {
    const avgStr = stats.avgToolDuration >= 1000
      ? `${(stats.avgToolDuration / 1000).toFixed(2)}s`
      : `${Math.round(stats.avgToolDuration)}ms`;
    lines.push(`  Avg Time:  ${avgStr}`);
  }

  lines.push('');

  // Top Tools
  const topTools = getTopTools(stats, 10);
  if (topTools.length > 0) {
    lines.push(`${green('Top Tools:')}`);
    for (const tool of topTools) {
      const bar = '█'.repeat(Math.min(20, Math.round((tool.count / stats.totalToolCalls) * 20)));
      const pct = ((tool.count / stats.totalToolCalls) * 100).toFixed(1);
      lines.push(`  ${tool.name.padEnd(15)} ${dim(bar)} ${tool.count} (${pct}%)`);
    }
    lines.push('');
  }

  // Agent Statistics
  if (stats.totalAgentCalls > 0) {
    lines.push(`${green('Agents:')}`);
    lines.push(`  Total calls: ${stats.totalAgentCalls}`);
    lines.push('');
  }

  // Todo Statistics
  if (stats.todoCompletionRate > 0) {
    lines.push(`${green('Todos:')}`);
    lines.push(`  Completion: ${stats.todoCompletionRate.toFixed(1)}%`);
  }

  return lines;
}
