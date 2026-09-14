# ⚖️ LexiGuard AI — GenAI Legal Assistance & Access Navigator

> **Hackathon Vertical**: AI for Legal Assistance & Access  
> **Built With**: React 19, TypeScript, Vite, Google Gemini 1.5 Flash API, Custom Design System

---

## 🎯 Chosen Vertical: AI for Legal Assistance & Access

Legal documents — contracts, lease agreements, employment offers, NDAs — are filled with dense legalese, hidden penalties, and unannounced liability traps. For non-lawyers, understanding these agreements without expensive legal counsel is nearly impossible.

**LexiGuard AI** is a GenAI-powered web platform that makes legal document understanding accessible to everyone: tenants, freelancers, job seekers, and small business owners. It uses **Google Gemini 1.5 Flash** as the primary intelligence engine to translate legalese into plain English, detect hidden risks, and generate actionable guidance.

---

## 🤖 Gen AI Services Utilized

### Primary AI Service: Google Gemini 1.5 Flash (via REST API)

LexiGuard AI integrates Google Gemini in **three distinct features**:

#### 1. 🔍 Full Document Risk Analysis (Core Feature)
**Where**: `src/services/aiLegalEngine.ts` → `analyzeDocumentWithGemini()`  
**Component**: `src/components/DocumentAnalyzer.tsx`

When a user provides a Gemini API key, the **entire document analysis pipeline** is powered by Gemini. A structured prompt asks Gemini 1.5 Flash to:
- Parse every clause in the document
- Assign risk levels (`high` / `medium` / `low` / `info`)
- Generate plain-English summaries for each clause
- Produce counter-proposal phrasing for risky clauses
- Calculate an overall Safety Score (0–100)
- Return structured JSON that populates the Risk Radar dashboard

```
User Document → Prompt Injection Shield → Gemini 1.5 Flash
                                            ↓
                           Structured JSON: clauses[], riskScore, summary
                                            ↓
                               Risk Radar UI + Clause Drawer
```

The Gemini prompt uses **temperature: 0.1** for deterministic, grounded legal analysis — not creative generation.

#### 2. 💬 Grounded Document Q&A Chat
**Where**: `src/services/aiLegalEngine.ts` → `queryDocumentAI()`  
**Component**: `src/components/DocumentChat.tsx`

Gemini answers user questions strictly grounded in the contract text. The system prompt instructs Gemini to cite specific clauses and refuse to answer beyond the document scope, minimizing hallucination risk.

#### 3. 🛡️ Prompt Injection Defense Layer
**Where**: `src/services/aiLegalEngine.ts` → `sanitizeLegalPrompt()`

All user input passes through a multi-pattern injection sanitizer that detects and blocks patterns like `"ignore previous instructions"`, `"jailbreak"`, `"override safety"`, etc., before any text reaches Gemini.

### Fallback: Client-Side Heuristic NLP Engine
**Where**: `src/services/aiLegalEngine.ts` → `analyzeDocumentHeuristic()`

For users without a Gemini API key, a zero-latency client-side NLP engine provides instant analysis using keyword pattern matching, ensuring the app is fully functional offline.

---

## 💡 Approach and Logic Architecture

```
                  ┌─────────────────────────────────────────┐
                  │       User Document Input               │
                  │   (Paste, File Upload, Sample Docs)     │
                  └────────────────────┬────────────────────┘
                                       │
                         ┌─────────────┴─────────────┐
                         │ Prompt Injection Sanitizer │
                         │ (Multi-pattern regex guard)│
                         └─────────────┬─────────────┘
                                       │
             ┌─────────────────────────┴─────────────────────────┐
             ▼                                                   ▼
┌──────────────────────────┐                       ┌──────────────────────────┐
│ Google Gemini 1.5 Flash  │   (key provided)      │ Client-side Heuristic    │
│ Full Document Analysis   │◄──────────────────────│ NLP Engine (fallback)    │
│ + Grounded Q&A Chat      │                       └──────────────────────────┘
└────────────┬─────────────┘
             │  Structured JSON response
             ▼
┌─────────────────────────────────────────┐
│          Analysis Engine Output         │
│ - Clause Risk Categorization (0-100)    │
│ - Plain-English Simplification          │
│ - Counter-Proposal Phrasing             │
│ - Obligation & Deadline Extraction      │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│        Interactive UI Dashboard         │
│ - Risk Radar & Clause Drawer            │
│ - Side-by-Side Version Comparator       │
│ - "Ask Your Document" Grounded Q&A      │
│ - Lawyer Prep Brief Export              │
│ - Searchable Legalese Glossary          │
└─────────────────────────────────────────┘
```

