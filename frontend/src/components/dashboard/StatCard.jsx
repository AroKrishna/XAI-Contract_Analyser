import Card from '../common/Card';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  badgeText,
  badgeVariant = 'default',
}) => {
  return (
    <Card className="border-slate-800/80 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          {value}
        </span>
        {badgeText && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              badgeVariant === 'warning'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : badgeVariant === 'danger'
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
          {trend && (
            <span
              className={`font-medium ${
                trend > 0 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {trend > 0 ? `+${trend}%` : `${trend}%`}
            </span>
          )}
          {trendLabel && <span>{trendLabel}</span>}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};

export default StatCard;
