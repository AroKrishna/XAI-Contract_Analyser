import Card from '../common/Card';
import Badge from '../common/Badge';
import { Lightbulb, ShieldCheck, AlertCircle } from 'lucide-react';

const RecommendationCard = ({ recommendations = [] }) => {
  return (
    <Card
      title="Actionable Remediation Guidance"
      subtitle="Suggested code refactorings and safer alternatives to resolve identified legal-risk flags"
      className="border-slate-800 bg-slate-900/60"
    >
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3.5 hover:border-slate-700 transition-colors"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-slate-100">{rec.title}</h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                  {rec.category}
                </span>
                <Badge riskLevel={rec.riskLevel} size="sm" dot />
              </div>
            </div>

            {/* Flagged Clause */}
            <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-xs">
              <div className="flex items-center gap-1.5 text-[11px] text-red-400 font-semibold mb-1">
                <AlertCircle className="w-3.5 h-3.5" /> Flagged Clause / Pattern:
              </div>
              <code className="text-red-300 font-mono">{rec.clause}</code>
            </div>

            {/* Recommendation / Safer Alternative */}
            <div className="p-3.5 rounded-lg bg-blue-950/20 border border-blue-900/40 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] text-blue-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Recommended Safer Implementation:
              </div>
              <p className="text-slate-200 leading-relaxed pl-5">
                {rec.suggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendationCard;
