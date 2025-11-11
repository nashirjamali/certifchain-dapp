import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

const registerInstitutionSchema = z.object({
  email: z.string().email(),
  institutionName: z.string().min(2),
  institutionType: z.string().min(1),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  logo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerInstitutionSchema.parse(body);
    
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress: data.walletAddress },
    });
    
    if (existingUser) {
      if (existingUser.role === 'INSTITUTION') {
        return NextResponse.json({
          error: 'Institution already registered with this wallet',
        }, { status: 400 });
      }
      
      if (existingUser.role === 'RECIPIENT') {
        return NextResponse.json({
          error: 'This wallet is already registered as a recipient. Please use a different wallet for institution registration.',
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
        role: 'INSTITUTION',
      },
    });
    
    const institution = await prisma.institution.create({
      data: {
        userId: user.id,
        institutionName: data.institutionName,
        institutionType: data.institutionType,
        walletAddress: data.walletAddress,
        website: data.website || null,
        logo: data.logo || null,
        isVerified: false,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: {
        user,
        institution,
      },
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }
    
    console.error('Register institution error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

