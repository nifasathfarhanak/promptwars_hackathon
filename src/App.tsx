import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { DocumentAnalyzer } from './components/DocumentAnalyzer';
import { ContractComparison } from './components/ContractComparison';
import { DocumentChat } from './components/DocumentChat';
import { ActionCenter } from './components/ActionCenter';
import { LegalGlossary } from './components/LegalGlossary';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import type { LegalDocument } from './types/legal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analyzer');
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument>(SAMPLE_DOCUMENTS[0]);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('lexiguard_gemini_key') || '');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('lexiguard_gemini_key', key);
  };

  return (
    <ErrorBoundary>
    <div className="app-container">
      {/* Skip to Content Link for Keyboard/Screen Reader Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Vertical Sidebar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={apiKey.trim().length > 0}
      />

      {/* Main Content Area */}
      <main id="main-content" className="main-content" role="main" aria-label="LexiGuard AI workspace">
        {/* Sample Document Selector Header Bar */}
        <div className="sample-bar">
          <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Selected Document Context:
          </div>
          <div className="sample-pills">
            {SAMPLE_DOCUMENTS.map((doc) => (
              <button
                key={doc.id}
                className={`sample-pill ${selectedDoc.id === doc.id ? 'active' : ''}`}
                onClick={() => setSelectedDoc(doc)}
                aria-label={`Select document: ${doc.title}`}
                aria-pressed={selectedDoc.id === doc.id}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'analyzer' && (
          <DocumentAnalyzer
            document={selectedDoc}
            onUpdateDocument={(updated) => setSelectedDoc(updated)}
          />
        )}

        {activeTab === 'comparison' && (
          <ContractComparison
            sampleDocs={SAMPLE_DOCUMENTS}
            currentDoc={selectedDoc}
          />
        )}

        {activeTab === 'chat' && (
          <DocumentChat
            document={selectedDoc}
            apiKey={apiKey}
          />
        )}

        {activeTab === 'action' && (
          <ActionCenter
            document={selectedDoc}
          />
        )}

        {activeTab === 'glossary' && (
          <LegalGlossary />
        )}
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
    </ErrorBoundary>
  );
};

export default App;
