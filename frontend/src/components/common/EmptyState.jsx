import { FolderSearch } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = FolderSearch,
  title = 'No items found',
  description = 'There are no records matching your current filter criteria.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`p-12 text-center flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-1">
        <Icon className="w-6 h-6" />
      </div>

      <h4 className="text-sm font-semibold text-slate-200">{title}</h4>

      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
