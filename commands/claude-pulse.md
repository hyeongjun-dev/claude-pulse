---
description: View real-time session statistics and cost tracking
---

# Claude Pulse - Session Dashboard

Your real-time session monitoring is active.

## Current Session Overview

Based on your session data, here's a detailed breakdown:

### Cost Analysis
- **Total Cost**: Calculated from input, output, and cache tokens
- **Token Breakdown**: Input tokens, output tokens, cache reads/writes
- **Model**: Automatically detected (Opus, Sonnet, Haiku)

### Tool Performance
- **Total Calls**: Number of tool invocations
- **Success Rate**: Percentage of successful operations
- **Average Duration**: Mean time per tool call
- **Most Used**: Top tools by frequency

### Context Usage
- **Current Usage**: Tokens used vs. available
- **Percentage**: Visual progress indicator
- **Trend**: Usage pattern over the session

## Dashboard Legend

```
╔══════════════════════════════════════════════════════╗
║           Claude Code Session Statistics             ║
╠══════════════════════════════════════════════════════╣
║  Session Duration:  Time since session start         ║
║  Total Cost:        Cumulative spending              ║
║  Context Usage:     Current / Maximum tokens         ║
╚══════════════════════════════════════════════════════╝

Tool Usage
  Read            ████████████████████  Most used tool
  Edit            ████████████          Second most used
  Grep            ██████████            Third most used
```

## Quick Commands

| Command | Description |
|---------|-------------|
| `/claude-pulse:configure` | Customize display settings |
| `/claude-pulse:stats` | Detailed statistics view |
| `/claude-pulse:setup` | Initial setup guide |

## Optimization Tips

### High Cost?
- Use Haiku for simple tasks
- Leverage cache tokens when possible
- Use /compact to reduce context

### Context Filling Up?
- Run /compact to summarize
- Start a new session for unrelated tasks
- Be specific in prompts to reduce back-and-forth

---
GitHub: https://github.com/hyeongjun-dev/claude-pulse
