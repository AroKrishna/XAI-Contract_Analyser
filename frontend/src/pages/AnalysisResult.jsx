import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Share2,
  FileCode,
  Layers,
  Lightbulb,
  Cpu,
  Copy,
  Check,
} from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import RiskSummary from '../components/analysis/RiskSummary';
import RiskCard from '../components/analysis/RiskCard';
import CodeViewer from '../components/analysis/CodeViewer';
import ShapChart from '../components/analysis/ShapChart';
import LimeExplanation from '../components/analysis/LimeExplanation';
import RecommendationCard from '../components/analysis/RecommendationCard';
import ComplianceMatrix from '../components/analysis/ComplianceMatrix';
import { mockContracts } from '../data/mockData';

const AnalysisResult = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'code' | 'xai' | 'recommendations'
  const [downloading, setDownloading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Find matching contract or fallback to first contract
  const contract =
    mockContracts.find((c) => c.id === id) || mockContracts[0];

  const handleDownloadReport = (format = 'PDF') => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Structured Audit Report for ${contract.name} generated in ${format} format.`);
    }, 700);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };


  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. TOP HEADER & NAVIGATION                                   */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" icon={ArrowLeft}>
              Back to Dashboard
            </Button>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <span>Audit Report:</span>
              <span className="font-mono text-blue-400">{contract.name}</span>
            </h2>
            <p className="text-xs text-slate-400">
              Audit ID: <span className="font-mono text-slate-300">{contract.id}</span> • Legal-BERT + SHAP/LIME Analysis
            </p>
          </div>
        </div>

        {/* Action Buttons: Export Report */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            isLoading={downloading}
            onClick={() => handleDownloadReport('PDF')}
          >
            Export PDF
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Share2}
            onClick={() => setShareModalOpen(true)}
          >
            Share Audit
          </Button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. OVERALL RISK SUMMARY COMPONENT                            */}
      {/* ============================================================ */}
      <RiskSummary contract={contract} />

      {/* ============================================================ */}
      {/* 3. 5 RISK CATEGORIES BREAKDOWN                               */}
      {/* ============================================================ */}
      <RiskCard categories={contract.categories} />

      {/* ============================================================ */}
      {/* 4. SECTION TABS                                              */}
      {/* ============================================================ */}
      <div className="border-b border-slate-800 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Full Audit View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Code & Risky Clauses
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('xai')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'xai'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            XAI Explanations (SHAP & LIME)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommendations')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'recommendations'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Recommendations & Compliance
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. TABBED VIEWS                                              */}
      {/* ============================================================ */}
      {/* View 1: Code Viewer */}
      {(activeTab === 'all' || activeTab === 'code') && (
        <section className="space-y-4">
          <CodeViewer code={contract.solidityCode} />
        </section>
      )}

      {/* View 2: XAI Interpretability (SHAP & LIME) */}
      {(activeTab === 'all' || activeTab === 'xai') && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShapChart explanations={contract.shapExplanations} />
          <LimeExplanation explanations={contract.limeExplanations} />
        </section>
      )}

      {/* View 3: Recommendations & Compliance Matrix */}
      {(activeTab === 'all' || activeTab === 'recommendations') && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecommendationCard recommendations={contract.recommendations} />
          <ComplianceMatrix matrix={contract.complianceMatrix} />
        </section>
      )}

      {/* Share Report Modal */}
      <Modal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Share Structured Audit Report"
        subtitle={`Export and share decision-support findings for ${contract.name}`}
        footer={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShareModalOpen(false)}
          >
            Close
          </Button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Direct Audit URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 px-3 py-2 select-all focus:outline-none"
              />
              <Button
                variant="primary"
                size="sm"
                icon={linkCopied ? Check : Copy}
                onClick={handleCopyLink}
              >
                {linkCopied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300">Auditor Note:</span>
            <p>
              Shared reports include full Legal-BERT category breakdown, SHAP token attributions, and statutory compliance assessments.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export default AnalysisResult;
