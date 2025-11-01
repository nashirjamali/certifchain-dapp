import type { ReactNode } from 'react';

interface CertificateCardProps {
  tokenId: number;
  recipientName: string;
  certificateType: string;
  issuedAt: Date;
  isRevoked: boolean;
  issuer: string;
  onView?: () => void;
}

export function CertificateCard({
  tokenId,
  recipientName,
  certificateType,
  issuedAt,
  isRevoked,
  issuer,
  onView,
}: CertificateCardProps): ReactNode {
  return (
    <div>
    </div>
  );
}

