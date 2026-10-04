import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/25 active:bg-blue-700 border border-blue-500/30',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:bg-slate-850',
    outline:
      'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 active:bg-slate-750',
    ghost:
      'bg-transparent hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 active:bg-slate-800',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-sm shadow-red-600/25 border border-red-500/30',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const currentVariant = variants[variant] || variants.primary;
  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${currentVariant} ${currentSize} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};

export default Button;
