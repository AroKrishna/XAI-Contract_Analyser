import { RISK_LEVEL_CONFIG } from '../../utils/constants';

const Badge = ({
  children,
  variant = 'default',
  riskLevel,
  size = 'md',
  dot = false,
  className = '',
}) => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  let badgeStyle = variants[variant] || variants.default;
  let dotColor = 'bg-slate-400';

  if (riskLevel && RISK_LEVEL_CONFIG[riskLevel]) {
    const config = RISK_LEVEL_CONFIG[riskLevel];
    badgeStyle = config.badgeClass;
    dotColor = config.dotClass;
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${badgeStyle} ${sizes[size] || sizes.md} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {children || (riskLevel ? RISK_LEVEL_CONFIG[riskLevel]?.label || riskLevel : null)}
    </span>
  );
};

export default Badge;
