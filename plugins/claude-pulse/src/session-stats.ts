import type { TranscriptData, SessionStats, ToolEntry } from './types.js';

/**
 * Calculate session statistics from transcript data
 */
export function calculateStats(transcript: TranscriptData): SessionStats {
  const tools = transcript.tools;
  const agents = transcript.agents;
  const todos = transcript.todos;

  // Tool statistics
  const totalToolCalls = tools.length;
  const completedToolCalls = tools.filter(t => t.status === 'completed').length;
  const errorToolCalls = tools.filter(t => t.status === 'error').length;
  const errorRate = totalToolCalls > 0 ? (errorToolCalls / totalToolCalls) * 100 : 0;

  // Calculate average tool duration
  const completedWithDuration = tools.filter(t =>
    t.status === 'completed' && t.endTime && t.startTime
  );
  const avgToolDuration = completedWithDuration.length > 0
    ? completedWithDuration.reduce((sum, t) => {
        const duration = t.endTime!.getTime() - t.startTime.getTime();
        return sum + duration;
      }, 0) / completedWithDuration.length
    : 0;

  // Most used tools
  const toolCounts = new Map<string, number>();
  for (const tool of tools) {
    const count = toolCounts.get(tool.name) ?? 0;
    toolCounts.set(tool.name, count + 1);
  }

  // Sort by count descending
  const sortedTools = new Map(
    [...toolCounts.entries()].sort((a, b) => b[1] - a[1])
  );

  // Agent statistics
  const totalAgentCalls = agents.length;

  // Todo statistics
  const completedTodos = todos.filter(t => t.status === 'completed').length;
  const totalTodos = todos.length;
  const todoCompletionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return {
    totalToolCalls,
    completedToolCalls,
    errorToolCalls,
    errorRate,
    avgToolDuration,
    mostUsedTools: sortedTools,
    totalAgentCalls,
    todoCompletionRate,
  };
}

/**
 * Format session statistics for display
 */
export function formatStats(stats: SessionStats): string {
  const parts: string[] = [];

  // Tool stats
  if (stats.totalToolCalls > 0) {
    parts.push(`Tools: ${stats.completedToolCalls}/${stats.totalToolCalls}`);

    if (stats.errorToolCalls > 0) {
      parts.push(`Errors: ${stats.errorToolCalls} (${stats.errorRate.toFixed(1)}%)`);
    }
  }

  // Average duration
  if (stats.avgToolDuration > 0) {
    const avgMs = Math.round(stats.avgToolDuration);
    if (avgMs >= 1000) {
      parts.push(`Avg: ${(avgMs / 1000).toFixed(1)}s`);
    } else {
      parts.push(`Avg: ${avgMs}ms`);
    }
  }

  // Agent stats
  if (stats.totalAgentCalls > 0) {
    parts.push(`Agents: ${stats.totalAgentCalls}`);
  }

  // Todo completion
  if (stats.todoCompletionRate > 0) {
    parts.push(`Todos: ${stats.todoCompletionRate.toFixed(0)}%`);
  }

  return parts.join(' | ');
}

/**
 * Get top N most used tools
 */
export function getTopTools(stats: SessionStats, n: number = 3): Array<{ name: string; count: number }> {
  const result: Array<{ name: string; count: number }> = [];
  let count = 0;

  for (const [name, toolCount] of stats.mostUsedTools) {
    if (count >= n) break;
    result.push({ name, count: toolCount });
    count++;
  }

  return result;
}

/**
 * Calculate running tools and their elapsed time
 */
export function getRunningToolsInfo(tools: ToolEntry[]): {
  count: number;
  oldest: { name: string; elapsed: number } | null;
} {
  const runningTools = tools.filter(t => t.status === 'running');
  const count = runningTools.length;

  if (count === 0) {
    return { count: 0, oldest: null };
  }

  const oldest = runningTools.reduce((prev, curr) =>
    curr.startTime < prev.startTime ? curr : prev
  );

  const elapsed = Date.now() - oldest.startTime.getTime();

  return {
    count,
    oldest: { name: oldest.name, elapsed },
  };
}
