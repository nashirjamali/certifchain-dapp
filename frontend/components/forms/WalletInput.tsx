import type { ReactNode } from 'react';

interface WalletInputProps {
  value: string;
  onChange: (value: `0x${string}`) => void;
  onGenerate?: () => Promise<`0x${string}`>;
  error?: string;
  label?: string;
}

export function WalletInput({
  value,
  onChange,
  onGenerate,
  error,
  label,
}: WalletInputProps): ReactNode {
  return (
    <div>
    </div>
  );
}

