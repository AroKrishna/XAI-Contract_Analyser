const Card = ({
  children,
  title,
  subtitle,
  action,
  footer,
  className = '',
  contentClassName = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-slate-900/80 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm backdrop-blur-xs ${
        hoverEffect
          ? 'transition-all duration-200 hover:border-slate-700/80 hover:shadow-md hover:shadow-black/20'
          : ''
      } ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-100">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className={`p-6 ${contentClassName}`}>{children}</div>

      {footer && (
        <div className="px-6 py-3.5 bg-slate-950/40 border-t border-slate-800/80 text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
