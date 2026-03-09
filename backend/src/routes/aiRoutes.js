const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Chat & Workflow
router.post('/chat', aiController.handleChat);

// Document Intelligence
router.post('/upload', upload.single('document'), aiController.handleUpload);

// Task Management
router.get('/tasks', aiController.getTasks);
router.post('/tasks', aiController.createTask);

module.exports = router;
