import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  try {
    const tokenId = BigInt(params.tokenId);
    
    const certificate = await prisma.certificate.findUnique({
      where: { tokenId },
      include: {
        institution: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
    
    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }
    
    await prisma.verificationLog.create({
      data: {
        certificateId: certificate.id,
        verifierIp: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });
    
    await prisma.certificate.update({
      where: { id: certificate.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      data: certificate,
    });
    
  } catch (error) {
    console.error('Verify certificate error:', error);
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}
