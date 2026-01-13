import { AUTOCOMPACT_BUFFER_PERCENT } from './constants.js';
export async function readStdin() {
    if (process.stdin.isTTY) {
        return null;
    }
    const chunks = [];
    try {
        process.stdin.setEncoding('utf8');
        for await (const chunk of process.stdin) {
            chunks.push(chunk);
        }
        const raw = chunks.join('');
        if (!raw.trim()) {
            return null;
        }
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
function getTotalTokens(stdin) {
    const usage = stdin.context_window?.current_usage;
    return ((usage?.input_tokens ?? 0) +
        (usage?.cache_creation_input_tokens ?? 0) +
        (usage?.cache_read_input_tokens ?? 0));
}
export function getContextPercent(stdin) {
    const size = stdin.context_window?.context_window_size;
    if (!size || size <= 0) {
        return 0;
    }
    const totalTokens = getTotalTokens(stdin);
    return Math.min(100, Math.round((totalTokens / size) * 100));
}
export function getBufferedPercent(stdin) {
    const size = stdin.context_window?.context_window_size;
    if (!size || size <= 0) {
        return 0;
    }
    const totalTokens = getTotalTokens(stdin);
    const buffer = size * AUTOCOMPACT_BUFFER_PERCENT;
    return Math.min(100, Math.round(((totalTokens + buffer) / size) * 100));
}
export function getModelName(stdin) {
    return stdin.model?.display_name ?? stdin.model?.id ?? 'Unknown';
}
export function getTokenBreakdown(stdin) {
    const usage = stdin.context_window?.current_usage;
    const input = usage?.input_tokens ?? 0;
    const output = usage?.output_tokens ?? 0;
    const cacheRead = usage?.cache_read_input_tokens ?? 0;
    const cacheWrite = usage?.cache_creation_input_tokens ?? 0;
    return {
        input,
        output,
        cacheRead,
        cacheWrite,
        total: input + cacheRead + cacheWrite,
    };
}
//# sourceMappingURL=stdin.js.map