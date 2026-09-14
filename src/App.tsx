import React, { useState, useCallback, Suspense, lazy } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import type { LegalDocument } from './types/legal';

// Code Splitting / Lazy Loading for optimal performance & efficiency
const DocumentAnalyzer = lazy(() => import('./components/DocumentAnalyzer').then(m => ({ default: m.DocumentAnalyzer })));
const ContractComparison = lazy(() => import('./components/ContractComparison').then(m => ({ default: m.ContractComparison })));
const DocumentChat = lazy(() => import('./components/DocumentChat').then(m => ({ default: m.DocumentChat })));
const ActionCenter = lazy(() => import('./components/ActionCenter').then(m => ({ default: m.ActionCenter })));
const LegalGlossary = lazy(() => import('./components/LegalGlossary').then(m => ({ default: m.LegalGlossary })));

// Accessible Loading Fallback Component
const ViewSkeleton: React.FC = () => (
  <div 
    role="status" 
    aria-label="Loading view content" 
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '32px 0',
      animation: 'pulse 1.5s ease-in-out infinite'
    }}
  >
    <div style={{ height: '32px', background: '#e2e8f0', borderRadius: '8px', width: '40%' }} />
    <div style={{ height: '140px', background: '#f1f5f9', borderRadius: '12px' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <div style={{ height: '180px', background: '#f1f5f9', borderRadius: '12px' }} />
      <div style={{ height: '180px', background: '#f1f5f9', borderRadius: '12px' }} />
    </div>
  </div>
);

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analyzer');
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument>(SAMPLE_DOCUMENTS[0]);
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('lexiguard_gemini_key') || '';
    } catch {
      return '';
    }
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  const handleSaveApiKey = useCallback((key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem('lexiguard_gemini_key', key);
    } catch (e) {
      console.warn('LocalStorage unavailable for API key persistence', e);
    }
  }, []);

  const handleUpdateDocument = useCallback((updated: LegalDocument) => {
    setSelectedDoc(updated);
  }, []);

  const handleSelectDoc = useCallback((doc: LegalDocument) => {
    setSelectedDoc(doc);
  }, []);

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
            <div className="sample-pills" role="tablist" aria-label="Sample Legal Documents">
              {SAMPLE_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  className={`sample-pill ${selectedDoc.id === doc.id ? 'active' : ''}`}
                  onClick={() => handleSelectDoc(doc)}
                  aria-label={`Select document: ${doc.title}`}
                  aria-pressed={selectedDoc.id === doc.id}
                  role="tab"
                  aria-selected={selectedDoc.id === doc.id}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          </div>

          <Suspense fallback={<ViewSkeleton />}>
            {activeTab === 'analyzer' && (
              <DocumentAnalyzer
                document={selectedDoc}
                onUpdateDocument={handleUpdateDocument}
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
          </Suspense>
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
