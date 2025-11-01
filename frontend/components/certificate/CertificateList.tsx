import type { ReactNode } from 'react';

interface Certificate {
  tokenId: number;
  recipientName: string;
  certificateType: string;
  issuedAt: Date;
  isRevoked: boolean;
  issuer: string;
}

interface CertificateListProps {
  certificates: Certificate[];
  onView?: (tokenId: number) => void;
  isLoading?: boolean;
}

export function CertificateList({ certificates, onView, isLoading }: CertificateListProps): ReactNode {
  return (
    <div>
    </div>
  );
}

