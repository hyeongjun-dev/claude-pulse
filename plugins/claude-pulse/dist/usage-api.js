import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
const DEBUG = process.env.DEBUG?.includes('claude-pulse') || process.env.DEBUG === '*';
// Cache for usage data
let cachedUsage = null;
let cacheExpiry = 0;
const CACHE_SUCCESS_MS = 60_000; // 60 seconds
const CACHE_FAILURE_MS = 15_000; // 15 seconds
export async function getUsage() {
    const now = Date.now();
    // Return cached data if still valid
    if (cachedUsage && now < cacheExpiry) {
        return cachedUsage;
    }
    try {
        const credentials = readCredentials();
        if (!credentials?.claudeAiOauth?.accessToken) {
            if (DEBUG) {
                console.error('[claude-pulse:usage] No OAuth credentials found');
            }
            return null;
        }
        const planName = credentials.claudeAiOauth.subscriptionType ?? null;
        // API users don't have usage limits
        if (!planName) {
            return null;
        }
        const response = await fetchUsage(credentials.claudeAiOauth.accessToken);
        if (!response?.data) {
            cachedUsage = { planName, fiveHour: null, sevenDay: null, fiveHourResetAt: null, sevenDayResetAt: null, apiUnavailable: true };
            cacheExpiry = now + CACHE_FAILURE_MS;
            return cachedUsage;
        }
        const fiveHour = response.data.five_hour_window?.utilization ?? null;
        const sevenDay = response.data.seven_day_window?.utilization ?? null;
        const fiveHourResetAt = response.data.five_hour_window?.reset_at
            ? new Date(response.data.five_hour_window.reset_at)
            : null;
        const sevenDayResetAt = response.data.seven_day_window?.reset_at
            ? new Date(response.data.seven_day_window.reset_at)
            : null;
        cachedUsage = {
            planName,
            fiveHour: fiveHour !== null ? Math.round(fiveHour * 100) : null,
            sevenDay: sevenDay !== null ? Math.round(sevenDay * 100) : null,
            fiveHourResetAt,
            sevenDayResetAt,
        };
        cacheExpiry = now + CACHE_SUCCESS_MS;
        return cachedUsage;
    }
    catch (error) {
        if (DEBUG) {
            console.error('[claude-pulse:usage] Error fetching usage:', error);
        }
        cacheExpiry = now + CACHE_FAILURE_MS;
        return null;
    }
}
function readCredentials() {
    const homeDir = os.homedir();
    const credentialsPath = path.join(homeDir, '.claude', '.credentials.json');
    try {
        if (!fs.existsSync(credentialsPath)) {
            return null;
        }
        const content = fs.readFileSync(credentialsPath, 'utf-8');
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
async function fetchUsage(accessToken) {
    try {
        const response = await fetch('https://api.anthropic.com/api/oauth/usage', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            if (DEBUG) {
                console.error(`[claude-pulse:usage] API returned ${response.status}`);
            }
            return null;
        }
        return await response.json();
    }
    catch (error) {
        if (DEBUG) {
            console.error('[claude-pulse:usage] Fetch error:', error);
        }
        return null;
    }
}
//# sourceMappingURL=usage-api.js.map