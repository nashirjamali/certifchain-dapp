import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { CERTICHAIN_ABI, CERTICHAIN_ADDRESS } from '@/lib/contracts/certichain';
import { Address } from 'viem';

export function useIssueCertificate() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const issueCertificate = async (
    recipient: Address,
    certificateType: string,
    tokenURI: string
  ) => {
    writeContract({
      address: CERTICHAIN_ADDRESS,
      abi: CERTICHAIN_ABI,
      functionName: 'issueCertificate',
      args: [recipient, certificateType, tokenURI],
    });
  };

  return {
    issueCertificate,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useVerifyCertificate(tokenId: bigint | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: CERTICHAIN_ADDRESS,
    abi: CERTICHAIN_ABI,
    functionName: 'verifyCertificate',
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId,
    },
  });

  return {
    isValid: data as boolean | undefined,
    isLoading,
    error,
  };
}

export function useGetCertificate(tokenId: bigint | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: CERTICHAIN_ADDRESS,
    abi: CERTICHAIN_ABI,
    functionName: 'getCertificate',
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId,
    },
  });

  return {
    certificate: data as
      | {
          tokenId: bigint;
          recipient: Address;
          issuer: Address;
          certificateType: string;
          issuedAt: bigint;
          isRevoked: boolean;
        }
      | undefined,
    isLoading,
    error,
  };
}

export function useRevokeCertificate() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const revokeCertificate = async (tokenId: bigint) => {
    writeContract({
      address: CERTICHAIN_ADDRESS,
      abi: CERTICHAIN_ABI,
      functionName: 'revokeCertificate',
      args: [tokenId],
    });
  };

  return {
    revokeCertificate,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

