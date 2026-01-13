# Contributing to Claude Pulse

First off, thank you for considering contributing!

This project welcomes contributions from everyone. Whether you're fixing a typo, adding a feature, or improving documentation — your help is appreciated.

## Quick Links

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Issue Tracker](https://github.com/hyeongjun-dev/claude-pulse/issues)
- [Pull Requests](https://github.com/hyeongjun-dev/claude-pulse/pulls)

## How Can I Contribute?

### Reporting Bugs

Found a bug? Please open an issue with:

1. **Clear title** describing the problem
2. **Steps to reproduce** the issue
3. **Expected behavior** vs. what actually happened
4. **Your environment**: Claude Code version, Node.js version, OS

### Suggesting Features

Have an idea? Open an issue with:

1. **Use case**: What problem does this solve?
2. **Proposed solution**: How should it work?
3. **Alternatives considered**: Other approaches you thought of

### Pull Requests

Ready to code? Here's the workflow:

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear, atomic commits
4. **Test** your changes:
   ```bash
   npm run build
   npm test
   ```
5. **Push** to your fork
6. **Open a PR** with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/claude-pulse
cd claude-pulse

# Install dependencies
npm install

# Build
npm run build

# Watch mode for development
npm run dev

# Test with sample data
echo '{"model":{"display_name":"Opus"},"context_window":{"current_usage":{"input_tokens":45000},"context_window_size":200000}}' | node dist/index.js
```

## Code Style

- **TypeScript**: Use strict types, avoid `any`
- **Formatting**: Code is auto-formatted on commit
- **Naming**: Use clear, descriptive names
- **Comments**: Only when the "why" isn't obvious

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add EUR currency support
fix: correct token calculation for cache reads
docs: update installation instructions
chore: bump TypeScript version
```

## Areas Looking for Help

- Additional currency support
- Custom color schemes / themes
- Export session data
- More test coverage
- Documentation and tutorials

## Questions?

Feel free to open an issue or reach out on [LinkedIn](https://www.linkedin.com/in/hyeongjun-yu-dev).

---

Thanks for helping make Claude Pulse better!
