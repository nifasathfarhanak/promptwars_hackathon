import React, { useState } from 'react';
import { BookOpen, Search, AlertTriangle } from 'lucide-react';
import { LEGAL_GLOSSARY } from '../data/legalGlossary';

export const LegalGlossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(LEGAL_GLOSSARY.map(g => g.category)))];

  const filteredTerms = LEGAL_GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.plainDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <BookOpen size={18} style={{ color: 'var(--brand-primary)' }} />
          <span>Interactive Legalese Glossary & Plain-English Dictionary</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {LEGAL_GLOSSARY.length} Legal Concepts Explained Simply
        </span>
      </div>

      <div className="card-body">
        {/* Search & Category Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search legal terms (e.g. Indemnification, Force Majeure, Arbitration)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sample-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                    {item.term}
                  </h3>
                  <span className="sample-pill" style={{ fontSize: '0.7rem' }}>
                    {item.category}
                  </span>
                </div>
                {item.pronunciation && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                    [{item.pronunciation}]
                  </div>
                )}
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  {item.plainDefinition}
                </p>

                <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                  {item.exampleInContext}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-warning)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                <div>
                  <strong>What to Watch Out For:</strong> {item.whyWatchOut}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
