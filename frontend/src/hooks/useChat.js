import { useState, useCallback, useEffect } from 'react';
import { sendMessage as sendApiMessage, getHistory } from '../services/api';

export const useChat = () => {
    const defaultMessage = { role: 'assistant', content: 'Hello! I am your AI Productivity Copilot. How can I help you today?' };
    const [messages, setMessages] = useState([defaultMessage]);
    const [loading, setLoading] = useState(false);

    // History loading removed. Chat starts completely fresh upon refresh.

    const sendMessage = useCallback(async (content) => {
        if (!content.trim()) return null;

        const userMsg = { role: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const data = await sendApiMessage(content);
            const assistantMsg = { role: 'assistant', content: data.reply };
            setMessages(prev => [...prev, assistantMsg]);
            return data;
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not reach the AI server.' }]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { messages, loading, sendMessage };
};
