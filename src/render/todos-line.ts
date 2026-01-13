import type { RenderContext, TodoItem } from '../types.js';
import { green, yellow, cyan, dim, RESET } from './colors.js';

/**
 * Renders the todos progress line
 */
export function renderTodosLine(ctx: RenderContext): string | null {
  const todos = ctx.transcript.todos;

  if (todos.length === 0) {
    return null;
  }

  const completed = todos.filter(t => t.status === 'completed').length;
  const inProgress = todos.filter(t => t.status === 'in_progress');
  const pending = todos.filter(t => t.status === 'pending').length;
  const total = todos.length;

  const parts: string[] = [];

  // Show current in-progress task
  if (inProgress.length > 0) {
    const current = inProgress[0];
    parts.push(`${yellow('▸')} ${truncate(current.content, 40)}`);
  } else if (completed === total) {
    parts.push(`${green('✓')} All todos complete`);
  } else if (pending > 0) {
    const nextPending = todos.find(t => t.status === 'pending');
    if (nextPending) {
      parts.push(`${dim('○')} Next: ${truncate(nextPending.content, 35)}`);
    }
  }

  // Show progress counter
  const progressColor = completed === total ? green : (completed > 0 ? cyan : dim);
  parts.push(`${progressColor(`(${completed}/${total})`)}`);

  return parts.join(' ');
}

/**
 * Get todo statistics
 */
export function getTodoStats(todos: TodoItem[]): {
  completed: number;
  inProgress: number;
  pending: number;
  total: number;
  completionRate: number;
} {
  const completed = todos.filter(t => t.status === 'completed').length;
  const inProgress = todos.filter(t => t.status === 'in_progress').length;
  const pending = todos.filter(t => t.status === 'pending').length;
  const total = todos.length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return { completed, inProgress, pending, total, completionRate };
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}
