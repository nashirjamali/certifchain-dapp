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
    
    const user = await prisma.user.findUnique({
      where: { walletAddress },
      select: {
        id: true,
        email: true,
        role: true,
        walletAddress: true,
        institution: {
          select: {
            id: true,
            institutionName: true,
          },
        },
      },
    });
    
    if (!user) {
      return NextResponse.json({
        success: true,
        user: null,
      }, { status: 200 });
    }
    
    return NextResponse.json({
      success: true,
      user,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Get user by wallet error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

