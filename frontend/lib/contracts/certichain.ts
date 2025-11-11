export const CERTICHAIN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const CERTICHAIN_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'string', name: 'certificateType', type: 'string' },
      { internalType: 'string', name: 'uri', type: 'string' },
    ],
    name: 'issueCertificate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'recipients', type: 'address[]' },
      { internalType: 'string[]', name: 'certificateTypes', type: 'string[]' },
      { internalType: 'string[]', name: 'uris', type: 'string[]' },
    ],
    name: 'batchIssueCertificates',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'revokeCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'verifyCertificate',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getCertificate',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'address', name: 'issuer', type: 'address' },
          { internalType: 'string', name: 'certificateType', type: 'string' },
          { internalType: 'uint256', name: 'issuedAt', type: 'uint256' },
          { internalType: 'bool', name: 'isRevoked', type: 'bool' },
        ],
        internalType: 'struct CertiChain.Certificate',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }],
    name: 'getRecipientCertificates',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'issuer', type: 'address' }],
    name: 'getIssuerCertificates',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getTokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
