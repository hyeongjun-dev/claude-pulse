// ANSI color codes
export const RESET = '\x1b[0m';
export const BOLD = '\x1b[1m';
export const DIM = '\x1b[2m';
// Foreground colors
export const FG_RED = '\x1b[31m';
export const FG_GREEN = '\x1b[32m';
export const FG_YELLOW = '\x1b[33m';
export const FG_BLUE = '\x1b[34m';
export const FG_MAGENTA = '\x1b[35m';
export const FG_CYAN = '\x1b[36m';
export const FG_WHITE = '\x1b[37m';
export const FG_GRAY = '\x1b[90m';
// Background colors
export const BG_RED = '\x1b[41m';
export const BG_GREEN = '\x1b[42m';
export const BG_YELLOW = '\x1b[43m';
// Color functions
export function red(text) {
    return `${FG_RED}${text}${RESET}`;
}
export function green(text) {
    return `${FG_GREEN}${text}${RESET}`;
}
export function yellow(text) {
    return `${FG_YELLOW}${text}${RESET}`;
}
export function blue(text) {
    return `${FG_BLUE}${text}${RESET}`;
}
export function magenta(text) {
    return `${FG_MAGENTA}${text}${RESET}`;
}
export function cyan(text) {
    return `${FG_CYAN}${text}${RESET}`;
}
export function dim(text) {
    return `${DIM}${text}${RESET}`;
}
export function bold(text) {
    return `${BOLD}${text}${RESET}`;
}
export function gray(text) {
    return `${FG_GRAY}${text}${RESET}`;
}
// Get color based on context percentage
export function getContextColor(percent) {
    if (percent >= 85)
        return FG_RED;
    if (percent >= 70)
        return FG_YELLOW;
    return FG_GREEN;
}
// Get colored progress bar
export function coloredBar(percent, width = 10) {
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;
    const color = getContextColor(percent);
    const filledStr = '█'.repeat(filled);
    const emptyStr = '░'.repeat(empty);
    return `${color}${filledStr}${DIM}${emptyStr}${RESET}`;
}
// Alert-specific colors
export function alertColor(level) {
    switch (level) {
        case 'danger':
            return `${BG_RED}${FG_WHITE}${BOLD}`;
        case 'critical':
            return `${FG_RED}${BOLD}`;
        case 'warning':
            return `${FG_YELLOW}`;
        default:
            return '';
    }
}
// Cost color based on USD amount
export function getCostColor(cost) {
    if (cost >= 1)
        return FG_RED;
    if (cost >= 0.1)
        return FG_YELLOW;
    return FG_GREEN;
}
//# sourceMappingURL=colors.js.map