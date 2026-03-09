import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import VoiceInput from './VoiceInput';
import { useChat } from '../hooks/useChat';

const ChatWindow = () => {
    const { messages, loading, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] glass-card overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} {...msg} />
                ))}
                {loading && (
                    <div className="flex justify-start mb-6">
                        <div className="flex items-center gap-3 p-4 bg-card-bg border border-border-subtle rounded-3xl shadow-sm">
                            <Loader2 className="animate-spin text-secondary" size={20} />
                            <span className="text-sm text-text-muted">Nova is thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-app-bg/50 border-t border-border-subtle transition-colors duration-300">
                <div className="flex items-center gap-3 bg-card-bg border border-border-subtle rounded-2xl p-2 focus-within:border-primary/50 transition-all shadow-sm">
                    <VoiceInput onResult={(transcript) => sendMessage(transcript)} />

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your command..."
                        className="flex-1 bg-transparent border-none focus:outline-none px-4 text-text-main text-sm resize-none py-2 max-h-32 min-h-[40px] placeholder:text-text-muted/50"
                        rows={1}
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="p-3 bg-primary text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
