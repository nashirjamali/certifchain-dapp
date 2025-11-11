import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    
    if (!walletAddress) {
      return NextResponse.json({
        error: 'Wallet address parameter is required',
      }, { status: 400 });
    }
    
    const certificates = await prisma.certificate.findMany({
      where: {
        recipientWallet: walletAddress,
        isRevoked: false,
      },
      include: {
        institution: {
          select: {
            institutionName: true,
            logo: true,
            institutionType: true,
          },
        },
      },
      orderBy: {
        issueDate: 'desc',
      },
    });
    
    return NextResponse.json({
      success: true,
      certificates,
    });
    
  } catch (error) {
    console.error('Get user certificates error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

