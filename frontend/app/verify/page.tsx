"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { useVerifyCertificate } from "@/hooks/useCertificateContract";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tokenId, setTokenId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
    certificate?: any;
  } | null>(null);
  const [tokenIdBigInt, setTokenIdBigInt] = useState<bigint | undefined>();

  const { isValid: blockchainValid, isLoading: isLoadingBlockchain } = useVerifyCertificate(tokenIdBigInt);

  useEffect(() => {
    const tokenIdParam = searchParams.get("tokenId");
    if (tokenIdParam) {
      setTokenId(tokenIdParam);
    }
  }, [searchParams]);

  const handleVerify = async () => {
    if (!tokenId.trim()) {
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const tokenIdNum = BigInt(tokenId);
      setTokenIdBigInt(tokenIdNum);

      const response = await fetch(`/api/certificates/verify/${tokenId}`);
      const data = await response.json();

      if (data.success && data.data) {
        const certificate = data.data;
        const isValid = !certificate.isRevoked && blockchainValid !== false;

        setVerificationResult({
          isValid,
          message: isValid
            ? "Certificate is valid and authentic"
            : certificate.isRevoked
            ? "Certificate has been revoked"
            : "Certificate verification failed",
          certificate,
        });
      } else {
        setVerificationResult({
          isValid: false,
          message: "Certificate not found",
        });
      }
    } catch (error) {
      setVerificationResult({
        isValid: false,
        message: "Failed to verify certificate",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Verify Certificate
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter the certificate token ID to verify its authenticity
          </p>
        </div>

        <div className="space-y-4 p-6 border border-border rounded-lg bg-background">
          <div className="space-y-2">
            <label htmlFor="tokenId" className="text-sm font-medium text-foreground">
              Certificate Token ID
            </label>
            <input
              id="tokenId"
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleVerify();
                }
              }}
              placeholder="Enter token ID (e.g., 12345)"
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={!tokenId.trim() || isVerifying || isLoadingBlockchain}
            className="w-full"
            size="lg"
          >
            {isVerifying || isLoadingBlockchain ? (
              <>
                <Search className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Verify Certificate
              </>
            )}
          </Button>
        </div>

        {verificationResult && (
          <div
            className={`p-6 border rounded-lg ${
              verificationResult.isValid
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-red-500 bg-red-50 dark:bg-red-950/20"
            }`}
          >
            <div className="flex items-start gap-3">
              {verificationResult.isValid ? (
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 mt-0.5" />
              )}
              <div className="flex-1">
                <h3
                  className={`font-semibold mb-1 ${
                    verificationResult.isValid ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"
                  }`}
                >
                  {verificationResult.isValid ? "Verification Successful" : "Verification Failed"}
                </h3>
                <p
                  className={`text-sm mb-3 ${
                    verificationResult.isValid ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {verificationResult.message}
                </p>
                {verificationResult.isValid && verificationResult.certificate && (
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Recipient:</strong> {verificationResult.certificate.recipientName}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Type:</strong> {verificationResult.certificate.certificateType}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Issuer:</strong> {verificationResult.certificate.institution.institutionName}
                    </p>
                  </div>
                )}
                {verificationResult.isValid && tokenId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/certificate/${tokenId}`)}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Certificate Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border border-border rounded-lg bg-background space-y-3">
          <h2 className="text-xl font-semibold">How to Verify</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter the certificate token ID in the field above</li>
            <li>Click "Verify Certificate" to check authenticity</li>
            <li>View the verification results instantly</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
