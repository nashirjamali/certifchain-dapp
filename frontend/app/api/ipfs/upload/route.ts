import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToIPFS, uploadMetadataToIPFS } from '@/lib/ipfs/pinata';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const metadata = formData.get('metadata');
    
    if (file) {
      const hash = await uploadImageToIPFS(file);
      return NextResponse.json({
        success: true,
        hash,
        url: `ipfs://${hash}`,
      });
    }
    
    if (metadata) {
      const metadataObj = JSON.parse(metadata as string);
      const hash = await uploadMetadataToIPFS(metadataObj);
      return NextResponse.json({
        success: true,
        hash,
        url: `ipfs://${hash}`,
      });
    }
    
    return NextResponse.json(
      { error: 'File or metadata is required' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json({
      error: 'Failed to upload to IPFS',
    }, { status: 500 });
  }
}
