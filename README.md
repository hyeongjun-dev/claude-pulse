# Claude Pulse

> **Feel the heartbeat of your Claude Code sessions.** Real-time cost tracking, session analytics, and smart context alerts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-v1.0.80+-purple.svg)](https://claude.ai/code)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## The Problem

Ever run a complex task in Claude Code and wonder:
- *"Is this going to cost me $5 or $50?"*
- *"Why is my context suddenly at 95%?"*
- *"Did that tool call fail, or is it still running?"*

**Claude Pulse** gives you complete visibility into your AI coding sessions.

---

## Features at a Glance

| Feature | What It Does |
|---------|--------------|
| **Real-time Cost Tracking** | See exactly how much you're spending, per-token breakdown |
| **Session Analytics** | Tool success rates, error tracking, performance metrics |
| **Smart Context Alerts** | Get warned before your context window fills up |
| **Activity Monitoring** | Track tools, agents, and todos in real-time |
| **Zero Config** | Works out of the box, customize when you want |

---

## Live Preview

```
[Opus | Pro] █████░░░░░ 45% | my-project git:(main*) | 2 CLAUDE.md | 5h: 25%
💰 Cost: $0.42 (in: 89k, out: 4.2k, cache: 156k)
📊 Tools: 47/49 (96%) | avg: 1.1s | top: Read:28, Edit:12
✓ Read ×28 | ✓ Edit ×12 | ✓ Grep ×7
◐ Task [Explore]: Analyzing authentication flow (45s)
▸ Implement OAuth integration (3/7)
⚠️ Context at 85% — Consider using /compact or starting a new session
```

---

## Quick Start

**3 commands. That's it.**

```bash
# 1. Add the marketplace
/plugin marketplace add hyeongjun-dev/claude-pulse

# 2. Install
/plugin install claude-pulse

# 3. Setup
/claude-pulse:setup
```

The pulse starts immediately. No restart required.

---

## Why I Built This

I've been using Claude Code daily for months. Great tool, but I had no visibility:
- No idea how much each session cost until the bill arrived
- Context would fill up without warning
- Couldn't tell if operations were succeeding or failing

So I built Claude Pulse — real-time monitoring for what matters.

---

## Feature Deep Dive

### Real-time Cost Tracking

Know exactly what you're spending:

```
💰 Cost: $0.42 (in: 89k, out: 4.2k, cache: 156k)
```

- Automatic model detection (Opus, Sonnet, Haiku)
- Detailed token breakdown (input, output, cache)

**Supported Models:**
| Model | Input | Output | Cache Read | Cache Write |
|-------|-------|--------|------------|-------------|
| Opus 4.5 | $15/M | $75/M | $1.50/M | $18.75/M |
| Sonnet 4 | $3/M | $15/M | $0.30/M | $3.75/M |
| Haiku 3.5 | $0.80/M | $4/M | $0.08/M | $1.00/M |

### Session Analytics

Track your productivity metrics:

```
📊 Tools: 47/49 (96%) | avg: 1.1s | top: Read:28, Edit:12
```

- Tool call success/failure rates
- Average operation duration
- Most-used tools ranking
- Error detection and tracking

### Smart Context Alerts

Never hit the context limit unexpectedly:

| Threshold | Alert Level | Action Suggested |
|-----------|-------------|------------------|
| 70% | Warning | "Consider summarizing soon" |
| 85% | Critical | "Use /compact or compress context" |
| 95% | Danger | "Immediate action required" |

Optional: Enable terminal bell sounds for critical alerts.

---

## Configuration

### Presets

Choose your starting point:

| Preset | Description |
|--------|-------------|
| **Full** | Everything on — cost, stats, alerts, all activity |
| **Essential** | Balanced — context, cost, key metrics |
| **Minimal** | Clean — just model and context percentage |

### Customize Anytime

```bash
/claude-pulse:configure
```

**All Options:**

```json
{
  "layout": "default",
  "display": {
    "showCost": true,
    "showStats": true,
    "showTools": true,
    "showAgents": true,
    "showTodos": true
  },
  "alerts": {
    "enabled": true,
    "level": "critical",
    "soundEnabled": false
  },
  "cost": {
    "enabled": true,
    "showBreakdown": true
  }
}
```

---

## Commands

| Command | Description |
|---------|-------------|
| `/claude-pulse:setup` | Initial setup and configuration |
| `/claude-pulse:configure` | Customize display options |
| `/claude-pulse:stats` | View detailed session statistics |

---

## Detailed Statistics

Run `/claude-pulse:stats` for a full breakdown:

```
╔══════════════════════════════════════════════════════╗
║           Claude Code Session Statistics             ║
╠══════════════════════════════════════════════════════╣
║  Session Duration:  1h 23m                           ║
║  Total Cost:        $2.47                            ║
║  Context Usage:     67% (134k / 200k tokens)         ║
╚══════════════════════════════════════════════════════╝

🔧 Tool Usage (127 calls)
  Read            ████████████████████  52 (41.0%)
  Edit            ████████████          24 (18.9%)
  Grep            ██████████            20 (15.7%)
  Success Rate:   97.6%
  Avg Duration:   892ms
```

---

## Requirements

- Claude Code v1.0.80 or later
- Node.js 18+ or Bun

---

## Development

```bash
# Clone
git clone https://github.com/hyeongjun-dev/claude-pulse
cd claude-pulse

# Install & Build
npm install
npm run build

# Test
echo '{"model":{"display_name":"Opus"},"context_window":{"current_usage":{"input_tokens":45000},"context_window_size":200000}}' | node dist/index.js
```

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ideas for contribution:**
- Additional currency support
- Custom alert sounds
- Export session reports
- Integration with other tools

---

## License

MIT — see [LICENSE](LICENSE)

---

## Star History

If this helps your workflow, consider giving it a star!

---

<p align="center">
  <b>Feel the pulse. Stay in control.</b><br>
  <sub>Built for developers who want visibility into their AI-assisted coding sessions.</sub>
</p>
