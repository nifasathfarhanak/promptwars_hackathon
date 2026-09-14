import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  FileText, 
  Link2
} from 'lucide-react';
import type { LegalDocument, ChatMessage } from '../types/legal';
import { queryDocumentAI } from '../services/aiLegalEngine';

interface DocumentChatProps {
  document: LegalDocument;
  apiKey?: string;
}

export const DocumentChat: React.FC<DocumentChatProps> = ({
  document,
  apiKey
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am **LexiGuard AI**. I have analyzed **"${document.title}"**.\n\nYou can ask me any question about your obligations, termination penalties, hidden fees, or risk points!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);

  const suggestedPrompts = [
    'Can the landlord increase my rent mid-lease?',
    'What happens if I terminate early?',
    'Are IP rights assigned to the company?',
    'Who is responsible for HVAC & plumbing repairs?'
  ];

  const handleSendQuestion = async (queryText: string) => {
    if (!queryText.trim() || isQuerying) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsQuerying(true);

    const aiMsg = await queryDocumentAI(document, queryText, apiKey);

    setMessages(prev => [...prev, aiMsg]);
    setIsQuerying(false);
  };

  return (
    <div className="card chat-window">
      <div className="card-header">
        <div className="card-title">
          <MessageSquare size={18} style={{ color: 'var(--brand-primary)' }} />
          <span>Ask Your Document — Grounded Q&A</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <FileText size={14} /> Grounded in: <strong>{document.title}</strong>
        </span>
      </div>

      {/* Suggested Prompt Chips */}
      <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.65rem 1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <Sparkles size={12} /> Suggested Queries:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            className="sample-pill"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            onClick={() => handleSendQuestion(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Window */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
            
            {/* Citations */}
            {msg.citations && msg.citations.length > 0 && (
              <div style={{ marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Link2 size={12} /> Document Source Citations:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.2rem' }}>
                  {msg.citations.map((c, i) => (
                    <span key={i} className="citation-chip" title={c.snippet}>
                      {c.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ fontSize: '0.68rem', opacity: 0.65, marginTop: '0.25rem', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              {msg.timestamp}
            </div>
          </div>
        ))}
        {isQuerying && (
          <div className="chat-bubble ai" style={{ opacity: 0.7 }}>
            <span>Searching contract clauses and phrasing response...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask a question about this contract (e.g. 'Can I terminate with 30 days notice?')..."
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion(inputQuestion)}
        />
        <button
          className="btn-primary"
          onClick={() => handleSendQuestion(inputQuestion)}
          disabled={!inputQuestion.trim() || isQuerying}
        >
          <Send size={15} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
