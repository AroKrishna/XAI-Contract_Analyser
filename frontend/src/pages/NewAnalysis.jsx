import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCode,
  Upload,
  Code2,
  Play,
  FileCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Textarea from '../components/common/Textarea';
import AnalysisProgress from '../components/analysis/AnalysisProgress';
import { PIPELINE_STAGES } from '../utils/constants';
import { mockContracts } from '../data/mockData';

const SAMPLE_SOL_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EscrowSettlement
 * @notice Two-party commercial settlement with owner emergency kill switch
 */
contract EscrowSettlement {
    address payable public owner;
    address public buyer;
    address payable public seller;
    uint256 public feeRate = 200; // 2%
    bool public locked = false;

    event PaymentReleased(address indexed to, uint256 amount);

    constructor(address _buyer, address payable _seller) payable {
        owner = payable(msg.sender);
        buyer = _buyer;
        seller = _seller;
    }

    // High Risk: Unilateral Emergency Termination
    function emergencyKill() external {
        require(msg.sender == owner, "Only owner");
        selfdestruct(owner);
    }

    // Medium Risk: Arbitrary Fee Adjustment
    function setFeeRate(uint256 newRate) external {
        require(msg.sender == owner, "Only owner");
        feeRate = newRate;
    }

    function release() external {
        require(msg.sender == buyer || msg.sender == owner, "Unauthorized");
        uint256 fee = (address(this).balance * feeRate) / 10000;
        owner.transfer(fee);
        seller.transfer(address(this).balance);
    }
}`;

const NewAnalysis = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [contractName, setContractName] = useState('EscrowSettlement.sol');
  const [description, setDescription] = useState('Decentralized commercial settlement contract with emergency recovery');
  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'upload'
  const [solidityCode, setSolidityCode] = useState(SAMPLE_SOL_CODE);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Async simulated processing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleLoadSample = (sampleKey = 'escrow') => {
    if (sampleKey === 'escrow') {
      setContractName('EscrowSettlement.sol');
      setDescription('Two-party commercial settlement with emergency recovery');
      setSolidityCode(SAMPLE_SOL_CODE);
      setActiveTab('paste');
    } else {
      const lending = mockContracts.find((c) => c.id === 'audit-103');
      setContractName(lending?.name || 'TokenLendingPool.sol');
      setDescription(lending?.description || 'Automated collateralized lending pool');
      setSolidityCode(lending?.solidityCode || SAMPLE_SOL_CODE);
      setActiveTab('paste');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.sol')) {
      setErrorMessage('Please select a valid Solidity file ending in .sol');
      return;
    }

    setErrorMessage('');
    setUploadedFileName(file.name);
    setContractName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setSolidityCode(content);
      }
    };
    reader.readAsText(file);
  };

  const handleStartAnalysis = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!contractName.trim()) {
      setErrorMessage('Contract name is required');
      return;
    }

    if (!solidityCode.trim()) {
      setErrorMessage('Please paste or upload Solidity smart contract code');
      return;
    }

    // Begin asynchronous mock pipeline processing
    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    const stepInterval = 650; // ms per stage
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      if (step < PIPELINE_STAGES.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        // After completing all 8 stages, navigate to the result page
        setTimeout(() => {
          navigate('/analysis/audit-101');
        }, 500);
      }
    }, stepInterval);
  };

  // If running the simulated AI pipeline, render the step tracker
  if (isAnalyzing) {
    return (
      <AnalysisProgress
        currentStepIndex={currentStepIndex}
        contractName={contractName}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">
            New Smart Contract Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Submit Solidity source code for Legal-BERT classification, SHAP attribution, and LIME interpretability
          </p>
        </div>

        {/* Quick Sample Button */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={() => handleLoadSample('escrow')}
          >
            Load Sample Contract
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Intake Form */}
      <form onSubmit={handleStartAnalysis} className="space-y-6">
        <Card className="border-slate-800 bg-slate-900/60 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contract / Project Name"
              id="contractName"
              placeholder="e.g., EscrowSettlement.sol"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              required
            />

            <Input
              label="Description (Optional)"
              id="description"
              placeholder="e.g., Two-party settlement escrow"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Mode Switch Tabs */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 mb-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('paste')}
                  className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'paste'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  Paste Solidity Code
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'upload'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload .sol File
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                Solidity ^0.8.x
              </span>
            </div>

            {/* Tab 1: Paste Code */}
            {activeTab === 'paste' && (
              <div className="space-y-2">
                <Textarea
                  id="soliditySource"
                  rows={14}
                  placeholder="// Paste Solidity contract source code here..."
                  value={solidityCode}
                  onChange={(e) => setSolidityCode(e.target.value)}
                  className="font-mono text-xs bg-slate-950/70 border-slate-800"
                  required
                />
                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span>Lines of code: {solidityCode.split('\n').length}</span>
                  <span>Encoding: UTF-8</span>
                </div>
              </div>
            )}

            {/* Tab 2: Upload File */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl p-10 text-center cursor-pointer bg-slate-950/40 hover:bg-slate-900/40 transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".sol"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-3">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    {uploadedFileName ? uploadedFileName : 'Click to select or drag a .sol file here'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Accepts standard Solidity files (.sol) up to 2MB
                  </p>
                </div>

                {solidityCode && (
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      Loaded {contractName} ({solidityCode.split('\n').length} lines)
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('paste')}
                      className="text-blue-400 hover:underline"
                    >
                      View Code
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Analysis will evaluate risks across Privacy, Termination, Legal Compliance, Liability, and Payment / Financial.
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Play}
              className="w-full sm:w-auto shadow-lg shadow-blue-600/20"
            >
              Start Legal-BERT & XAI Analysis
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default NewAnalysis;
