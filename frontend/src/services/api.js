import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/ai';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const sendMessage = async (message) => {
    try {
        const response = await api.post('/chat', { message, userId: 'demo-user' });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    try {
        const response = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getTasks = async () => {
    // In a real app, this would fetch from /api/tasks
    // For now, we simulate a small delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Analyze Nova SDK', description: 'Review the latest Bedrock documentation', status: 'pending' },
                { id: 2, title: 'UI Refinement', description: 'Apply premium dark mode styles', status: 'completed' },
            ]);
        }, 500);
    });
};

export default {
    sendMessage,
    uploadDocument,
    getTasks,
};
