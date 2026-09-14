import React, { useState } from 'react';
import { Key, ShieldCheck, X } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) => {
  const [tempKey, setTempKey] = useState(apiKey);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(tempKey);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={20} style={{ color: 'var(--brand-primary)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Google Gemini API Settings</h3>
          </div>
          <button className="btn-secondary" style={{ padding: '0.2rem 0.4rem' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          LexiGuard AI includes a <strong>Built-in Zero-Setup NLP Engine</strong> that works 100% offline out-of-the-box.
          <br /><br />
          Optionally, enter your <strong>Google Gemini API Key</strong> below to unlock real-time live LLM inference for custom document questions.
        </p>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
            Gemini API Key:
          </label>
          <input
            type="password"
            className="chat-input"
            style={{ width: '100%' }}
            placeholder="AIzaSy..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
          />
        </div>

        <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
          <ShieldCheck size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '0.1rem' }} />
          <span>Your API key is stored strictly in your browser's local storage and is never sent to any central backend server.</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button className="btn-secondary" onClick={() => { onSaveApiKey(''); onClose(); }}>
            Clear Key (Use Fallback)
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};
