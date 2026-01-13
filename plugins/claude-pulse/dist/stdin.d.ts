import type { StdinData } from './types.js';
export declare function readStdin(): Promise<StdinData | null>;
export declare function getContextPercent(stdin: StdinData): number;
export declare function getBufferedPercent(stdin: StdinData): number;
export declare function getModelName(stdin: StdinData): string;
export declare function getTokenBreakdown(stdin: StdinData): {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    total: number;
};
//# sourceMappingURL=stdin.d.ts.map