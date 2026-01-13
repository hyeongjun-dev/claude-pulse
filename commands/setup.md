---
name: setup
description: Initial setup and configuration for Claude Pulse
---

# Claude Pulse Setup

Welcome to Claude Pulse! Let's get your session monitoring configured.

## Quick Setup

The pulse is already active. You should see the statusline at the bottom of your terminal.

## Choose Your Preset

Select a display preset that matches your workflow:

### Full (Default)
Shows everything: cost, statistics, tools, agents, todos, and alerts.
Best for: Power users who want complete visibility.

### Essential
Shows: context usage, cost tracking, and key metrics.
Best for: Balanced information without clutter.

### Minimal
Shows: model name and context percentage only.
Best for: Clean interface, minimal distraction.

## Configuration

To customize your display, run:
```
/claude-pulse:configure
```

## Features Enabled

- **Cost Tracking**: Real-time cost calculation based on your model
- **Session Analytics**: Tool success rates and performance metrics
- **Context Alerts**: Warnings at 70%, 85%, and 95% context usage
- **Activity Monitoring**: Track tools, agents, and todos

## Need Help?

- Run `/claude-pulse:stats` for detailed session statistics
- Run `/claude-pulse:configure` to change settings
- Visit: https://github.com/hyeongjun-dev/claude-pulse

Your pulse is ready. Happy coding!
