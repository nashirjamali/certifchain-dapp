import type { ReactNode } from 'react';

interface StatCard {
  label: string;
  value: number;
  icon?: ReactNode;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

export function DashboardStats({ stats }: DashboardStatsProps): ReactNode {
  return (
    <div>
    </div>
  );
}

