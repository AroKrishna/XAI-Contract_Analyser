import Card from '../common/Card';
import { mockRiskCategoryDistribution } from '../../data/mockData';

const RiskOverview = () => {
  return (
    <Card
      title="Risk Category Breakdown"
      subtitle="Pre-deployment legal risk clause distribution across audited contracts"
      className="border-slate-800/80 bg-slate-900/60"
    >
      <div className="space-y-4">
        {mockRiskCategoryDistribution.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">{item.count} clauses</span>
                <span className="font-semibold text-slate-300 font-mono w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>

            {/* Custom Bar Indicator */}
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Model: Legal-BERT Classifier</span>
        <span className="font-mono">5 Primary Taxonomies</span>
      </div>
    </Card>
  );
};

export default RiskOverview;
