'use client';
import { forwardRef, useEffect, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';

// Define props interface
// export interface IndeterminateCheckBoxFieldProps {
//   checked?: boolean;
//   indeterminate?: boolean;
//   onCheckedChange?: (checked: boolean) => void;
//   className?: string;
//   [key: string]: any; // Allow additional HTML input attributes
// }
export interface IIndeterminateCheckBoxFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const IndeterminateCheckBoxField = forwardRef<HTMLInputElement, IIndeterminateCheckBoxFieldProps>(
  ({ checked = false, indeterminate = false, onCheckedChange, className, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <input
        {...rest}
        ref={ref ?? internalRef}
        type='checkbox'
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className={`w-4 h-4 text-[#c42c18] bg-gray-100 border-gray-300 rounded focus:ring-[#c42c18] ${className ?? ''}`}
      />
    );
  }
);

IndeterminateCheckBoxField.displayName = 'IndeterminateCheckBoxField';

export { IndeterminateCheckBoxField };

// Custom Checkbox with Indeterminate Support
// const IndeterminateCheckBoxField = forwardRef<HTMLInputElement, IndeterminateCheckBoxFieldProps>((props, ref) => {
//   const { checked, indeterminate, onCheckedChange, className, ...rest } = props;
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.indeterminate = indeterminate || false;
//     }
//   }, [indeterminate]);

//   return (
//     <input
//       type='checkbox'
//       ref={ref || inputRef}
//       checked={checked || false}
//       onChange={(e) => onCheckedChange?.(e.target.checked)}
//       className={`w-4 h-4 text-[#c42c18] bg-gray-100 border-gray-300 rounded focus:ring-[#c42c18] ${className}`}
//       {...rest}
//     />
//   );
// });
// IndeterminateCheckBoxField.displayName = 'IndeterminateCheckBoxField';

// export { IndeterminateCheckBoxField };
