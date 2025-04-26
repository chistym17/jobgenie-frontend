import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WSJob } from '../recommendations/page';

export interface Message {
    id: number;
    type: 'user' | 'bot';
    text: string;
}

interface ChatWidgetProps {
    selectedJob: WSJob | null;
}

function getJobTitle(job: WSJob) {
    return job["Job Title"] || "";
}
function getJobCompany(job: WSJob) {
    return job["Company Name"] || "";
}
function getMatchReasons(job: WSJob) {
    return job["Key Requirements"] || job["Bonus Skills"] || [];
}

export default function ChatWidget({ selectedJob }: ChatWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'bot',
            text: 'Hi there! I can help you find the perfect job. Ask me anything about the recommendations or how to improve your chances!'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (selectedJob) {
            handleJobSelected(selectedJob);
        }
    }, [selectedJob]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleJobSelected = (job: WSJob) => {
        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                type: 'user',
                text: `Selected job: "${getJobTitle(job)}" at ${getJobCompany(job)}`
            },
            {
                id: Date.now() + 1,
                type: 'bot',
                text: `Would you like to know why this is a good fit, or get suggestions to improve your application?`
            }
        ]);
        setShowQuickReplies(true);
    };

    const handleQuickReply = (text: string) => {
        setInputValue(text);
        setShowQuickReplies(false);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const userMessage: Message = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    type: 'bot',
                    text: 'Response from backend (implement real connection here).'
                }
            ]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl h-full flex flex-col overflow-hidden border border-blue-100">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between rounded-t-2xl shadow">
                <h3 className="font-semibold text-lg flex items-center">
                    <svg className="w-6 h-6 mr-2 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    Genie Assistant
                </h3>
            </div>

            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent" style={{ maxHeight: '500px' }}>
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl shadow-sm text-base font-medium ${message.type === 'user'
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-md'
                                    : 'bg-white border border-blue-100 text-blue-900 rounded-bl-md'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start mb-4"
                        >
                            <div className="bg-white border border-blue-100 text-blue-900 rounded-2xl px-5 py-3 flex items-center space-x-2 shadow-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-xs text-blue-400 ml-2">Genie is typing...</span>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </AnimatePresence>
            </div>

            {showQuickReplies && (
                <div className="flex gap-2 px-4 pb-2">
                    <button
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition"
                        onClick={() => handleQuickReply('Explain why this is a good fit')}
                    >
                        Explain why this is a good fit
                    </button>
                    <button
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition"
                        onClick={() => handleQuickReply('Suggest improvements for this job')}
                    >
                        Suggest improvements for this job
                    </button>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-blue-100 flex items-center gap-2 rounded-b-2xl">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 rounded-full px-5 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-blue-900 bg-blue-50 placeholder-blue-400"
                    placeholder="Type your question here..."
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition shadow"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </form>
        </div>
    );
}