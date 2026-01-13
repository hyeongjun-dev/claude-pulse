import { readStdin, getContextPercent, getBufferedPercent } from './stdin.js';
import { parseTranscript } from './transcript.js';
import { render } from './render/index.js';
import { countConfigs } from './config-reader.js';
import { getGitStatus } from './git.js';
import { getUsage } from './usage-api.js';
import { loadConfig } from './config.js';
import { calculateCost } from './cost-tracker.js';
import { calculateStats } from './session-stats.js';
import { checkContextAlert } from './context-alert.js';
import type { RenderContext } from './types.js';
import { fileURLToPath } from 'node:url';

export type MainDeps = {
  readStdin: typeof readStdin;
  parseTranscript: typeof parseTranscript;
  countConfigs: typeof countConfigs;
  getGitStatus: typeof getGitStatus;
  getUsage: typeof getUsage;
  loadConfig: typeof loadConfig;
  calculateCost: typeof calculateCost;
  calculateStats: typeof calculateStats;
  checkContextAlert: typeof checkContextAlert;
  render: typeof render;
  now: () => number;
  log: (...args: unknown[]) => void;
};

export async function main(overrides: Partial<MainDeps> = {}): Promise<void> {
  const deps: MainDeps = {
    readStdin,
    parseTranscript,
    countConfigs,
    getGitStatus,
    getUsage,
    loadConfig,
    calculateCost,
    calculateStats,
    checkContextAlert,
    render,
    now: () => Date.now(),
    log: console.log,
    ...overrides,
  };

  try {
    const stdin = await deps.readStdin();

    if (!stdin) {
      deps.log('[claude-pulse] Initializing...');
      return;
    }

    const transcriptPath = stdin.transcript_path ?? '';
    const transcript = await deps.parseTranscript(transcriptPath);

    const { claudeMdCount, rulesCount, mcpCount, hooksCount } = await deps.countConfigs(stdin.cwd);

    const config = await deps.loadConfig();

    const gitStatus = config.gitStatus.enabled
      ? await deps.getGitStatus(stdin.cwd)
      : null;

    // Only fetch usage if enabled in config
    const usageData = config.display.showUsage !== false
      ? await deps.getUsage()
      : null;

    const sessionDuration = formatSessionDuration(transcript.sessionStart, deps.now);

    // Extended: Calculate cost data
    const costData = deps.calculateCost(stdin, config);

    // Extended: Calculate session statistics
    const sessionStats = deps.calculateStats(transcript);

    // Extended: Check for context alerts
    const rawPercent = getContextPercent(stdin);
    const bufferedPercent = getBufferedPercent(stdin);
    const percent = config.display.autocompactBuffer === 'disabled' ? rawPercent : bufferedPercent;
    const contextAlert = deps.checkContextAlert(percent, config);

    const ctx: RenderContext = {
      stdin,
      transcript,
      claudeMdCount,
      rulesCount,
      mcpCount,
      hooksCount,
      sessionDuration,
      gitStatus,
      usageData,
      config,
      // Extended fields
      costData,
      sessionStats,
      contextAlert,
    };

    deps.render(ctx);
  } catch (error) {
    deps.log('[claude-pulse] Error:', error instanceof Error ? error.message : 'Unknown error');
  }
}

export function formatSessionDuration(sessionStart?: Date, now: () => number = () => Date.now()): string {
  if (!sessionStart) {
    return '';
  }

  const ms = now() - sessionStart.getTime();
  const mins = Math.floor(ms / 60000);

  if (mins < 1) return '<1m';
  if (mins < 60) return `${mins}m`;

  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  void main();
}
