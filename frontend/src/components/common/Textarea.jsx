const Textarea = ({
  label,
  id,
  rows = 4,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-slate-900 border rounded-lg text-sm text-slate-100 placeholder-slate-500 font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 disabled:opacity-50 disabled:bg-slate-950 px-3.5 py-2.5 ${
          error
            ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/40'
            : 'border-slate-800 hover:border-slate-700'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Textarea;
