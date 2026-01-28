import  { forwardRef, useMemo } from 'react';
import { SELECT_STYLES } from '../constants/componentConfig';
import type { SelectProps } from '../types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    const selectClasses = useMemo(() => {
      const stateClass = error ? SELECT_STYLES.error : SELECT_STYLES.normal;
      return `${SELECT_STYLES.base} ${stateClass}`;
    }, [error]);
    
    return (
      <div className={`relative ${className}`}>
        {label && (
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <select ref={ref} className={selectClasses} {...props}>
            {options.map((option) => (
              <option key={option.value} value={option.value} className="py-2">
                {option.label}
              </option>
            ))}
          </select>
          
        
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p className="mt-1.5 ml-1 text-xs font-medium text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
            <span className="shrink-0">⚠️</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
