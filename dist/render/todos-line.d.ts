import type { RenderContext, TodoItem } from '../types.js';
/**
 * Renders the todos progress line
 */
export declare function renderTodosLine(ctx: RenderContext): string | null;
/**
 * Get todo statistics
 */
export declare function getTodoStats(todos: TodoItem[]): {
    completed: number;
    inProgress: number;
    pending: number;
    total: number;
    completionRate: number;
};
//# sourceMappingURL=todos-line.d.ts.map