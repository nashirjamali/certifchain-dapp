"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, CheckCircle2 } from "lucide-react";
import { useGetCertificate, useVerifyCertificate } from "@/hooks/useCertificateContract";

interface Certificate {
  id: string;
  tokenId: string;
  recipientName: string;
  recipientEmail: string;
  recipientWallet?: string;
  certificateType: string;
  description?: string;
  issueDate: string;
  ipfsHash: string;
  ipfsImageHash?: string;
  transactionHash: string;
  isRevoked: boolean;
  institution: {
    institutionName: string;
    logo?: string;
    walletAddress: string;
  };
}

export default function CertificateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tokenId = params.tokenId as string;
  const tokenIdBigInt = tokenId ? BigInt(tokenId) : undefined;

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { certificate: blockchainCert, isLoading: isLoadingBlockchain } = useGetCertificate(tokenIdBigInt);
  const { isValid: blockchainValid } = useVerifyCertificate(tokenIdBigInt);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/verify/${tokenId}`);
        const data = await response.json();

        if (data.success && data.data) {
          setCertificate(data.data);
        } else {
          setError("Certificate not found");
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
        setError("Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    if (tokenId) {
      fetchCertificate();
    }
  }, [tokenId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error || "Certificate not found"}</p>
            <Button variant="outline" onClick={() => router.push("/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isVerified = !certificate.isRevoked && blockchainValid !== false;

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
                  Certificate #{certificate.tokenId}
                </h1>
                {isVerified && (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
              </div>
              <p className="text-xl text-muted-foreground">
                {certificate.certificateType}
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

          {certificate.ipfsImageHash && (
            <div className="border border-border rounded-lg overflow-hidden">
              <img
                src={certificate.ipfsImageHash.replace("ipfs://", "https://ipfs.io/ipfs/")}
                alt={certificate.certificateType}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Recipient
                </label>
                <p className="text-base font-medium text-foreground mt-1">
                  {certificate.recipientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {certificate.recipientEmail}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Issue Date
                </label>
                <p className="text-base text-foreground mt-1">
                  {new Date(certificate.issueDate).toLocaleDateString("en-US", {
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
                  {certificate.institution.institutionName}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {certificate.institution.walletAddress.slice(0, 10)}...{certificate.institution.walletAddress.slice(-8)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <p className="mt-1">
                  {certificate.isRevoked ? (
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

              {certificate.recipientWallet && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Recipient Wallet
                  </label>
                  <p className="text-xs font-mono text-foreground mt-1 break-all">
                    {certificate.recipientWallet}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  IPFS Hash
                </label>
                <p className="text-xs font-mono text-foreground mt-1 break-all">
                  {certificate.ipfsHash}
                </p>
              </div>
            </div>
          </div>

          {certificate.description && (
            <div className="pt-6 border-t border-border">
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <p className="text-base text-foreground mt-2">
                {certificate.description}
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-border">
            <label className="text-sm font-medium text-muted-foreground">
              Transaction Hash
            </label>
            <p className="text-xs font-mono text-foreground mt-1 break-all">
              {certificate.transactionHash}
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
