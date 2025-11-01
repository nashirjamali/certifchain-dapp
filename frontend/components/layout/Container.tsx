import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

export function Container({
  children,
  className = '',
  maxWidth = 'full',
}: ContainerProps) {
  const maxWidthClass = maxWidthClasses[maxWidth];

  return (
    <div className={`container mx-auto px-4 ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
}

