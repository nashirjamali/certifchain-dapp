import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({
        error: 'Email parameter is required',
      }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: { walletAddress: true },
    });
    
    if (!user?.walletAddress) {
      return NextResponse.json({
        success: true,
        pendingCertificates: [],
      });
    }
    
    const pendingCertificates = await prisma.certificate.findMany({
      where: {
        recipientEmail: email,
        recipientWallet: null,
        isRevoked: false,
      },
      include: {
        institution: {
          select: {
            institutionName: true,
            logo: true,
          },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      pendingCertificates,
    });
    
  } catch (error) {
    console.error('Get pending certificates error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}
