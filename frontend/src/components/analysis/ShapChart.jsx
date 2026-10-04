import Card from '../common/Card';
import { ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

const ShapChart = ({ explanations = [] }) => {
  return (
    <Card
      title="SHAP Token Attribution Analysis"
      subtitle="Shapley Additive Explanations: Marginal feature contribution of tokens to the legal-risk prediction"
      className="border-slate-800 bg-slate-900/60"
    >
      <div className="space-y-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          Tokens with <span className="text-orange-400 font-semibold">positive contribution (+)</span> pushed the classifier toward a higher legal-risk verdict. Tokens with <span className="text-emerald-400 font-semibold">negative contribution (-)</span> decreased risk.
        </p>

        <div className="space-y-3 pt-2">
          {explanations.map((item, idx) => {
            const isPositive = item.impact === 'positive';
            const absVal = Math.abs(item.contribution);
            const barWidthPercent = Math.min(100, Math.round(absVal * 160));

            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">
                      {item.token}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      [{item.category}]
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {isPositive ? (
                      <span className="flex items-center gap-1 text-orange-400 font-semibold">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        +{absVal.toFixed(2)} (Risk Driver)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        -{absVal.toFixed(2)} (Mitigating)
                      </span>
                    )}
                  </div>
                </div>

                {/* Contribution Bar */}
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPositive ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${barWidthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Method: Game-theoretic KernelSHAP attribution
          </span>
          <span>Sample baseline: 500 background sequences</span>
        </div>
      </div>
    </Card>
  );
};

export default ShapChart;
