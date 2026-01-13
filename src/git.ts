import { execSync } from 'node:child_process';

export interface GitStatus {
  branch: string;
  isDirty: boolean;
  ahead: number;
  behind: number;
}

export async function getGitStatus(cwd?: string): Promise<GitStatus | null> {
  if (!cwd) {
    return null;
  }

  try {
    // Check if in a git repo
    execSync('git rev-parse --git-dir', {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
    });

    // Get branch name
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
    }).trim();

    // Check if dirty
    const statusOutput = execSync('git status --porcelain', {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
    });
    const isDirty = statusOutput.trim().length > 0;

    // Get ahead/behind count
    let ahead = 0;
    let behind = 0;
    try {
      const aheadBehind = execSync('git rev-list --left-right --count @{u}...HEAD', {
        cwd,
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf-8',
      }).trim();
      const [behindStr, aheadStr] = aheadBehind.split('\t');
      behind = parseInt(behindStr, 10) || 0;
      ahead = parseInt(aheadStr, 10) || 0;
    } catch {
      // No upstream tracking, ignore
    }

    return { branch, isDirty, ahead, behind };
  } catch {
    return null;
  }
}
