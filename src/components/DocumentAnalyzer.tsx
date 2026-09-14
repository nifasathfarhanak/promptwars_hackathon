import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  RefreshCw, 
  Sliders, 
  Sparkles 
} from 'lucide-react';
import type { LegalDocument, ClauseAnalysis } from '../types/legal';
import { RiskRadar } from './RiskRadar';
import { analyzeDocumentHeuristic } from '../services/aiLegalEngine';

interface DocumentAnalyzerProps {
  document: LegalDocument;
  onUpdateDocument: (doc: LegalDocument) => void;
}

export const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({
  document,
  onUpdateDocument
}) => {
  const [inputText, setInputText] = useState(document.content);
  const [docTitle, setDocTitle] = useState(document.title);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedClause, setSelectedClause] = useState<ClauseAnalysis | undefined>(undefined);
  const [readingLevel, setReadingLevel] = useState<'plain' | 'executive' | 'full'>('plain');

  // Sync state if selected document prop changes
  React.useEffect(() => {
    setInputText(document.content);
    setDocTitle(document.title);
  }, [document]);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const newDoc = analyzeDocumentHeuristic(inputText, docTitle);
      onUpdateDocument(newDoc);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setInputText(text);
        setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
        const newDoc = analyzeDocumentHeuristic(text, file.name);
        onUpdateDocument(newDoc);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="document-analyzer-container">
      <div className="grid-layout">
        {/* Left Column: Document Editor / Input */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} style={{ color: 'var(--brand-primary)' }} />
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: '1px solid transparent',
                  padding: '0.2rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none',
                  backgroundColor: 'transparent'
                }}
                className="hover:border-slate-300 focus:border-blue-500"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                <Upload size={14} />
                <span>Upload File</span>
                <input
                  type="file"
                  accept=".txt,.md,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                className="btn-primary"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Sparkles size={14} />
                )}
                <span>{isAnalyzing ? 'Analyzing...' : 'Re-Analyze'}</span>
              </button>
            </div>
          </div>

          <div className="card-body document-editor-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {inputText.split('\n').length} Lines • {inputText.length} Characters
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
                <Sliders size={13} style={{ color: 'var(--text-muted)' }} />
                <span style={{ color: 'var(--text-muted)' }}>Mode:</span>
                <button
                  className={`sample-pill ${readingLevel === 'plain' ? 'active' : ''}`}
                  onClick={() => setReadingLevel('plain')}
                  style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem' }}
                >
                  Plain-English
                </button>
                <button
                  className={`sample-pill ${readingLevel === 'executive' ? 'active' : ''}`}
                  onClick={() => setReadingLevel('executive')}
                  style={{ padding: '0.15rem 0.4rem', fontSize: '0.75rem' }}
                >
                  Executive
                </button>
              </div>
            </div>

            <textarea
              className="document-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste contract text, lease agreement, employment agreement, or NDA here..."
            />
          </div>
        </div>

        {/* Right Column: AI Risk Radar & Analysis Drawer */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Sparkles size={18} style={{ color: 'var(--brand-primary)' }} />
              <span>AI Analysis Dashboard</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Updated {document.uploadedAt}
            </span>
          </div>

          <div className="card-body">
            <RiskRadar
              document={document}
              selectedClauseId={selectedClause?.id}
              onSelectClause={(c) => setSelectedClause(c)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
