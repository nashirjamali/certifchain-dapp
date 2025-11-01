import type { ReactNode } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ value, onChange, placeholder, onSearch }: SearchBarProps): ReactNode {
  return (
    <div>
    </div>
  );
}

