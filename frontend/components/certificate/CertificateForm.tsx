import type { ReactNode } from 'react';

interface CertificateFormData {
  recipientName: string;
  recipientEmail: string;
  recipientWallet?: `0x${string}`;
  certificateType: string;
  description: string;
  issueDate: Date;
  image?: File;
}

interface CertificateFormProps {
  onSubmit: (data: CertificateFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CertificateForm({ onSubmit, isLoading }: CertificateFormProps): ReactNode {
  return (
    <form>
    </form>
  );
}

