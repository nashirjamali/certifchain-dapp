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
    
    const institution = await prisma.institution.findUnique({
      where: { walletAddress },
      select: { id: true },
    });
    
    if (!institution) {
      return NextResponse.json({
        success: true,
        certificates: [],
        stats: {
          totalIssued: 0,
          thisMonth: 0,
          revoked: 0,
          activeRate: 100,
        },
      });
    }
    
    const certificates = await prisma.certificate.findMany({
      where: {
        institutionId: institution.id,
      },
      include: {
        institution: {
          select: {
            institutionName: true,
            logo: true,
          },
        },
      },
      orderBy: {
        issueDate: 'desc',
      },
    });
    
    const totalIssued = certificates.length;
    const thisMonth = certificates.filter((cert) => {
      const issueDate = new Date(cert.issueDate);
      const now = new Date();
      return (
        issueDate.getMonth() === now.getMonth() &&
        issueDate.getFullYear() === now.getFullYear()
      );
    }).length;
    const revoked = certificates.filter((cert) => cert.isRevoked).length;
    const activeRate =
      totalIssued > 0
        ? Math.round(((totalIssued - revoked) / totalIssued) * 100)
        : 100;
    
    return NextResponse.json({
      success: true,
      certificates,
      stats: {
        totalIssued,
        thisMonth,
        revoked,
        activeRate,
      },
    });
    
  } catch (error) {
    console.error('Get institution certificates error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

