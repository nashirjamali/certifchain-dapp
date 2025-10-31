import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

const issueSchema = z.object({
  tokenId: z.string().or(z.number()).transform(Number),
  institutionId: z.string(),
  recipientName: z.string().min(2),
  recipientEmail: z.string().email(),
  recipientWallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  certificateType: z.string().min(1),
  description: z.string().optional(),
  issueDate: z.string().datetime(),
  ipfsHash: z.string(),
  ipfsImageHash: z.string().optional(),
  transactionHash: z.string(),
  blockchainNetwork: z.string().default('sepolia'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = issueSchema.parse(body);
    
    const certificate = await prisma.certificate.create({
      data: {
        tokenId: BigInt(data.tokenId),
        institutionId: data.institutionId,
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        recipientWallet: data.recipientWallet,
        certificateType: data.certificateType,
        description: data.description,
        issueDate: new Date(data.issueDate),
        ipfsHash: data.ipfsHash,
        ipfsImageHash: data.ipfsImageHash,
        transactionHash: data.transactionHash,
        blockchainNetwork: data.blockchainNetwork,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: certificate,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }
    
    console.error('Issue certificate error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}
