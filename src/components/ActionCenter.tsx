import React, { useState } from 'react';
import { 
  CheckSquare, 
  Printer, 
  Mail, 
  Calendar, 
  User, 
  FileText, 
  Copy, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { LegalDocument, ObligationItem } from '../types/legal';
import { generateLawyerPrepPackage } from '../services/aiLegalEngine';

interface ActionCenterProps {
  document: LegalDocument;
}

export const ActionCenter: React.FC<ActionCenterProps> = ({ document }) => {
  const [clientName, setClientName] = useState('Valued User');
  const [obligations, setObligations] = useState<ObligationItem[]>(document.keyObligations);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync obligations if doc changes
  React.useEffect(() => {
    setObligations(document.keyObligations);
  }, [document]);

  const toggleObligation = (id: string) => {
    const updated = obligations.map(ob => {
      if (ob.id === id) {
        const nextState = !ob.isCompleted;
        if (nextState) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        }
        return { ...ob, isCompleted: nextState };
      }
      return ob;
    });
    setObligations(updated);
  };

  const lawyerBrief = generateLawyerPrepPackage(document, clientName);

  const handlePrint = () => {
    window.print();
  };

  const sampleEmailText = `Dear [Landlord / Employer / Counterparty],

I have reviewed the proposed contract ("${document.title}"). 

While I am excited to move forward, I would like to request adjustments to the following clauses to ensure mutual fairness:

${document.clauses.filter(c => c.riskLevel === 'high').map(c => `1. ${c.title}:\n   - Proposed Change: ${c.counterProposalText || c.recommendation}`).join('\n\n')}

Thank you for your understanding. I look forward to finalizing an updated agreement.

Best regards,
${clientName}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(sampleEmailText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="action-center-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Obligation Checklist */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <CheckSquare size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Key Obligation & Deadline Checklist</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Track compliance dates & notice windows
          </span>
        </div>

        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {obligations.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: item.isCompleted ? '#f0fdf4' : 'var(--bg-surface)'
                }}
              >
                <input
                  type="checkbox"
                  checked={!!item.isCompleted}
                  onChange={() => toggleObligation(item.id)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--brand-primary)' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
                      {item.title}
                    </h4>
                    <span className="sample-pill" style={{ fontSize: '0.75rem' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
                      Due: {item.dueDateOrFrequency}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {item.description} (Responsible: <strong>{item.partyResponsible}</strong>)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Lawyer Consultation Brief (Printable) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Lawyer Consultation Brief (Print / Export Ready)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
              <User size={14} />
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Your Name"
                style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}
              />
            </div>
            <button className="btn-primary" onClick={handlePrint}>
              <Printer size={15} />
              <span>Print / Save PDF Brief</span>
            </button>
          </div>
        </div>

        <div className="card-body" style={{ backgroundColor: '#ffffff', padding: '1.75rem' }}>
          <div style={{ borderBottom: '2px solid var(--brand-primary)', paddingBottom: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>LEGAL CONSULTATION BRIEF</h2>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Prepared for: <strong>{lawyerBrief.clientName}</strong> | Date: {lawyerBrief.generatedDate}
              </div>
            </div>
            <div className={`score-dial ${document.riskScore < 50 ? 'high-risk' : 'medium-risk'}`} style={{ width: '64px', height: '64px' }}>
              <span className="score-number" style={{ fontSize: '1.3rem' }}>{lawyerBrief.overallRiskScore}</span>
              <span className="score-label" style={{ fontSize: '0.55rem' }}>RISK</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.3rem' }}>
              1. Document Overview
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Document Title: <strong>{lawyerBrief.documentTitle}</strong> ({lawyerBrief.documentType})<br />
              {lawyerBrief.executiveSummary}
            </p>
          </div>

          {/* Critical Red Flags */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-danger)', marginBottom: '0.3rem' }}>
              2. Highlighted Red Flag Clauses ({lawyerBrief.criticalRedFlags.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {lawyerBrief.criticalRedFlags.map((rf, i) => (
                <div key={i} style={{ borderLeft: '3px solid var(--color-danger)', paddingLeft: '0.75rem', backgroundColor: '#fef2f2', padding: '0.6rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#991b1b' }}>{rf.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#7f1d1d', marginTop: '0.15rem' }}>
                    <strong>Concern:</strong> {rf.whyItMatters}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Questions to Ask Attorney */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.3rem' }}>
              3. Recommended Questions for Your Legal Counsel
            </h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {lawyerBrief.keyQuestionsToAskLawyer.map((q, i) => (
                <li key={i} style={{ marginBottom: '0.3rem' }}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Negotiation Email Generator */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Mail size={18} style={{ color: 'var(--brand-primary)' }} />
            <span>Counter-Proposal Negotiation Email Drafter</span>
          </div>
          <button className="btn-secondary" onClick={copyEmail}>
            {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedEmail ? 'Email Copied!' : 'Copy Negotiation Draft'}</span>
          </button>
        </div>

        <div className="card-body">
          <textarea
            className="document-textarea"
            style={{ height: '180px' }}
            value={sampleEmailText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
