import type { ReactNode } from 'react';

interface Action {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
}

interface QuickActionsProps {
  actions: Action[];
}

export function QuickActions({ actions }: QuickActionsProps): ReactNode {
  return (
    <div>
    </div>
  );
}

