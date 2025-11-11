import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

const registerRecipientSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerRecipientSchema.parse(body);
    
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress: data.walletAddress },
    });
    
    if (existingUser) {
      if (existingUser.role === 'RECIPIENT') {
        return NextResponse.json({
          error: 'Recipient already registered with this wallet',
        }, { status: 400 });
      }
      
      if (existingUser.role === 'INSTITUTION') {
        return NextResponse.json({
          error: 'This wallet is already registered as an institution. Please use a different wallet for recipient registration.',
        }, { status: 400 });
      }
    }
    
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existingEmail) {
      return NextResponse.json({
        error: 'Email already registered',
      }, { status: 400 });
    }
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        walletAddress: data.walletAddress,
        role: 'RECIPIENT',
      },
    });
    
    return NextResponse.json({
      success: true,
      data: user,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }
    
    console.error('Register recipient error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

