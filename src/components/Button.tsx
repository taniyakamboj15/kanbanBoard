import  { useMemo } from 'react';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../constants/componentConfig';
import type { ButtonProps } from '../types';


export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const buttonClasses = useMemo(() => {
    const base = 'rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
    const variantClass = BUTTON_VARIANTS[variant];
    const sizeClass = BUTTON_SIZES[size];
    return `${base} ${variantClass} ${sizeClass} ${className}`;
  }, [variant, size, className]);

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
