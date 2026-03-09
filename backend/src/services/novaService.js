const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

/**
 * Nova Service handles all direct interactions with Amazon Bedrock.
 * It uses Nova 2 Lite for fast, efficient reasoning and task planning.
 */
class NovaService {
    constructor() {
        this.client = new BedrockRuntimeClient({
            region: process.env.AWS_REGION || "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.modelId = process.env.NOVA_MODEL_LITE || "amazon.nova-lite-v1";
    }

    /**
     * Core function to invoke Nova model
     */
    async invokeNova(prompt, systemPrompt = "You are an AI Productivity Copilot.") {
        // If keys are missing, return mock data for hackathon development
        if (!process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID.includes('your_')) {
            console.warn("AWS Credentials missing. Returning mock response.");
            return this.getMockResponse(prompt);
        }

        const payload = {
            inferenceConfig: {
                max_new_tokens: 2000,
                temperature: 0.7,
                top_p: 0.9,
            },
            messages: [{ role: "user", content: [{ text: prompt }] }],
            system: [{ text: systemPrompt }]
        };

        try {
            const command = new InvokeModelCommand({
                modelId: this.modelId,
                contentType: "application/json",
                accept: "application/json",
                body: JSON.stringify(payload),
            });

            const response = await this.client.send(command);
            const responseBody = JSON.parse(new TextDecoder().decode(response.body));
            return responseBody.output.message.content[0].text;
        } catch (error) {
            console.error("Bedrock API Error:", error);
            throw new Error("Failed to communicate with Amazon Nova");
        }
    }

    async generateResponse(prompt) {
        return this.invokeNova(prompt);
    }

    async summarizeDocument(text) {
        const prompt = `Summarize the following document content concisely, highlighting key insights:\n\n${text}`;
        return this.invokeNova(prompt, "You are an expert document analyst.");
    }

    async generateTasks(text) {
        const prompt = `Based on the following content, extract actionable tasks. 
    Return them as a JSON array of objects with 'title' and 'description'.
    Content: ${text}`;
        const response = await this.invokeNova(prompt, "You are a task management specialist. Always respond with valid JSON.");

        try {
            // Extract JSON array from response
            const jsonStr = response.match(/\[.*\]/s)?.[0] || response;
            return JSON.parse(jsonStr);
        } catch (e) {
            return [{ title: "Analyze content", description: "Review provided information for action items" }];
        }
    }

    /**
     * Nova Reasoning for workflow planning
     */
    async planWorkflow(command) {
        const prompt = `Analyze this user command: "${command}". 
    Identify if it requires: 'summarization', 'task_generation', or 'general_chat'.
    Determine the steps to execute.`;
        return this.invokeNova(prompt, "You are a workflow architect.");
    }

    getMockResponse(prompt) {
        if (prompt.toLowerCase().includes('summarize')) {
            return "This document discusses the implementation of AI agents using Amazon Nova models. It highlights the benefits of low-latency reasoning and multi-step workflow automation.";
        }
        return "I've analyzed your request. I can help you summarize documents, plan your schedule, and manage tasks efficiently.";
    }
}

module.exports = new NovaService();
