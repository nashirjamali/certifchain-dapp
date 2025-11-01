"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, CheckCircle2 } from "lucide-react";

export default function CertificateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tokenId = params.tokenId as string;

  const mockCertificate = {
    tokenId: tokenId,
    recipientName: "John Doe",
    recipientEmail: "john@example.com",
    recipientWallet: "0x1234567890123456789012345678901234567890",
    certificateType: "Course Completion",
    description: "Successfully completed the Advanced Blockchain Development course",
    issueDate: "2024-01-15",
    issuer: "CertiChain Academy",
    issuerAddress: "0x9876543210987654321098765432109876543210",
    ipfsHash: "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    isRevoked: false,
    verified: true,
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="border border-border rounded-lg bg-background p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">
                  Certificate #{mockCertificate.tokenId}
                </h1>
                {mockCertificate.verified && (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
              </div>
              <p className="text-xl text-muted-foreground">
                {mockCertificate.certificateType}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Recipient
                </label>
                <p className="text-base font-medium text-foreground mt-1">
                  {mockCertificate.recipientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockCertificate.recipientEmail}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Issue Date
                </label>
                <p className="text-base text-foreground mt-1">
                  {new Date(mockCertificate.issueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Issuer
                </label>
                <p className="text-base text-foreground mt-1">
                  {mockCertificate.issuer}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {mockCertificate.issuerAddress.slice(0, 10)}...{mockCertificate.issuerAddress.slice(-8)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <p className="mt-1">
                  {mockCertificate.isRevoked ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      Revoked
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  )}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Recipient Wallet
                </label>
                <p className="text-xs font-mono text-foreground mt-1 break-all">
                  {mockCertificate.recipientWallet}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  IPFS Hash
                </label>
                <p className="text-xs font-mono text-foreground mt-1 break-all">
                  {mockCertificate.ipfsHash}
                </p>
              </div>
            </div>
          </div>

          {mockCertificate.description && (
            <div className="pt-6 border-t border-border">
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <p className="text-base text-foreground mt-2">
                {mockCertificate.description}
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-border">
            <label className="text-sm font-medium text-muted-foreground">
              Transaction Hash
            </label>
            <p className="text-xs font-mono text-foreground mt-1 break-all">
              {mockCertificate.transactionHash}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/verify?tokenId=${tokenId}`)}
          >
            Verify Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}

