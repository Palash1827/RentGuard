import { Bot, Send } from "lucide-react";
import { useState } from "react";
import { api } from "../services/api";

function AIChat() {
  const [message, setMessage] = useState(""); const [messages, setMessages] = useState([]); const [sending, setSending] = useState(false);
  const sendMessage = async () => { if (!message.trim() || sending) return; const text = message.trim(); setMessage(""); setMessages((prev) => [...prev, { type: "user", text }]); setSending(true); try { const result = await api.aiChat(text); setMessages((prev) => [...prev, { type: "ai", text: result.reply }]); } catch (e) { setMessages((prev) => [...prev, { type: "ai", text: e.message || "AI service unavailable." }]); } finally { setSending(false); } };
  return <div className="ai-chat"><div className="ai-header"><div className="ai-avatar"><Bot /></div><div><strong>RentGuard AI</strong><span>Rental Assistant</span></div></div><div className="messages">{messages.length === 0 && <div className="ai-welcome"><Bot size={40} /><h2>How can I help?</h2><p>Ask me about repairs, rent, deposits or agreements.</p></div>}{messages.map((item, index) => <div key={index} className={`message ${item.type}`}>{item.text}</div>)}</div><div className="ai-input"><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Describe your rental problem..." /><button onClick={sendMessage} disabled={sending}><Send size={18} /></button></div></div>;
}
export default AIChat;
