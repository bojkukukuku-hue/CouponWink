
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo của CouponWink. Tôi có thể giúp gì cho bạn trong việc tìm kiếm mã giảm giá AI và Hosting hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are a helpful and friendly AI assistant for 'CouponWink', an expert platform for AI tools (like Jasper, Copy.ai, Midjourney) and Hosting services (like Cloudways, Hostinger). Your goal is to help users find the best promo codes, explain tool features, and provide saving tips. Always be concise, professional, and enthusiastic about helping people save money. Use Vietnamese as the primary language.",
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Xin lỗi, tôi gặp chút trục trặc khi kết nối. Bạn có thể thử lại sau không?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Rất tiếc, hệ thống đang bận một chút. Bạn vui lòng thử lại trong giây lát!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary-500 p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-icons-round">smart_toy</span>
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">Wink Assist AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold opacity-80">Online & Sẵn sàng</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <span className="material-icons-round">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary-500 text-white rounded-tr-none shadow-md shadow-primary-500/10' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="size-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 disabled:text-slate-300 transition-colors"
              >
                <span className="material-icons-round">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 active:scale-95 ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-primary-500 hover:scale-110'
        }`}
      >
        <span className="material-icons-round text-3xl">
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>
    </div>
  );
};

export default Chatbot;
