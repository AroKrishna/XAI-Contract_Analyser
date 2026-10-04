import Card from '../common/Card';
import { Sparkles, Code2 } from 'lucide-react';

const LimeExplanation = ({ explanations = [] }) => {
  return (
    <Card
      title="LIME Local Interpretable Explanations"
      subtitle="Local Interpretable Model-agnostic Explanations: Surrogate model around specific clause boundaries"
      className="border-slate-800 bg-slate-900/60"
    >
      <div className="space-y-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          LIME perturbs local code segments and observes classification shifts to identify which individual statements are most decisive in assigning risk within that specific contract scope.
        </p>

        <div className="space-y-4 pt-1">
          {explanations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Code2 className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    Line {item.line}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="text-slate-400">Local Weight:</span>
                  <span className="text-purple-400 font-semibold">
                    {(item.weight * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Monospace Code Preview */}
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-purple-900/40">
                {item.code}
              </div>

              {/* Surrogate Interpretation */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 p-2.5 rounded border border-slate-800/60">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Surrogate: Ridge regression over 1,000 perturbed variations
          </span>
          <span>Kernel bandwidth: 0.75</span>
        </div>
      </div>
    </Card>
  );
};

export default LimeExplanation;
