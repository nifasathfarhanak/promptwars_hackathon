export type RiskLevel = 'high' | 'medium' | 'low' | 'info';

export type CategoryType = 
  | 'financial'
  | 'liability'
  | 'termination'
  | 'intellectual_property'
  | 'obligations'
  | 'privacy'
  | 'dispute_resolution'
  | 'renewal'
  | 'general';

export interface ClauseAnalysis {
  id: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  riskLevel: RiskLevel;
  category: CategoryType;
  lineNumberStart?: number;
  lineNumberEnd?: number;
  whyItMatters: string;
  recommendation: string;
  counterProposalText?: string;
  benchmarkComparison?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  documentType: 'lease' | 'employment' | 'freelance' | 'saas' | 'nda' | 'custom';
  content: string;
  uploadedAt: string;
  summary: string;
  riskScore: number; // 0 to 100 (100 = low risk / very safe, 0 = extreme risk)
  clauses: ClauseAnalysis[];
  keyObligations: ObligationItem[];
  /** True when the document was analyzed by Google Gemini AI (vs. the local heuristic fallback engine) */
  analyzedByGemini?: boolean;
}

export interface ObligationItem {
  id: string;
  title: string;
  partyResponsible: string; // e.g. "Tenant", "Employee", "Client", "Service Provider"
  dueDateOrFrequency: string;
  description: string;
  category: 'payment' | 'notice' | 'compliance' | 'delivery' | 'renewal';
  isCompleted?: boolean;
}

export interface DiffChange {
  id: string;
  type: 'addition' | 'deletion' | 'modification' | 'unchanged';
  clauseTitle?: string;
  doc1Text?: string;
  doc2Text?: string;
  impactDescription: string;
  riskShift: 'increased_risk' | 'decreased_risk' | 'neutral';
}

export interface ComparisonResult {
  doc1Title: string;
  doc2Title: string;
  overallSummary: string;
  changes: DiffChange[];
  riskShiftScore: number; // positive = doc2 safer, negative = doc2 riskier
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: {
    clauseId: string;
    title: string;
    snippet: string;
  }[];
}

export interface LawyerPrepPackage {
  documentTitle: string;
  documentType: string;
  clientName: string;
  generatedDate: string;
  overallRiskScore: number;
  executiveSummary: string;
  criticalRedFlags: ClauseAnalysis[];
  keyQuestionsToAskLawyer: string[];
  recommendedNegotiationPoints: {
    clauseTitle: string;
    currentTerm: string;
    desiredOutcome: string;
  }[];
}

export interface GlossaryTerm {
  term: string;
  pronunciation?: string;
  category: string;
  plainDefinition: string;
  exampleInContext: string;
  whyWatchOut: string;
}
