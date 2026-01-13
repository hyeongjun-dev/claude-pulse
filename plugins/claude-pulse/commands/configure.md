---
name: configure
description: Customize Claude Pulse display options
allowed-tools: Read, Write, AskUserQuestion
---

# Claude Pulse Configuration

Customize your display to match your workflow.

## Display Options

### Presets

**Full** - Everything visible
```json
{
  "showCost": true,
  "showStats": true,
  "showTools": true,
  "showAgents": true,
  "showTodos": true
}
```

**Essential** - Key metrics only
```json
{
  "showCost": true,
  "showStats": true,
  "showTools": false,
  "showAgents": true,
  "showTodos": true
}
```

**Minimal** - Clean interface
```json
{
  "showCost": false,
  "showStats": false,
  "showTools": false,
  "showAgents": false,
  "showTodos": false
}
```

## Alert Settings

Configure when you want to be notified about context usage:

```json
{
  "alerts": {
    "enabled": true,
    "level": "critical",
    "soundEnabled": false
  }
}
```

Alert levels:
- `warning` - Show at 70%+ context
- `critical` - Show at 85%+ context (default)
- `danger` - Show at 95%+ context only

## Cost Settings

Configure cost tracking display:

```json
{
  "cost": {
    "enabled": true,
    "showBreakdown": true
  }
}
```

Options:
- `enabled` - Show/hide cost tracking
- `showBreakdown` - Show detailed token breakdown (input, output, cache)

## Apply Changes

Your configuration is saved automatically. Changes take effect on the next statusline update.

## Reset to Defaults

To reset all settings, delete the config file and restart:
```bash
rm ~/.claude/plugins/claude-pulse/config.json
```
