import { forwardRef } from 'react';
import type { InputProps } from '../types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-lg shadow-sm
            outline-none transition-all duration-200
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 text-gray-900 dark:text-white' 
              : 'border-gray-200 dark:border-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 text-gray-900 dark:text-white'
            }
            placeholder:text-gray-400 dark:placeholder:text-slate-500
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
