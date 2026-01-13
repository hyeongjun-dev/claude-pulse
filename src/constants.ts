// Autocompact buffer percentage (Claude Code reserves ~5% for autocompact)
export const AUTOCOMPACT_BUFFER_PERCENT = 0.05;

// Context alert thresholds
export const CONTEXT_WARNING_THRESHOLD = 70;
export const CONTEXT_CRITICAL_THRESHOLD = 85;
export const CONTEXT_DANGER_THRESHOLD = 95;

// Cost per 1M tokens (USD) - Anthropic pricing as of 2025
export const MODEL_PRICING: Record<string, { input: number; output: number; cacheRead: number; cacheWrite: number }> = {
  // Claude 4 Opus
  'claude-opus-4-5-20251101': { input: 15.0, output: 75.0, cacheRead: 1.5, cacheWrite: 18.75 },
  'opus': { input: 15.0, output: 75.0, cacheRead: 1.5, cacheWrite: 18.75 },
  'Opus': { input: 15.0, output: 75.0, cacheRead: 1.5, cacheWrite: 18.75 },

  // Claude 4 Sonnet
  'claude-sonnet-4-20250514': { input: 3.0, output: 15.0, cacheRead: 0.3, cacheWrite: 3.75 },
  'sonnet': { input: 3.0, output: 15.0, cacheRead: 0.3, cacheWrite: 3.75 },
  'Sonnet': { input: 3.0, output: 15.0, cacheRead: 0.3, cacheWrite: 3.75 },

  // Claude 3.5 Haiku
  'claude-3-5-haiku-20241022': { input: 0.8, output: 4.0, cacheRead: 0.08, cacheWrite: 1.0 },
  'haiku': { input: 0.8, output: 4.0, cacheRead: 0.08, cacheWrite: 1.0 },
  'Haiku': { input: 0.8, output: 4.0, cacheRead: 0.08, cacheWrite: 1.0 },

  // Default fallback (Sonnet pricing)
  'default': { input: 3.0, output: 15.0, cacheRead: 0.3, cacheWrite: 3.75 },
};

// Alert messages
export const ALERT_MESSAGES = {
  warning: {
    message: 'Context usage reaching limit',
    suggestion: 'Consider summarizing or starting a new session soon',
  },
  critical: {
    message: 'High context usage',
    suggestion: 'Summarize conversation or compress context now',
  },
  danger: {
    message: 'Context almost full!',
    suggestion: 'Immediate action required: /compact or start new session',
  },
};
