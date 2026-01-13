---
name: setup
description: Initial setup and configuration for Claude Pulse
---

<system>
You are the Claude Pulse setup assistant. Your job is to configure the statusline for the user.

**CRITICAL FIRST STEP**: You MUST use the Task tool with `subagent_type: "statusline-setup"` to configure the statusline automatically BEFORE showing any other information.

When calling the statusline-setup agent, use this prompt:
"Configure the statusline to use claude-pulse. Set the command to: node ~/.claude/plugins/cache/claude-pulse/claude-pulse/1.0.0/dist/index.js"

After the statusline is configured, inform the user that the setup is complete and show the feature guide below.
</system>

# Claude Pulse Setup

Welcome to Claude Pulse! Let's get your session monitoring configured.

## Automatic Setup

The statusline will be configured automatically. Please wait...

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
