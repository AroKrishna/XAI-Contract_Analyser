import { Link } from 'react-router-dom';
import {
  FileCheck,
  Activity,
  AlertTriangle,
  ShieldCheck,
  PlusCircle,
  FileCode,
  ArrowRight,
  Info,
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RiskOverview from '../components/dashboard/RiskOverview';
import RecentAnalysis from '../components/dashboard/RecentAnalysis';
import Button from '../components/common/Button';
import { mockDashboardStats, mockContracts } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. WELCOME & QUICK ACTION BANNER                             */}
      {/* ============================================================ */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-400 font-mono uppercase tracking-wider">
              Decision Support Center
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-400">Pre-Deployment Auditing</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">
            Smart Contract Risk Assessment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Automated legal-risk triage powered by Legal-BERT classification and SHAP/LIME token attribution.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link to="/analysis/new">
            <Button variant="primary" size="md" icon={PlusCircle}>
              New Contract Analysis
            </Button>
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CORE AUDIT METRICS GRID                                   */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Contracts Audited"
          value={mockDashboardStats.totalAnalyzed}
          subtitle="Total Solidity contracts analyzed"
          icon={FileCheck}
          badgeText="Active"
        />

        <StatCard
          title="Average Legal Risk"
          value={`${mockDashboardStats.averageRiskScore}/100`}
          subtitle="Aggregate cross-category score"
          icon={Activity}
          badgeText="Medium"
          badgeVariant="warning"
        />

        <StatCard
          title="High Risk Flagged"
          value={mockDashboardStats.highRiskCount}
          subtitle="Contracts with Critical/High clauses"
          icon={AlertTriangle}
          badgeText="Review Required"
          badgeVariant="danger"
        />

        <StatCard
          title="Compliant Baseline"
          value={mockDashboardStats.lowRiskCount}
          subtitle="Passed standard risk boundaries"
          icon={ShieldCheck}
          badgeText="Low Risk"
          badgeVariant="success"
        />
      </div>

      {/* ============================================================ */}
      {/* 3. MAIN DASHBOARD CONTENT (SPLIT: RECENT AUDITS & OVERVIEW)  */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentAnalysis contracts={mockContracts} />
        </div>

        <div className="space-y-6">
          <RiskOverview />

          {/* Quick Start Card */}
          <div className="p-5 rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
              <FileCode className="w-4 h-4" />
              <span>Analyze New Solidity Contract</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload your <code>.sol</code> file or paste contract source code to receive immediate Legal-BERT classification and token-level XAI explanations.
            </p>
            <Link to="/analysis/new" className="inline-block pt-1">
              <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                Start Audit
              </Button>
            </Link>
          </div>

          {/* Decision Support Reminder */}
          <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              This system is an automated triage decision-support tool. It does not replace independent legal advice or guarantee statutory compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
