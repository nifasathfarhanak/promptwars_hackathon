# ⚖️ LexiGuard AI — GenAI Legal Assistance & Access Navigator

> **Hackathon Vertical**: AI for Legal Assistance & Access  
> **Built With**: React 18, TypeScript, Vite, Google Gemini API, Custom Radix-inspired Design System

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript (strict mode) |
| **Build Tool** | Vite 5 |
| **Testing** | Vitest + React Testing Library + happy-dom |
| **AI/LLM** | Google Gemini 1.5 Flash API (optional) |
| **Icons** | Lucide React |
| **Styling** | Custom CSS Design System (Radix-inspired light theme) |
| **Linting** | OxLint |
| **License** | MIT |

## 📌 Executive Summary

Legal documents, contracts, lease agreements, and employment offers are notoriously complex, filled with dense legalese, hidden penalties, and unannounced liability traps. For non-lawyers, understanding these agreements without expensive legal counsel is daunting.

**LexiGuard AI** is a GenAI-powered web platform built to make legal information and basic document navigation accessible to everyone—tenants, freelancers, job seekers, and small business owners. It translates legalese into plain English, detects hidden risks, compares contract drafts side-by-side, answers grounded questions, and creates professional prep packages for licensed attorneys.

---

## 🎯 Chosen Vertical & Problem Alignment

### Vertical: **AI for Legal Assistance & Access**

LexiGuard AI addresses the core problem of legal information asymmetry:
1. **Simplifying Complex Documents**: Instant clause-by-clause plain-English translations and reading-level toggles.
2. **Highlighting Obligations & Risks**: Automated Risk Radar flagging Red Flags (🔴), Warnings (🟡), and Fair Protections (🟢).
3. **Comparing Contracts**: Side-by-side comparative diffs showing how draft revisions shift risk and liability.
4. **Answering Grounded Questions**: Context-aware Q&A grounded strictly in contract text with line citations.
5. **Actionable Outputs & Lawyer Preparation**: Automated obligation timelines, counter-proposal email generators, and exportable Lawyer Consultation Briefs.

> ⚠️ **Important Legal Safety Guardrail**: LexiGuard AI provides educational information and document navigation assistance. It is explicitly designed **NOT to replace professional legal counsel**. Prominent disclaimer banners and structured attorney prep packages ensure users use the tool to enhance legal consultation rather than bypass licensed advice.

---

## 💡 Approach and Logic Architecture

LexiGuard AI uses a hybrid GenAI architecture combining real-time LLM inference (Google Gemini API) with a zero-latency client-side NLP heuristic engine.

