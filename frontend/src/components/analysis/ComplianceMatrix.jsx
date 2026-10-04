import Card from '../common/Card';
import { Scale, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const ComplianceMatrix = ({ matrix = [] }) => {
  return (
    <Card
      title="Compliance Considerations Matrix"
      subtitle="Potential compliance assessment mapping based on statutory consumer and privacy standards"
      className="border-slate-800 bg-slate-900/60"
      contentClassName="p-0 overflow-x-auto"
    >
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400">
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
              Regulatory Domain
            </th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
              Compliance Assessment
            </th>
            <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[10px]">
              Audit Notes & Observations
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {matrix.map((row, idx) => {
            const isWarning = row.status === 'Warning';
            const isPass = row.status === 'Pass';

            return (
              <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                <td className="py-3.5 px-4 font-medium text-slate-200 flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{row.area}</span>
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      isWarning
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : isPass
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isWarning ? (
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                    )}
                    {row.assessment}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-300 leading-relaxed max-w-md">
                  {row.note}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mandatory Non-Guarantee Disclaimer */}
      <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
        <AlertCircle className="w-4 h-4 text-amber-400/90 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-slate-300">Statutory Notice:</strong> This assessment evaluates potential compliance risks based on automated heuristics and Legal-BERT clause classification. It does not provide legal opinions, guarantee regulatory compliance under any jurisdiction, or replace official legal certification.
        </p>
      </div>
    </Card>
  );
};

export default ComplianceMatrix;
