import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingDown
} from 'lucide-react';
import type { LegalDocument, ClauseAnalysis } from '../types/legal';

interface RiskRadarProps {
  document: LegalDocument;
  onSelectClause?: (clause: ClauseAnalysis) => void;
  selectedClauseId?: string;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({
  document,
  onSelectClause,
  selectedClauseId
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const clauses = document.clauses;
  const highRisks = clauses.filter(c => c.riskLevel === 'high');
  const medRisks = clauses.filter(c => c.riskLevel === 'medium');
  const lowRisks = clauses.filter(c => c.riskLevel === 'low' || c.riskLevel === 'info');

  const filteredClauses = clauses.filter(c => {
    if (filterRisk === 'high') return c.riskLevel === 'high';
    if (filterRisk === 'medium') return c.riskLevel === 'medium';
    if (filterRisk === 'low') return c.riskLevel === 'low' || c.riskLevel === 'info';
    return true;
  });

  const getScoreDialClass = (score: number) => {
    if (score >= 75) return 'low-risk';
    if (score >= 50) return 'medium-risk';
    return 'high-risk';
  };

  const copyCounterText = (clause: ClauseAnalysis) => {
    if (!clause.counterProposalText) return;
    navigator.clipboard.writeText(clause.counterProposalText);
    setCopiedId(clause.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="risk-radar-wrapper">
      {/* Risk Score Dial Card */}
      <div className="risk-score-card">
        <div className={`score-dial ${getScoreDialClass(document.riskScore)}`}>
          <span className="score-number">{document.riskScore}</span>
          <span className="score-label">SAFETY</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Contract Risk Radar</h3>
            <span className={`badge-risk ${document.riskScore < 50 ? 'high' : document.riskScore < 75 ? 'medium' : 'low'}`}>
              {document.riskScore < 50 ? 'High Legal Risk' : document.riskScore < 75 ? 'Moderate Caution' : 'Fair Standard Contract'}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            {document.summary}
          </p>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-danger)' }}>
              <AlertCircle size={15} />
              <span>{highRisks.length} Red Flags</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-warning)' }}>
              <AlertTriangle size={15} />
              <span>{medRisks.length} Warnings</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-success)' }}>
              <ShieldCheck size={15} />
              <span>{lowRisks.length} Standard/Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Filter Clauses:</span>
        <button
          className={`sample-pill ${filterRisk === 'all' ? 'active' : ''}`}
          onClick={() => setFilterRisk('all')}
        >
          All ({clauses.length})
        </button>
        <button
          className={`sample-pill ${filterRisk === 'high' ? 'active' : ''}`}
          onClick={() => setFilterRisk('high')}
          style={{ borderColor: filterRisk === 'high' ? 'var(--color-danger)' : undefined }}
        >
          Red Flags 🔴 ({highRisks.length})
        </button>
        <button
          className={`sample-pill ${filterRisk === 'medium' ? 'active' : ''}`}
          onClick={() => setFilterRisk('medium')}
        >
          Warnings 🟡 ({medRisks.length})
        </button>
        <button
          className={`sample-pill ${filterRisk === 'low' ? 'active' : ''}`}
          onClick={() => setFilterRisk('low')}
        >
          Standard 🟢 ({lowRisks.length})
        </button>
      </div>

      {/* Clause Cards List */}
      <div className="clause-list" style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {filteredClauses.map((clause) => (
          <div
            key={clause.id}
            className={`clause-item ${selectedClauseId === clause.id ? 'selected' : ''}`}
            onClick={() => onSelectClause && onSelectClause(clause)}
          >
            <div className="clause-header">
              <div className="clause-title">{clause.title}</div>
              <span className={`badge-risk ${clause.riskLevel}`}>
                {clause.riskLevel.toUpperCase()}
              </span>
            </div>

            {/* Plain English Translation */}
            <div style={{ marginBottom: '0.65rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={13} />
                Plain-English Summary
              </div>
              <p className="clause-plain-text">{clause.simplifiedText}</p>
            </div>

            {/* Original Text Excerpt */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.65rem', borderLeft: '3px solid var(--border-medium)' }}>
              "{clause.originalText}"
            </div>

            {/* Impact Explanation */}
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <TrendingDown size={15} style={{ marginTop: '0.1rem', flexShrink: 0, color: 'var(--color-danger)' }} />
              <div>
                <strong>Why It Matters:</strong> {clause.whyItMatters}
              </div>
            </div>

            {/* Benchmark */}
            {clause.benchmarkComparison && (
              <div style={{ fontSize: '0.8rem', color: '#475569', backgroundColor: '#f1f5f9', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.65rem' }}>
                💡 <strong>Industry Benchmark:</strong> {clause.benchmarkComparison}
              </div>
            )}

            {/* Actionable Counter Proposal */}
            {clause.counterProposalText && (
              <div style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px dashed var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  Suggested Counter-Clause Available
                </div>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyCounterText(clause);
                  }}
                >
                  {copiedId === clause.id ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedId === clause.id ? 'Copied!' : 'Copy Counter Phrasing'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
