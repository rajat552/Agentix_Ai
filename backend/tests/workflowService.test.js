const workflowService = require('../src/services/workflowService');
const novaService = require('../src/services/novaService');
const Task = require('../src/models/Task');

// Mock Task.create to avoid DB hits
jest.mock('../src/models/Task');

describe('WorkflowService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('executeAgentWorkflow should return formatted result', async () => {
        const result = await workflowService.executeAgentWorkflow('test command');
        expect(result).toHaveProperty('reply');
        expect(result).toHaveProperty('logs');
        expect(Array.isArray(result.logs)).toBe(true);
    });

    test('executeAgentWorkflow should handle errors gracefully', async () => {
        // Mock a failure in novaService
        jest.spyOn(novaService, 'summarizeDocument').mockRejectedValue(new Error('Bedrock failed'));

        const result = await workflowService.executeAgentWorkflow('summarize document');
        expect(result.reply).toContain('Partial failure');
        expect(result.logs.some(l => l.status === 'warn')).toBe(true);
    });
});