### Core Logic Principles
- **AI-First with Graceful Degradation**: Gemini is the primary analysis engine when a key is available; the local NLP engine is a resilient fallback.
- **Structured Prompting for Grounded Output**: Gemini prompts specify JSON schema output with `temperature: 0.1` to ensure consistent, parseable, fact-grounded responses.
- **Prompt Injection Defense**: All user inputs pass through regex sanitizers before reaching Gemini.
- **Privacy-First Data Flow**: Documents remain in browser memory. No user data is stored server-side.
- **API Key Security**: Gemini API key is sent via `x-goog-api-key` HTTP header — never in URL query parameters or logs.

---

## 🛠️ How the Solution Works

### 1. 📑 Document Hub & Risk Radar
- Load pre-configured sample contracts (Residential Lease, Employment Agreement, Freelance Contract) or upload custom `.txt`/`.doc` files.
- Click **Re-Analyze** — if a Gemini API key is set, **Gemini 1.5 Flash performs the full analysis**; otherwise the offline NLP engine runs instantly.
- Visual Safety Score Dial (0–100) with real-time risk classification.
- Clickable clause cards with Plain-English Summary, Why It Matters, Benchmark Comparison, and Counter-Proposal Phrasing.
- **Engine toggle**: switch between `Gemini AI` and `Offline NLP` modes directly in the UI.

### 2. ⚖️ Side-by-Side Contract Comparator
- Compare Landlord Draft v1 vs Tenant Revision.
- Color-coded diff markers: added protections (Green 🟢), removed traps (Red 🔴), modified terms (Amber 🟡).
- Risk Shift Score showing net improvement/regression (+/- delta).

### 3. 💬 "Ask Your Document" Grounded Q&A (Gemini-Powered)
- RAG-style chatbot powered by Gemini API with document context injection.
- Pre-populated quick query chips for instant exploration.
- Direct clause source citations embedded in every AI response.
- Offline fallback with keyword-matched heuristic answers.

### 4. 📋 Action Center & Lawyer Prep Package
- **Obligation Checklist**: Interactive checkboxes with date badges.
- **Printable Lawyer Consultation Brief**: One-click PDF-ready summary for attorney consultations.
- **Negotiation Email Drafter**: Counter-proposal email draft ready to copy.

### 5. 📖 Interactive Legalese Glossary
- Searchable dictionary of 8+ complex legal terms with plain-English definitions, in-context examples, and watch-out warnings.

---

## 📌 Problem Statement Alignment (7/7 Use Cases)

| # | Use Case | Feature | Status |
|---|---|---|---|
| 1 | Simplifying complex documents | Document Analyzer → Clause Drawer (Plain-English mode) | ✅ |
| 2 | Comparing contracts / policies | Contract Comparator (Side-by-Side Diff) | ✅ |
| 3 | Highlighting clauses, risks & obligations | Risk Radar (0-100 Safety Score, Red/Yellow/Green flags) | ✅ |
| 4 | Answering questions from documents | Ask Your Document (Gemini Q&A + offline fallback) | ✅ |
| 5 | Understanding options & next steps | Clause Drawer → Counter-Proposal + Benchmark | ✅ |
| 6 | Summaries, checklists & actionable outputs | Action Center (Obligations Checklist + Email Drafter) | ✅ |
| 7 | Preparing for a legal professional | Lawyer Consultation Brief (printable, structured PDF-ready) | ✅ |

---

## 🎨 Evaluation Focus Areas

### 1. Code Quality 💎
- Clean modular TypeScript architecture with explicit interfaces (`src/types/legal.ts`).
- Decoupled components: `DocumentAnalyzer`, `RiskRadar`, `ContractComparison`, `DocumentChat`, `ActionCenter`, `LegalGlossary`, `ErrorBoundary`.
- JSDoc on every exported service function in `aiLegalEngine.ts`.
- Strict TypeScript mode with zero `any` in business logic.
- OxLint enforced code style.

