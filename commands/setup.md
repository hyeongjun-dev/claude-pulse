---
description: Configure claude-pulse as your statusline
allowed-tools: Bash, Read, Edit, AskUserQuestion
---

**Note**: Placeholders like `{RUNTIME_PATH}`, `{SOURCE}`, and `{GENERATED_COMMAND}` should be substituted with actual detected values.

## Step 1: Detect Platform & Runtime

**macOS/Linux** (if `uname -s` returns "Darwin", "Linux", or a MINGW*/MSYS*/CYGWIN* variant):

> **Git Bash/MSYS2/Cygwin users on Windows**: Follow these macOS/Linux instructions, not the Windows section below. Your environment provides bash and Unix-like tools.

1. Get plugin path:
   ```bash
   ls -td ~/.claude/plugins/cache/claude-pulse/claude-pulse/*/ 2>/dev/null | head -1
   ```
   If empty, the plugin is not installed. **On Linux only** (if `uname -s` returns "Linux"), check for cross-device filesystem issue:
   ```bash
   [ "$(df --output=source ~/.claude /tmp 2>/dev/null | tail -2 | uniq | wc -l)" = "2" ] && echo "CROSS_DEVICE"
   ```
   If this outputs `CROSS_DEVICE`, explain that `/tmp` and `~/.claude` are on different filesystems, which causes `EXDEV: cross-device link not permitted` during installation. Provide the fix:
   ```bash
   mkdir -p ~/.cache/tmp && TMPDIR=~/.cache/tmp /plugin install claude-pulse
   ```
   After they run this, re-check the plugin path and continue setup. For non-Linux systems (macOS, etc.), simply tell user to install via marketplace first.

2. Get runtime absolute path (prefer bun for performance, fallback to node):
   ```bash
   command -v bun 2>/dev/null || command -v node 2>/dev/null
   ```

   If empty, stop and tell user to install Node.js or Bun.

3. Verify the runtime exists:
   ```bash
   ls -la {RUNTIME_PATH}
   ```
   If it doesn't exist, re-detect or ask user to verify their installation.

4. Determine source file based on runtime:
   ```bash
   basename {RUNTIME_PATH}
   ```
   If result is "bun", use `src/index.ts` (bun has native TypeScript support). Otherwise use `dist/index.js` (pre-compiled).

5. Generate command (quotes around runtime path handle spaces):
   ```
   bash -c '"{RUNTIME_PATH}" "$(ls -td ~/.claude/plugins/cache/claude-pulse/claude-pulse/*/ 2>/dev/null | head -1){SOURCE}"'
   ```

**Windows (native PowerShell, not Git Bash/WSL)**:

1. Get plugin path:
   ```powershell
   (Get-ChildItem "$env:USERPROFILE\.claude\plugins\cache\claude-pulse\claude-pulse" -Directory | Sort-Object LastWriteTime -Descending | Select-Object -First 1).FullName
   ```
   If empty, tell user to install via marketplace first.

2. Get runtime absolute path (prefer bun for performance, fallback to node):
   ```powershell
   (Get-Command bun -ErrorAction SilentlyContinue).Source ?? (Get-Command node -ErrorAction SilentlyContinue).Source
   ```
   If empty, stop and tell user to install Node.js or Bun.

3. Determine source file based on runtime:
   ```powershell
   (Get-Command bun -ErrorAction SilentlyContinue) -ne $null
   ```
   If true, use `src\index.ts`. Otherwise use `dist\index.js`.

4. Generate command (use & for invocation):
   ```powershell
   & "{RUNTIME_PATH}" "{PLUGIN_PATH}\{SOURCE}"
   ```

## Step 2: Test the Generated Command

**CRITICAL**: Before applying, run the generated command to verify it works.

**macOS/Linux**:
```bash
{GENERATED_COMMAND}
```

**Windows**:
```powershell
{GENERATED_COMMAND}
```

Expected output: The command should output the HUD text (showing context %, costs, etc.) and exit cleanly.

If it errors or hangs, troubleshoot before proceeding:
- "Cannot find module": Plugin path is wrong
- "command not found" / "is not recognized": Runtime path is wrong
- Hangs indefinitely: Try the other runtime (node ↔ bun)

## Step 3: Apply Statusline Configuration

Use the Edit tool to merge this into `~/.claude/settings.json` (macOS/Linux) or `%USERPROFILE%\.claude\settings.json` (Windows):

```json
{
  "statusLine": "{GENERATED_COMMAND}"
}
```

**Important**: Preserve existing settings - only add/update the `statusLine` key.

Updates are automatic - no need to re-run setup after plugin updates (the dynamic path detection handles version changes).

## Step 4: Verify It Works

Tell the user:
1. Start a new Claude Code session (or restart current one)
2. Look for the HUD appearing below the input field
3. The HUD should show: context %, cost tracking, tool activity

If the HUD doesn't appear:
- Check `~/.claude/settings.json` has the `statusLine` key
- Run the command manually to see any errors
- Ensure the plugin is installed: `ls ~/.claude/plugins/cache/claude-pulse/`

## Features Enabled

After setup completes, you'll have:

- **Real-time Cost Tracking**: See exactly how much you're spending per session
- **Session Analytics**: Tool success rates, error tracking, performance metrics
- **Smart Context Alerts**: Get warned at 70%, 85%, and 95% context usage
- **Activity Monitoring**: Track tools, agents, and todos in real-time

## Choose Your Preset

Select a display preset that matches your workflow:

| Preset | Description |
|--------|-------------|
| **Full** (Default) | Everything: cost, stats, tools, agents, todos, alerts |
| **Essential** | Balanced: context, cost, key metrics |
| **Minimal** | Clean: just model and context percentage |

## Commands

| Command | Description |
|---------|-------------|
| `/claude-pulse:configure` | Customize display settings |
| `/claude-pulse:stats` | View detailed session statistics |

## Need Help?

- GitHub: https://github.com/hyeongjun-dev/claude-pulse

Your pulse is ready. Happy coding!
