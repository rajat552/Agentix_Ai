const workflowService = require('../services/workflowService');
const Task = require('../models/Task');
const pdf = require('pdf-parse');

exports.handleChat = async (req, res, next) => {
    const { message } = req.body;
    try {
        const result = await workflowService.executeAgentWorkflow(message);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.handleUpload = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        let text = '';
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(req.file.buffer);
            text = data.text;
        } else {
            text = req.file.buffer.toString();
        }

        // Default agent behavior for uploads: Summarize and Extract Tasks
        const result = await workflowService.executeAgentWorkflow("Analyze this document and create tasks", text);

        res.json({
            filename: req.file.originalname,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};
