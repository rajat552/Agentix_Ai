import { useState, useCallback, useEffect } from 'react';

export const useVoiceInput = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = 'en-US';

            rec.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (onResult) onResult(transcript);
                setIsListening(false);
            };

            rec.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            rec.onend = () => {
                setIsListening(false);
            };

            setRecognition(rec);
        }
    }, [onResult]);

    const toggleListening = useCallback(() => {
        if (!recognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    }, [recognition, isListening]);

    return { isListening, toggleListening, isSupported: !!recognition };
};
