import { useState, useCallback } from 'react';
import { sendMessage as sendApiMessage } from '../services/api';

export const useChat = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Productivity Copilot. How can I help you today?' }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = useCallback(async (content) => {
        if (!content.trim()) return;

        const userMsg = { role: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const data = await sendApiMessage(content);
            const assistantMsg = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not reach the AI server.' }]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { messages, loading, sendMessage };
};
