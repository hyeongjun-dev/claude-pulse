import * as fs from 'node:fs';
import * as readline from 'node:readline';
export async function parseTranscript(transcriptPath) {
    const tools = [];
    const agents = [];
    let todos = [];
    let sessionStart;
    if (!transcriptPath || !fs.existsSync(transcriptPath)) {
        return { tools, agents, todos, sessionStart };
    }
    const toolMap = new Map();
    const agentMap = new Map();
    try {
        const fileStream = fs.createReadStream(transcriptPath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            if (!line.trim())
                continue;
            try {
                const parsed = JSON.parse(line);
                // Track session start from first timestamp
                if (parsed.timestamp && !sessionStart) {
                    sessionStart = new Date(parsed.timestamp);
                }
                const content = parsed.message?.content;
                if (!Array.isArray(content))
                    continue;
                for (const block of content) {
                    if (block.type === 'tool_use') {
                        const toolId = block.id ?? '';
                        const toolName = block.name ?? 'unknown';
                        const input = block.input ?? {};
                        // Extract target file for certain tools
                        let target;
                        if ('file_path' in input && typeof input.file_path === 'string') {
                            target = extractFileName(input.file_path);
                        }
                        else if ('path' in input && typeof input.path === 'string') {
                            target = extractFileName(input.path);
                        }
                        const entry = {
                            id: toolId,
                            name: toolName,
                            target,
                            status: 'running',
                            startTime: parsed.timestamp ? new Date(parsed.timestamp) : new Date(),
                        };
                        toolMap.set(toolId, entry);
                        // Handle Task tool for agents
                        if (toolName === 'Task' && 'subagent_type' in input) {
                            const agentEntry = {
                                id: toolId,
                                type: String(input.subagent_type ?? 'unknown'),
                                model: 'model' in input ? String(input.model) : undefined,
                                description: 'description' in input ? String(input.description) : undefined,
                                status: 'running',
                                startTime: parsed.timestamp ? new Date(parsed.timestamp) : new Date(),
                            };
                            agentMap.set(toolId, agentEntry);
                        }
                        // Handle TodoWrite tool
                        if (toolName === 'TodoWrite' && 'todos' in input && Array.isArray(input.todos)) {
                            todos = input.todos.map(t => ({
                                content: t.content ?? '',
                                status: t.status ?? 'pending',
                            }));
                        }
                    }
                    if (block.type === 'tool_result') {
                        const toolId = block.tool_use_id ?? '';
                        const tool = toolMap.get(toolId);
                        if (tool) {
                            tool.status = block.is_error ? 'error' : 'completed';
                            tool.endTime = parsed.timestamp ? new Date(parsed.timestamp) : new Date();
                            tool.duration = tool.endTime.getTime() - tool.startTime.getTime();
                        }
                        const agent = agentMap.get(toolId);
                        if (agent) {
                            agent.status = 'completed';
                            agent.endTime = parsed.timestamp ? new Date(parsed.timestamp) : new Date();
                        }
                    }
                }
            }
            catch {
                // Skip malformed lines
            }
        }
    }
    catch {
        // File read error, return empty data
    }
    return {
        tools: Array.from(toolMap.values()),
        agents: Array.from(agentMap.values()),
        todos,
        sessionStart,
    };
}
function extractFileName(filePath) {
    const parts = filePath.split(/[/\\]/);
    const fileName = parts[parts.length - 1];
    // Truncate long names
    if (fileName.length > 25) {
        return '...' + fileName.slice(-22);
    }
    return fileName;
}
//# sourceMappingURL=transcript.js.map