### 2. Security 🛡️
- **Prompt Injection Protection**: `sanitizeLegalPrompt()` filters patterns like `ignore previous instructions`, `jailbreak`, `override safety`, XSS script tags.
- **API Key Security**: Gemini key sent via `x-goog-api-key` HTTP header — never in URLs, query params, or logs.
- **Legal Disclaimer**: Persistent sidebar disclaimer and response footers.
- **Local Data Privacy**: No contract data sent to external servers beyond the optional Gemini API call.
- **Environment Best Practices**: `.env.example` provided; `.env` gitignored.
- **Error Boundary**: Crash isolation with `role="alert"` for screen reader safety.

### 3. Efficiency ⚡
- **Dynamic Code Splitting**: All 5 view components lazy-loaded via `React.lazy` + `Suspense`.
- **Dual-Engine Fallback**: Zero-latency offline NLP guarantees instant results without blocking API requests.
- **Memoized Handlers**: `useCallback` prevents unnecessary re-renders.
- **Structured Gemini Prompts**: `temperature: 0.1`, `maxOutputTokens: 2048` — deterministic and token-efficient.
- **Sub-Second Build**: Vite 5 produces an optimized production bundle in ~900ms.

### 4. Testing 🧪
- **57 Unit & Component Tests** across 6 test suites — Vitest + React Testing Library + happy-dom.

| Test File | Tests | Coverage |
|---|---|---|
| `aiLegalEngine.test.ts` | 26 | Injection sanitizer, NLP analyzer, risk scores, comparator, lawyer brief, sample data |
| `Components.test.tsx` | 11 | ErrorBoundary, Navbar, ApiKeyModal, ProblemAlignmentModal |
| `ContractComparison.test.tsx` | 4 | Side-by-side diff, doc selection, risk shift |
| `LegalGlossary.test.tsx` | 4 | Rendering, search, filters |
| `ActionCenter.test.tsx` | 5 | Checklist toggles, lawyer brief, email drafter |
| `AnalyzerAndChat.test.tsx` | 7 | Risk radar, filter chips, editor, Q&A chat |

```bash
npm test           # Run all 57 tests
npm run test:watch # Watch mode
```

### 5. Accessibility (a11y) ♿
- **Skip-to-Content Link**: Hidden link visible on keyboard focus for screen reader users.
- **Global Focus-Visible Rings**: All interactive elements show a 2px focus ring.
- **ARIA Attributes**: `aria-selected`, `aria-label`, `aria-pressed`, `role="tablist"`, `role="alert"`, `aria-modal`.
- **Semantic HTML5**: `<header>`, `<nav>`, `<main>`, `<aside>` used throughout.
- **High-Contrast Light Theme**: `#0f172a` text on `#ffffff` background (WCAG AA).
- **Error Boundary**: `role="alert"` ensures screen readers announce crashes.
- **Accessible Loading Skeleton**: `role="status"` aria-label on Suspense fallback.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript (strict mode) |
| **Build Tool** | Vite 5 |
| **Primary AI** | Google Gemini 1.5 Flash (REST API) |
| **Testing** | Vitest + React Testing Library + happy-dom |
| **Icons** | Lucide React |
| **Styling** | Custom CSS Design System |
| **Linting** | OxLint |
| **Hosting** | Render.com (Static Site) |
| **License** | MIT |

---

## 📋 Assumptions Made

1. **User Persona**: Individuals, freelancers, small business owners, and tenants without a dedicated legal team.
2. **Document Inputs**: Text-extractable contracts (plain text, markdown, or `.txt`/`.doc` files up to ~50,000 characters).
3. **AI Key**: Gemini API key is user-supplied (via in-app modal). The app is fully functional without one using the offline NLP engine.
4. **Legal Counsel**: Users are expected to use generated Lawyer Prep Briefs to consult licensed attorneys for final execution decisions.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0+ or v22.0+

### Installation

```bash
git clone <REPOSITORY_URL>
cd promptwars_hackathon
npm install
```

### Run Development Server

```bash
npm run dev
# Open http://localhost:5173
```

### Optional: Activate Gemini AI

1. Click **"Gemini API Settings"** in the sidebar.
2. Enter your [Google AI Studio](https://aistudio.google.com/) API key.
3. Click **"Re-Analyze"** in the Document Analyzer — Gemini 1.5 Flash will now power the analysis.
4. Ask questions in the **"Ask Document"** tab — responses are Gemini-generated and grounded in your contract.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

---

## 📄 License

[MIT License](./LICENSE) — All analysis is strictly educational and informational, not formal legal advice.
