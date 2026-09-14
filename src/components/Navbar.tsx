import React from 'react';
import { 
  Scale, 
  FileText, 
  GitCompare, 
  MessageSquare, 
  CheckSquare, 
  BookOpen, 
  Key, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenApiKeyModal: () => void;
  onOpenAlignmentModal?: () => void;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiKeyModal,
  onOpenAlignmentModal,
  hasApiKey
}) => {
  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
      {/* Branding */}
      <div className="sidebar-header">
        <a href="#" className="brand-logo" title="LexiGuard AI Home">
          <div className="brand-icon">
            <Scale size={22} />
          </div>
          <div>
            <span className="brand-title">LexiGuard AI</span>
            <span className="brand-tag" style={{ marginLeft: '0.3rem' }}>Legal</span>
          </div>
        </a>
      </div>

      {/* Disclaimer inside Sidebar */}
      <div className="disclaimer-sidebar" role="alert">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#92400e', marginBottom: '0.2rem' }}>
          <ShieldAlert size={14} />
          <strong style={{ fontSize: '0.8rem' }}>Informational Tool</strong>
        </div>
        LexiGuard AI simplifies document navigation. Not formal legal advice.
      </div>

      {/* Vertical Navigation Tabs */}
      <nav className="sidebar-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'analyzer'}
          className={`sidebar-tab-btn ${activeTab === 'analyzer' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyzer')}
        >
          <FileText size={18} />
          <span>Document Analyzer</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'comparison'}
          className={`sidebar-tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <GitCompare size={18} />
          <span>Compare Contracts</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'chat'}
          className={`sidebar-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={18} />
          <span>Ask Document</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'action'}
          className={`sidebar-tab-btn ${activeTab === 'action' ? 'active' : ''}`}
          onClick={() => setActiveTab('action')}
        >
          <CheckSquare size={18} />
          <span>Action & Lawyer Prep</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'glossary'}
          className={`sidebar-tab-btn ${activeTab === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveTab('glossary')}
        >
          <BookOpen size={18} />
          <span>Legalese Glossary</span>
        </button>
      </nav>

      {/* Sidebar Footer with Alignment Matrix & API Key Trigger */}
      <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {onOpenAlignmentModal && (
          <button 
            className="btn-secondary"
            onClick={onOpenAlignmentModal}
            title="Problem Statement Alignment Matrix"
            style={{ width: '100%', justifyContent: 'center', borderColor: '#bbf7d0', color: '#166534', backgroundColor: '#f0fdf4' }}
          >
            <Sparkles size={14} style={{ color: '#16a34a' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Alignment Matrix (7/7)</span>
          </button>
        )}

        <button 
          className="btn-secondary"
          onClick={onOpenApiKeyModal}
          title="Configure Gemini API Key"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Key size={14} />
          <span style={{ fontSize: '0.8rem' }}>{hasApiKey ? 'Gemini API Active' : 'Gemini API Settings'}</span>
        </button>
      </div>
    </aside>
  );
};
