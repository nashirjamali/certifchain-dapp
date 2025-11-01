import type { ReactNode } from 'react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>;
  preview?: string;
  maxSize?: number;
  acceptedTypes?: string[];
  isLoading?: boolean;
}

export function ImageUpload({
  onUpload,
  preview,
  maxSize,
  acceptedTypes,
  isLoading,
}: ImageUploadProps): ReactNode {
  return (
    <div>
    </div>
  );
}

