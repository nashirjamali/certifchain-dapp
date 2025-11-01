import type { ReactNode } from 'react';

interface Certificate {
  tokenId: number;
  recipientName: string;
  recipientEmail: string;
  certificateType: string;
  description?: string;
  issueDate: Date;
  ipfsHash: string;
  ipfsImageHash?: string;
  transactionHash: string;
  issuer: string;
  isRevoked: boolean;
}

interface CertificateDisplayProps {
  certificate: Certificate;
}

export function CertificateDisplay({ certificate }: CertificateDisplayProps): ReactNode {
  return (
    <div>
    </div>
  );
}

