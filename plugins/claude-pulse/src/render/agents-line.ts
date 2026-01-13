import type { RenderContext, AgentEntry } from '../types.js';
import { green, yellow, cyan, dim, magenta, RESET } from './colors.js';

/**
 * Renders the agents activity line
 */
export function renderAgentsLine(ctx: RenderContext): string | null {
  const agents = ctx.transcript.agents;

  if (agents.length === 0) {
    return null;
  }

  const parts: string[] = [];

  // Show running agents
  const runningAgents = agents.filter(a => a.status === 'running');
  const completedAgents = agents.filter(a => a.status === 'completed');

  for (const agent of runningAgents) {
    const elapsed = formatElapsed(agent.startTime);
    const modelPart = agent.model ? ` ${dim(`[${agent.model}]`)}` : '';
    const descPart = agent.description ? `: ${agent.description}` : '';
    parts.push(`${yellow('◐')} ${cyan(agent.type)}${modelPart}${descPart} (${elapsed})`);
  }

  // Show recently completed agents (last 3)
  const recentCompleted = completedAgents
    .filter(a => a.endTime && Date.now() - a.endTime.getTime() < 60000) // Within last minute
    .slice(-3);

  for (const agent of recentCompleted) {
    const duration = agent.endTime && agent.startTime
      ? formatDuration(agent.endTime.getTime() - agent.startTime.getTime())
      : '';
    const descPart = agent.description ? `: ${truncate(agent.description, 30)}` : '';
    parts.push(`${green('✓')} ${agent.type}${descPart} (${duration})`);
  }

  if (parts.length === 0) {
    return null;
  }

  return parts.join('\n');
}

function formatElapsed(startTime: Date): string {
  const ms = Date.now() - startTime.getTime();
  return formatDuration(ms);
}

function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }
  const mins = Math.floor(ms / 60000);
  const secs = Math.round((ms % 60000) / 1000);
  return `${mins}m ${secs}s`;
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}
