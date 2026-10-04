import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while processing contract data.',
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  return (
    <div
      className={`p-8 text-center flex flex-col items-center justify-center space-y-3 rounded-xl border border-red-500/20 bg-red-500/5 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-1">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h4 className="text-sm font-semibold text-red-200">{title}</h4>

      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={onRetry}
            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;
