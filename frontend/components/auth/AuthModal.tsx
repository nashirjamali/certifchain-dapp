import type { ReactNode } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export function AuthModal({ isOpen, onClose, title = 'Connect Wallet', children }: AuthModalProps) {
  return (
    <div>
    </div>
  );
}

