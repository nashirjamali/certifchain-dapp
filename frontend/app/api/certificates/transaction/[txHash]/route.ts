import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { sepolia } from 'viem/chains';
import { CERTICHAIN_ADDRESS } from '@/lib/contracts/certichain';

const getPublicClient = () => {
  const rpcUrl = process.env.RPC_URL || process.env.NEXT_PUBLIC_RPC_URL;
  if (!rpcUrl) {
    throw new Error("RPC_URL is not configured");
  }
  return createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });
};

export async function GET(
  request: NextRequest,
  { params }: { params: { txHash: string } }
) {
  try {
    const txHash = params.txHash as `0x${string}`;
    const publicClient = getPublicClient();
    
    const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
    
    const certificateIssuedEvent = parseAbiItem(
      'event CertificateIssued(uint256 indexed tokenId, address indexed recipient, address indexed issuer, string certificateType, string tokenURI, uint256 issuedAt)'
    );
    
    const logs = receipt.logs.filter(
      (log) => log.address.toLowerCase() === CERTICHAIN_ADDRESS.toLowerCase()
    );
    
    for (const log of logs) {
      try {
        const decoded = publicClient.decodeEventLog({
          abi: [certificateIssuedEvent],
          data: log.data,
          topics: log.topics,
        });
        
        if (decoded.eventName === 'CertificateIssued') {
          return NextResponse.json({
            success: true,
            tokenId: decoded.args.tokenId?.toString(),
          });
        }
      } catch (e) {
        continue;
      }
    }
    
    return NextResponse.json({
      error: 'Certificate event not found in transaction',
    }, { status: 404 });
    
  } catch (error) {
    console.error('Get token ID from transaction error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

