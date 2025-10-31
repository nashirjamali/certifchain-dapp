import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendCertificateEmail } from '@/lib/email/resend';
import { prisma } from '@/lib/db/prisma';

const sendEmailSchema = z.object({
  certificateId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { certificateId } = sendEmailSchema.parse(body);
    
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        institution: {
          select: {
            institutionName: true,
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
    
    await sendCertificateEmail(
      certificate.recipientEmail,
      certificate.id,
      certificate.recipientName,
      certificate.certificateType
    );
    
    await prisma.emailNotification.create({
      data: {
        certificateId: certificate.id,
        recipientEmail: certificate.recipientEmail,
        emailType: 'certificate_issued',
        status: 'sent',
        sentAt: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors,
      }, { status: 400 });
    }
    
    console.error('Send email error:', error);
    return NextResponse.json({
      error: 'Failed to send email',
    }, { status: 500 });
  }
}
