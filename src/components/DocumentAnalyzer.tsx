import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  RefreshCw, 
  Sliders, 
  Sparkles,
  Cpu
} from 'lucide-react';
import type { LegalDocument, ClauseAnalysis } from '../types/legal';
import { RiskRadar } from './RiskRadar';
import { analyzeDocumentHeuristic, analyzeDocumentWithGemini } from '../services/aiLegalEngine';

interface DocumentAnalyzerProps {
  document: LegalDocument;
  onUpdateDocument: (doc: LegalDocument) => void;
  apiKey?: string;
}

export const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({
  document,
  onUpdateDocument,
  apiKey
}) => {
  const [inputText, setInputText] = useState(document.content);
  const [docTitle, setDocTitle] = useState(document.title);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedClause, setSelectedClause] = useState<ClauseAnalysis | undefined>(undefined);
  const [readingLevel, setReadingLevel] = useState<'plain' | 'executive' | 'full'>('plain');
  const [analysisEngine, setAnalysisEngine] = useState<'gemini' | 'heuristic'>(
    apiKey && apiKey.trim().length > 10 ? 'gemini' : 'heuristic'
  );

  // Sync state if selected document prop changes
  React.useEffect(() => {
    setInputText(document.content);
    setDocTitle(document.title);
  }, [document]);

  // Keep analysisEngine in sync with apiKey changes
  React.useEffect(() => {
    if (apiKey && apiKey.trim().length > 10) {
      setAnalysisEngine('gemini');
    } else {
      setAnalysisEngine('heuristic');
    }
  }, [apiKey]);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      let newDoc: LegalDocument;
      if (analysisEngine === 'gemini' && apiKey && apiKey.trim().length > 10) {
        newDoc = await analyzeDocumentWithGemini(inputText, docTitle, apiKey);
      } else {
        await new Promise(resolve => setTimeout(resolve, 400));
        newDoc = analyzeDocumentHeuristic(inputText, docTitle);
      }
      onUpdateDocument(newDoc);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (text) {
        setInputText(text);
        setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
        setIsAnalyzing(true);
        try {
          let newDoc: LegalDocument;
          if (analysisEngine === 'gemini' && apiKey && apiKey.trim().length > 10) {
            newDoc = await analyzeDocumentWithGemini(text, file.name, apiKey);
          } else {
            newDoc = analyzeDocumentHeuristic(text, file.name);
          }
          onUpdateDocument(newDoc);
        } finally {
          setIsAnalyzing(false);
        }
      }
    };
    reader.readAsText(file);
  };

  const isGeminiActive = analysisEngine === 'gemini' && apiKey && apiKey.trim().length > 10;

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
                <span>{isAnalyzing ? (isGeminiActive ? 'Gemini Analyzing...' : 'Analyzing...') : 'Re-Analyze'}</span>
              </button>
            </div>
          </div>

          {/* AI Engine Toggle Banner */}
          <div style={{
            padding: '0.45rem 1rem',
            backgroundColor: isGeminiActive ? '#eff6ff' : '#f8fafc',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {isGeminiActive ? (
                <Sparkles size={13} style={{ color: '#2563eb' }} />
              ) : (
                <Cpu size={13} style={{ color: 'var(--text-muted)' }} />
              )}
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isGeminiActive ? '#1d4ed8' : 'var(--text-secondary)' }}>
                {isGeminiActive ? '✨ Gemini 1.5 Flash AI Engine' : '⚙️ Local Heuristic Engine'}
              </span>
              {isGeminiActive && (
                <span style={{ fontSize: '0.7rem', background: '#dbeafe', color: '#1e40af', borderRadius: '4px', padding: '0.1rem 0.4rem', fontWeight: 600 }}>
                  Live AI
                </span>
              )}
              {document.analyzedByGemini && (
                <span style={{ fontSize: '0.7rem', background: '#d1fae5', color: '#065f46', borderRadius: '4px', padding: '0.1rem 0.4rem', fontWeight: 600 }}>
                  Gemini Analyzed ✓
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                className={`sample-pill ${analysisEngine === 'gemini' ? 'active' : ''}`}
                onClick={() => setAnalysisEngine('gemini')}
                style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}
                title={isGeminiActive ? 'Using Gemini 1.5 Flash' : 'Add API key to activate Gemini'}
              >
                Gemini AI {!isGeminiActive && '(key required)'}
              </button>
              <button
                className={`sample-pill ${analysisEngine === 'heuristic' ? 'active' : ''}`}
                onClick={() => setAnalysisEngine('heuristic')}
                style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}
              >
                Offline NLP
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {document.analyzedByGemini && (
                <span style={{ fontSize: '0.7rem', background: '#eff6ff', color: '#2563eb', borderRadius: '4px', padding: '0.2rem 0.5rem', fontWeight: 700, border: '1px solid #bfdbfe' }}>
                  ✨ Gemini AI
                </span>
              )}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Updated {document.uploadedAt}
              </span>
            </div>
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
