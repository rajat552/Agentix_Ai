const novaService = require('../src/services/novaService');

describe('NovaService', () => {
    test('generateResponse should return a string', async () => {
        // Since we don't have AWS keys in test environment, it will return mock
        const response = await novaService.generateResponse('Hello');
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });

    test('summarizeDocument should contain mock prefix if no keys', async () => {
        const response = await novaService.summarizeDocument('Sample text');
        if (!process.env.AWS_ACCESS_KEY_ID) {
            expect(response).toContain('[MOCK');
        }
    });

    test('generateTasks should return an array', async () => {
        const tasks = await novaService.generateTasks('Sample text');
        expect(Array.isArray(tasks)).toBe(true);
        if (tasks.length > 0) {
            expect(tasks[0]).toHaveProperty('title');
        }
    });
});
