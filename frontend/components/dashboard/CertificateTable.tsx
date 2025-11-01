import type { ReactNode } from 'react';

interface Certificate {
  tokenId: number;
  recipientName: string;
  certificateType: string;
  issuedAt: Date;
  isRevoked: boolean;
}

interface CertificateTableProps {
  certificates: Certificate[];
  onView?: (tokenId: number) => void;
  onRevoke?: (tokenId: number) => void;
  isLoading?: boolean;
  pagination?: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function CertificateTable({
  certificates,
  onView,
  onRevoke,
  isLoading,
  pagination,
}: CertificateTableProps): ReactNode {
  return (
    <div>
    </div>
  );
}

