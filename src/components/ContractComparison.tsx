import React, { useState } from 'react';
import { 
  GitCompare, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import type { LegalDocument, ComparisonResult } from '../types/legal';
import { compareContracts } from '../services/aiLegalEngine';

interface ContractComparisonProps {
  sampleDocs: LegalDocument[];
  currentDoc: LegalDocument;
}

export const ContractComparison: React.FC<ContractComparisonProps> = ({
  sampleDocs,
  currentDoc
}) => {
  const [doc1, setDoc1] = useState<LegalDocument>(currentDoc);
  const [doc2, setDoc2] = useState<LegalDocument>(
    sampleDocs.find(d => d.id !== currentDoc.id) || sampleDocs[1] || currentDoc
  );

  const comparisonResult: ComparisonResult = compareContracts(doc1, doc2);

  return (
    <div className="contract-comparison-wrapper">
      {/* Header Selector Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div className="card-title">
            <GitCompare size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Side-by-Side Contract Comparison</span>
          </div>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Compare Version Drafts or Landlord vs Tenant Revisions
          </span>
        </div>

        <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5rem', alignItems: 'center' }}>
          {/* Document 1 Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Base Document (Draft v1 / Original):
            </label>
            <select
              value={doc1.id}
              onChange={(e) => {
                const found = sampleDocs.find(d => d.id === e.target.value);
                if (found) setDoc1(found);
              }}
              style={{
                width: '100%',
                padding: '0.55rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              {sampleDocs.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--brand-primary)', paddingTop: '1.25rem' }}>
            <ArrowRight size={22} />
          </div>

          {/* Document 2 Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Comparative Document (Draft v2 / Revised):
            </label>
            <select
              value={doc2.id}
              onChange={(e) => {
                const found = sampleDocs.find(d => d.id === e.target.value);
                if (found) setDoc2(found);
              }}
              style={{
                width: '100%',
                padding: '0.55rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              {sampleDocs.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Impact Banner */}
      <div className="risk-score-card" style={{ marginBottom: '1.5rem', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
        <div className="score-dial low-risk">
          <span className="score-number">+{comparisonResult.riskShiftScore}</span>
          <span className="score-label">SAFETY SHIFT</span>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '0.3rem' }}>
            Overall Risk Reduction Summary
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#15803d' }}>
            {comparisonResult.overallSummary}
          </p>
        </div>
      </div>

      {/* Changes Diff List */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <GitCompare size={18} />
            <span>Key Clause Changes & Liability Shifts ({comparisonResult.changes.length})</span>
          </div>
        </div>

        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {comparisonResult.changes.map((change) => (
            <div
              key={change.id}
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{change.clauseTitle}</h4>
                <span className={`badge-risk ${change.riskShift === 'decreased_risk' ? 'low' : 'high'}`}>
                  {change.riskShift === 'decreased_risk' ? '🟢 Risk Decreased (Safer)' : '🔴 Risk Increased'}
                </span>
              </div>

              {/* Side-by-Side Excerpt Box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.825rem', color: '#991b1b' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    ❌ Draft v1 (Original):
                  </div>
                  "{change.doc1Text}"
                </div>

                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.825rem', color: '#166534' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    ✅ Draft v2 (Revised):
                  </div>
                  "{change.doc2Text}"
                </div>
              </div>

              {/* Impact Explanation */}
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-success)' }} />
                <span><strong>Impact Analysis:</strong> {change.impactDescription}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
