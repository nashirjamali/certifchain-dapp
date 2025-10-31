import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

const web3AuthSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = web3AuthSchema.parse(body);
    
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {
        walletAddress: data.walletAddress,
      },
      create: {
        email: data.email,
        walletAddress: data.walletAddress,
        role: 'RECIPIENT',
      },
    });
    
    return NextResponse.json({
      success: true,
      data: user,
    }, { status: 200 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }
    
    console.error('Web3Auth error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}