```
                  ┌─────────────────────────────────────────┐
                  │       User Document Input               │
                  │   (Paste, File Upload, Sample Docs)     │
                  └────────────────────┬────────────────────┘
                                       │
                         ┌─────────────┴─────────────┐
                         │ Input Sanitizer Guardrail │
                         │ (Prompt Injection Shield) │
                         └─────────────┬─────────────┘
                                       │
             ┌─────────────────────────┴─────────────────────────┐
             ▼                                                   ▼
┌──────────────────────────┐                       ┌──────────────────────────┐
│ Google Gemini API        │                       │ Client-side Fallback     │
│ (Live LLM Inference)     │                       │ Heuristic Parsing Engine │
└────────────┬─────────────┘                       └────────────┬─────────────┘
             │                                                  │
             └─────────────────────────┬────────────────────────┘
                                       │
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │          Analysis Engine                │
                  │ - Clause Risk Categorization (0-100)    │
                  │ - Plain-English Simplification          │
                  │ - Counter-Proposal Phrasing Generator   │
                  │ - Obligation & Deadline Extraction      │
                  └────────────────────┬────────────────────┘
                                       │
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

### Core Logic Principles:
- **Prompt Injection Defense**: All user inputs pass through regex and script-sanitizing filters to neutralize injection attacks before sending context to LLMs.
- **Strict Citation Grounding**: Chat responses are mapped back to line numbers and specific clause titles to eliminate hallucination risks.
- **Privacy-First Data Flow**: Documents remain local in browser memory. No sensitive user contracts are persisted to external databases.

---

## 🛠️ How the Solution Works (Key Features)

### 1. 📑 Document Hub & Risk Radar
- Load pre-configured high-risk contracts (Residential Lease with deposit traps, Senior Tech Employment Agreement with aggressive non-competes, Freelance Services Contract) or upload custom `.txt`/`.doc` files.
- Visual Safety Score Dial (0–100) with real-time risk classification.
- Clickable clause cards revealing:
  - **Plain-English Summary**
  - **Why It Matters** (impact explanation)
  - **Industry Benchmark Comparison**
  - **Copyable Counter-Proposal Phrasing**

### 2. ⚖️ Side-by-Side Contract Comparison Tool
- Compare Landlord Lease Draft v1 vs Tenant Revision or Vendor v1 vs Vendor v2.
- Color-coded diff markers indicating added protections (Green), removed traps (Red), or modified terms (Amber).
- Risk Shift Dial (+/- score change).

### 3. 💬 "Ask Your Document" Grounded Q&A Assistant
- RAG chatbot powered by Gemini API or fallback parser.
- Pre-populated quick query chips ("Can the landlord increase my rent?", "Who owns personal side projects?", "What is the notice period?").
- Direct source citations embedded in AI responses.

### 4. 📋 Action Center & Lawyer Prep Package
- **Obligation Checklist**: Interactive checkboxes with date badges and completion celebratory feedback.
- **Printable Lawyer Consultation Brief**: One-click standardized summary tailored to bring to an attorney to save billable hours.
- **Negotiation Email Drafter**: Counter-proposal email draft ready to copy.

### 5. 📖 Interactive Legalese Glossary
- Searchable dictionary defining 8+ common complex legal terms (Indemnification, Force Majeure, Severability, Liquidated Damages, etc.) with examples and watch-out warnings.

---

## 🎨 Evaluation Focus Areas & Implementation Highlights

### 1. Code Quality 💎
- Clean, modular TypeScript architecture with explicit interfaces (`src/types/legal.ts`).
- Decoupled components (`DocumentAnalyzer`, `RiskRadar`, `ContractComparison`, `DocumentChat`, `ActionCenter`, `LegalGlossary`).
- Clean separation of business logic (`aiLegalEngine.ts`) and presentation.

### 2. Security & Responsible AI 🛡️
- **Prompt Injection Protection**: Multi-layer sanitization filters for patterns like `ignore previous instructions`, `jailbreak`, XSS script tags, etc.
- **API Key Security**: Gemini API key is transmitted via `x-goog-api-key` HTTP header—never exposed in URL query parameters, browser history, or server access logs.
- **Legal Disclaimer Integration**: Persistent header banners and clear notices reinforcing that output is for informational purposes only.
- **Local Data Privacy**: Documents stay in client-side memory without telemetry logging. No data is sent to external servers (except optional Gemini API calls).
- **Environment Best Practices**: `.env.example` template provided; `.env` files gitignored.

### 3. Efficiency & Resource Optimization ⚡
- Dual-engine fallback guarantees **instant zero-latency client-side parsing** even when offline or without an API key.
- Lightweight bundle footprint using Vite and standard Web APIs.

### 4. Testing 🧪
- **30 Unit & Component Tests** across 2 test suites using Vitest + React Testing Library.
- Tests cover: prompt injection sanitizer, document heuristic analyzer, contract comparator, lawyer prep package generator, sample data integrity, and UI component rendering.
- Run tests: `npm test` | Watch mode: `npm run test:watch`

### 5. Accessibility (a11y) ♿
- **Clean Light Theme**: Accessible high-contrast color palette (`#ffffff` / `#f8fafc` background, `#0f172a` text).
- **Skip-to-Content Link**: Hidden link that appears on keyboard focus for screen reader users.
- **Global Focus-Visible Rings**: All interactive elements (buttons, inputs, links) show a visible 2px focus ring on keyboard navigation.
- **ARIA Attributes**: `aria-selected`, `aria-label`, `aria-pressed`, `role="tablist"`, `role="alert"` used throughout.
- **Semantic HTML5**: `<header>`, `<nav>`, `<main>`, `<aside>` elements used correctly.
- **Error Boundary**: Graceful crash recovery UI with `role="alert"` for screen reader announcement.

---

## 📋 Assumptions Made

1. **User Persona**: Designed primarily for individuals, freelancers, small business owners, and tenants who do not have a dedicated legal team.
2. **Document Inputs**: Assumes text-extractable contracts (plain text, markdown, or text-based documents up to ~50,000 characters).
3. **Legal Counsel Role**: Assumes users will use generated Lawyer Prep Briefs to consult licensed attorneys in their jurisdiction for final execution.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js**: v18.0+ or v22.0+
- **npm**: v9.0+

### Installation & Execution

1. **Clone Repository & Install Dependencies**:
   ```bash
   git clone <REPOSITORY_URL>
   cd promptwars_hackathon
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Optional: Add Google Gemini API Key**:
   - Click the **API Key** button in the top navbar.
   - Enter your Gemini API key to unlock live LLM query processing (or leave empty to use the built-in offline NLP engine).

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

5. **Run Tests**:
   ```bash
   npm test
   ```

---

## 📄 License & Legal Notice

This project is licensed under the [MIT License](./LICENSE).

All analysis provided by LexiGuard AI is strictly educational and informational, not formal legal advice.
