import React from 'react';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  FileText, 
  GitCompare, 
  AlertTriangle, 
  MessageSquare, 
  Compass, 
  ListChecks, 
  Briefcase 
} from 'lucide-react';

interface ProblemAlignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

interface UseCaseItem {
  id: string;
  title: string;
  description: string;
  tabKey: string;
  tabName: string;
  icon: React.ReactNode;
  features: string[];
}

const USE_CASES: UseCaseItem[] = [
  {
    id: 'uc-1',
    title: '1. Simplifying Complex Legal Documents',
    description: 'Translates dense legal terminology into plain, everyday English with reading-level customization.',
    tabKey: 'analyzer',
    tabName: 'Document Analyzer',
    icon: <FileText size={18} style={{ color: '#2563eb' }} />,
    features: ['Clause-by-clause translation', 'Plain-English & Executive reading modes', 'Industry benchmark comparisons']
  },
  {
    id: 'uc-2',
    title: '2. Comparing Contracts, Agreements, or Policies',
    description: 'Side-by-side comparative diff analysis showing how revisions shift risk and liability between drafts.',
    tabKey: 'comparison',
    tabName: 'Compare Contracts',
    icon: <GitCompare size={18} style={{ color: '#16a34a' }} />,
    features: ['Side-by-side clause diffs', 'Safety Shift scoring (+/- delta)', 'Color-coded liability shift indicators']
  },
  {
    id: 'uc-3',
    title: '3. Highlighting Clauses, Obligations, Risks, or Inconsistencies',
    description: 'Automated Risk Radar flagging Red Flags, Warnings, notice deadlines, and hidden penalties.',
    tabKey: 'analyzer',
    tabName: 'Risk Radar',
    icon: <AlertTriangle size={18} style={{ color: '#dc2626' }} />,
    features: ['0–100 Safety Score dial', 'Red flag & warning tallies', 'Unilateral indemnity & forfeiture detection']
  },
  {
    id: 'uc-4',
    title: '4. Answering Questions Based on Provided Documents',
    description: 'Conversational assistant answering user questions strictly grounded in the document text with line citations.',
    tabKey: 'chat',
    tabName: 'Ask Document (AI)',
    icon: <MessageSquare size={18} style={{ color: '#0284c7' }} />,
    features: ['Grounded Q&A with Gemini 1.5 Flash', 'Line-item source citations', 'Prompt injection shield guardrails']
  },
  {
    id: 'uc-5',
    title: '5. Helping Users Understand Options & Next Steps',
    description: 'Provides actionable guidance, alternative clause wording, and counter-proposal phrasing.',
    tabKey: 'analyzer',
    tabName: 'Clause Drawer',
    icon: <Compass size={18} style={{ color: '#9333ea' }} />,
    features: ['Copyable counter-proposal language', 'Impact explanation ("Why It Matters")', 'Practical negotiation advice']
  },
  {
    id: 'uc-6',
    title: '6. Generating Summaries, Checklists, & Actionable Outputs',
    description: 'Interactive obligation trackers, deadline calendars, and automated negotiation emails.',
    tabKey: 'action',
    tabName: 'Action Center',
    icon: <ListChecks size={18} style={{ color: '#d97706' }} />,
    features: ['Interactive obligation checklist', 'Due date & responsible party tracking', 'Pre-drafted counter-proposal email']
  },
  {
    id: 'uc-7',
    title: '7. Preparing Information or Questions for a Legal Professional',
    description: 'Generates exportable and printable Lawyer Consultation Briefs to maximize attorney consultations.',
    tabKey: 'action',
    tabName: 'Lawyer Consultation Brief',
    icon: <Briefcase size={18} style={{ color: '#4f46e5' }} />,
    features: ['Print / PDF exportable brief', 'Critical red flags executive summary', 'Tailored questions to ask your attorney']
  }
];

export const ProblemAlignmentModal: React.FC<ProblemAlignmentModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="alignment-title">
      <div className="modal-content" style={{ maxWidth: '780px', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--brand-primary)' }} />
            <h3 id="alignment-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Problem Statement Alignment & Capabilities
            </h3>
          </div>
          <button 
            className="btn-close" 
            onClick={onClose} 
            aria-label="Close alignment dialog"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '0.75rem 0', overflowY: 'auto', flex: 1 }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            LexiGuard AI is engineered to address all 7 core use cases defined in the <strong>AI for Legal Assistance & Access</strong> hackathon challenge:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {USE_CASES.map((uc) => (
              <div 
                key={uc.id}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.9rem 1.1rem',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                  <div style={{ marginTop: '0.15rem' }}>{uc.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--color-success)' }} />
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {uc.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {uc.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {uc.features.map((feat, i) => (
                        <span key={i} className="sample-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', whiteSpace: 'nowrap', alignSelf: 'center' }}
                  onClick={() => {
                    onNavigateTab(uc.tabKey);
                    onClose();
                  }}
                >
                  View Feature ➔
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onClose}>
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
