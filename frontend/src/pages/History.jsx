import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCode,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { mockContracts } from '../data/mockData';

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All');

  const riskLevels = ['All', 'Low', 'Medium', 'High', 'Critical'];

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.contractType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk =
      selectedRiskLevel === 'All' || contract.overallRiskLevel === selectedRiskLevel;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">
            Audit History
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Historical archive of all Solidity contracts assessed by Legal-BERT and XAI interpretability
          </p>
        </div>

        <Link to="/analysis/new">
          <Button variant="primary" size="sm">
            + New Contract Audit
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search contracts by name, type, or keyword..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Risk Level Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {riskLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSelectedRiskLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedRiskLevel === level
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Table */}
      <Card
        className="border-slate-800 bg-slate-900/60"
        contentClassName="p-0 overflow-x-auto"
      >
        {filteredContracts.length === 0 ? (
          <EmptyState
            title="No Audits Found"
            description="No smart contracts match your search term or risk category filter."
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedRiskLevel('All');
            }}
          />
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400">
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
                  Contract & Type
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
                  Audit Date
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
                  Risk Score
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
                  Severity Level
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
                  Confidence
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredContracts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-850/40 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </span>
                        <p className="text-[11px] text-slate-400 font-normal">
                          {item.contractType}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.auditDate}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-slate-200 font-semibold">
                      {item.overallRiskScore}/100
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge riskLevel={item.overallRiskLevel} size="sm" dot />
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-300">
                    {item.confidence}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/analysis/${item.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-medium border border-slate-700"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>View XAI Audit</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default History;
