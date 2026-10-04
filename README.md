# XAI Contact Analyser

> **Explainable AI (XAI) Framework for Automated Legal-Risk Assessment in Solidity Smart Contracts**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 📌 Project Overview

**XAI Contact Analyser** is a web-based Explainable AI SaaS platform designed to analyze Solidity smart contracts for potential pre-deployment legal and compliance risks.

While traditional smart contract auditing predominantly focuses on execution-level security (reentrancy, integer overflows, access control), a smart contract can execute without technical runtime errors while still containing terms that impose illegal penalties, violate consumer protection guidelines, or create severe legal liability.

This system provides automated pre-deployment decision support, pairing **Legal-BERT-based semantic classification** with **SHAP and LIME interpretability** to highlight risky clauses, explain model verdicts, and suggest safer contractual alternatives.

---

## 🔬 Core AI & Research Pipeline

```text
Solidity Smart Contract
        ↓
Preprocessing & Normalization
        ↓
AST Tokenization
        ↓
Legal-BERT-based Analysis
        ↓
Legal Risk Classification
        ↓
SHAP + LIME Interpretability Engine
        ↓
Risk Score & 5 Risk Categories
        ↓
Remediation Recommendations
        ↓
Structured Decision-Support Audit Report
```

### The 5 Primary Legal Risk Categories:
1. **Privacy**: Unintended exposure of personal data, storage of identifiable records on public ledger states, and GDPR/CCPA friction.
2. **Termination**: Unilateral emergency self-destruction (`selfdestruct`), indefinite freeze mechanisms, and cancellation without participant recourse.
3. **Legal Compliance**: Non-compliance with consumer protection regulations, fee disclosure mandates, and statutory standards.
4. **Liability**: Punitive indemnity clauses, complete exclusion of liability for intentional misconduct, and unbalanced risk allocation.
5. **Payment / Financial**: Locked withdrawals, arbitrary fee alterations, and unilateral fund confiscation clauses.

### Explainable AI (XAI) Layer:
* **SHAP (Shapley Additive Explanations)**: Measures the game-theoretic marginal contribution of each code token to demonstrate which constructs pushed the contract into a higher or lower risk category.
* **LIME (Local Interpretable Model-agnostic Explanations)**: Constructs local surrogate models around individual clause boundaries to provide human-interpretable explanations.

---

## ⚖️ Responsible Auditing Disclaimer

**XAI Contact Analyser is an automated, pre-deployment decision-support auditing tool.** 
* It is **not** intended to replace qualified legal counsel.
* It does **not** guarantee statutory legal compliance across jurisdictions.
* It does **not** certify that a smart contract is legally binding or valid.
Developers and organizations must always consult professional legal advisors for official contract validation.

---

## 📂 Project Architecture

```text
XAI-Contact-Analyser/
├── docs/
│   ├── PROJECT_CONTEXT.md          # Master context and research taxonomy
│   └── FRONTEND_ROUTES.md          # 10 application routes mapping
│
├── frontend/
│   ├── public/
│   │   └── _redirects              # Netlify SPA routing rewrite rule
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Button, Card, Badge, Modal, Input, EmptyState, etc.
│   │   │   ├── layout/             # Navbar, Sidebar, DashboardNavbar, Footer
│   │   │   ├── dashboard/          # StatCard, RiskOverview, RecentAnalysis
│   │   │   └── analysis/           # RiskSummary, RiskCard, CodeViewer, ShapChart, LimeExplanation, etc.
│   │   ├── pages/                  # Landing, Login, Register, Dashboard, NewAnalysis, AnalysisResult, History, Reports, Profile, Settings
│   │   ├── layouts/                # PublicLayout, DashboardLayout
│   │   ├── data/                   # mockData.js (Realistic smart contract audit datasets)
│   │   ├── utils/                  # constants.js (Risk categories, levels, and colors)
│   │   ├── App.jsx                 # React Router v7 configuration
│   │   ├── index.css               # Tailwind CSS v4 styling & Inter font
│   │   └── main.jsx
│   ├── vercel.json                 # Vercel SPA routing rewrite rule
│   └── package.json
│
├── .gitignore                      # Prevents committing node_modules and build artifacts
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** (v18.0 or newer recommended)
* **npm** (v9.0 or newer)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/XAI-Contact-Analyser.git
cd XAI-Contact-Analyser
```

### 2. Install frontend dependencies
```bash
cd frontend
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Check code quality
```bash
npm run lint
```

---

## 🌐 Deployment

The frontend includes native SPA routing rules for:
* **Vercel**: Configured via `frontend/vercel.json` (Set Root Directory to `frontend`).
* **Netlify**: Configured via `frontend/public/_redirects` (Drag & drop `frontend/dist`).

---

## 📄 License
This project is licensed under the MIT License.
