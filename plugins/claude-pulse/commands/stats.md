---
name: stats
description: View detailed session statistics
---

# Claude Pulse - Session Statistics

View comprehensive analytics for your current session.

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

## Reading the Dashboard

```
╔══════════════════════════════════════════════════════╗
║           Claude Code Session Statistics             ║
╠══════════════════════════════════════════════════════╣
║  Session Duration:  Time since session start         ║
║  Total Cost:        Cumulative spending              ║
║  Context Usage:     Current / Maximum tokens         ║
╚══════════════════════════════════════════════════════╝

🔧 Tool Usage
  Read            ████████████████████  Most used tool
  Edit            ████████████          Second most used
  Grep            ██████████            Third most used
```

## Tips for Optimization

### High Cost?
- Use Haiku for simple tasks
- Leverage cache tokens when possible
- Use /compact to reduce context

### High Error Rate?
- Check file paths for typos
- Verify permissions on target files
- Review failed tool output for details

### Context Filling Up?
- Run /compact to summarize
- Start a new session for unrelated tasks
- Be specific in prompts to reduce back-and-forth

## Export Data

Session data is stored in your conversation transcript. Access it at:
```
~/.claude/conversations/
```
