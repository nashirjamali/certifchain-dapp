import type { ReactNode } from 'react';

interface BlockchainProofProps {
  transactionHash: string;
  blockNumber: number;
  ipfsHash: string;
  network: string;
}

export function BlockchainProof({
  transactionHash,
  blockNumber,
  ipfsHash,
  network,
}: BlockchainProofProps): ReactNode {
  return (
    <div>
    </div>
  );
}

