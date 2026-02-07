import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  className = '',
  id,
  helperText,
  ...props
}) => {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const inputClasses = `
    border border-gray-300 rounded-md
    py-2.5 px-3
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
    placeholder:text-gray-400
    text-gray-900
    transition-colors duration-150
    ${error ? 'border-red-500 focus:ring-red-400' : ''}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-5`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          className={inputClasses}
          aria-describedby={errorId || helperId}
          aria-invalid={!!error}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;