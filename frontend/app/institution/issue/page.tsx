"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useIssueCertificate } from "@/hooks/useCertificateContract";
import { uploadImageToIPFS, uploadMetadataToIPFS } from "@/lib/ipfs/pinata";

export default function IssueCertificatePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { issueCertificate, hash, isPending, isConfirming, isSuccess, error } = useIssueCertificate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    recipientWallet: "",
    certificateType: "",
    description: "",
    issueDate: new Date().toISOString().split("T")[0],
  });
  const [certificateImage, setCertificateImage] = useState<File | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      router.push("/auth/login");
    }
  }, [isConnected, address, router]);

  useEffect(() => {
    if (isSuccess && hash) {
      setTimeout(() => {
        handleSaveToBackend(hash);
      }, 2000);
    }
  }, [isSuccess, hash]);

  const handleSaveToBackend = async (transactionHash: string) => {
    try {
      const userResponse = await fetch(`/api/auth/user?walletAddress=${address}`);
      const userData = await userResponse.json();
      
      if (!userData.success || !userData.user || !userData.user.institution) {
        setErrorMessage("Institution not found. Please ensure you're registered as an institution.");
        setIsSubmitting(false);
        return;
      }

      const institutionId = userData.user.institution.id;
      let ipfsHash = "";
      let ipfsImageHash = "";

      if (certificateImage) {
        setUploadingImage(true);
        ipfsImageHash = await uploadImageToIPFS(certificateImage);
        setUploadingImage(false);
      }

      const metadata = {
        name: formData.certificateType,
        description: formData.description || `${formData.certificateType} certificate for ${formData.recipientName}`,
        image: ipfsImageHash ? `ipfs://${ipfsImageHash}` : undefined,
        attributes: [
          { trait_type: "Recipient", value: formData.recipientName },
          { trait_type: "Certificate Type", value: formData.certificateType },
          { trait_type: "Issue Date", value: formData.issueDate },
        ],
      };

      ipfsHash = await uploadMetadataToIPFS(metadata);

      const tokenId = await getTokenIdFromTransaction(transactionHash);

      const response = await fetch("/api/certificates/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId: tokenId.toString(),
          institutionId,
          recipientName: formData.recipientName,
          recipientEmail: formData.recipientEmail,
          recipientWallet: formData.recipientWallet || null,
          certificateType: formData.certificateType,
          description: formData.description,
          issueDate: new Date(formData.issueDate).toISOString(),
          ipfsHash: `ipfs://${ipfsHash}`,
          ipfsImageHash: ipfsImageHash ? `ipfs://${ipfsImageHash}` : null,
          transactionHash,
          blockchainNetwork: "sepolia",
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/certificate/${tokenId}`);
      } else {
        setErrorMessage(data.error || "Failed to save certificate to database");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error saving to backend:", error);
      setErrorMessage("Failed to save certificate to database");
      setIsSubmitting(false);
    }
  };

  const getTokenIdFromTransaction = async (txHash: string): Promise<bigint> => {
    let retries = 5;
    while (retries > 0) {
      try {
        const response = await fetch(`/api/certificates/transaction/${txHash}`);
        const data = await response.json();
        if (data.success && data.tokenId) {
          return BigInt(data.tokenId);
        }
      } catch (error) {
        console.error("Error fetching token ID:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      retries--;
    }
    throw new Error("Failed to get token ID from transaction");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (!formData.recipientWallet && !formData.recipientEmail) {
        setErrorMessage("Either recipient wallet address or email is required");
        setIsSubmitting(false);
        return;
      }

      const recipientAddress = formData.recipientWallet || address!;

      if (!/^0x[a-fA-F0-9]{40}$/i.test(recipientAddress)) {
        setErrorMessage("Invalid wallet address format");
        setIsSubmitting(false);
        return;
      }

      const metadata = {
        name: formData.certificateType,
        description: formData.description || `${formData.certificateType} certificate for ${formData.recipientName}`,
        attributes: [
          { trait_type: "Recipient", value: formData.recipientName },
          { trait_type: "Certificate Type", value: formData.certificateType },
          { trait_type: "Issue Date", value: formData.issueDate },
        ],
      };

      let ipfsHash = "";
      if (certificateImage) {
        setUploadingImage(true);
        const imageHash = await uploadImageToIPFS(certificateImage);
        metadata.image = `ipfs://${imageHash}`;
        setUploadingImage(false);
      }

      ipfsHash = await uploadMetadataToIPFS(metadata);
      const tokenURI = `ipfs://${ipfsHash}`;

      await issueCertificate(recipientAddress as `0x${string}`, formData.certificateType, tokenURI);
    } catch (error: any) {
      console.error("Failed to issue certificate:", error);
      setErrorMessage(error.message || "Failed to issue certificate");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateImage(e.target.files[0]);
    }
  };

  if (!isConnected || !address) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/institution/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Issue Certificate
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and issue a new certificate on the blockchain
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-950/20">
            <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
          </div>
        )}

        {error && (
          <div className="p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-950/20">
            <p className="text-sm text-red-800 dark:text-red-200">
              Transaction error: {error.message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-background space-y-6">
            <div className="space-y-2">
              <label htmlFor="recipientName" className="text-sm font-medium text-foreground">
                Recipient Name <span className="text-destructive">*</span>
              </label>
              <input
                id="recipientName"
                name="recipientName"
                type="text"
                required
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="recipientEmail" className="text-sm font-medium text-foreground">
                Recipient Email <span className="text-destructive">*</span>
              </label>
              <input
                id="recipientEmail"
                name="recipientEmail"
                type="email"
                required
                value={formData.recipientEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="recipientWallet" className="text-sm font-medium text-foreground">
                Recipient Wallet Address (Optional)
              </label>
              <input
                id="recipientWallet"
                name="recipientWallet"
                type="text"
                value={formData.recipientWallet}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                placeholder="0x..."
              />
              <p className="text-xs text-muted-foreground">
                Leave empty if recipient doesn't have a wallet. They can claim it later.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="certificateType" className="text-sm font-medium text-foreground">
                Certificate Type <span className="text-destructive">*</span>
              </label>
              <select
                id="certificateType"
                name="certificateType"
                required
                value={formData.certificateType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select type...</option>
                <option value="Course Completion">Course Completion</option>
                <option value="Professional Certification">Professional Certification</option>
                <option value="Diploma">Diploma</option>
                <option value="Achievement">Achievement</option>
                <option value="Training">Training</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Enter certificate description..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="certificateImage" className="text-sm font-medium text-foreground">
                Certificate Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="certificateImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="certificateImage"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:bg-muted"
                >
                  <Upload className="h-4 w-4" />
                  {certificateImage ? certificateImage.name : "Upload Image"}
                </label>
                {certificateImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setCertificateImage(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="issueDate" className="text-sm font-medium text-foreground">
                Issue Date <span className="text-destructive">*</span>
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="date"
                required
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/institution/dashboard")}
              className="flex-1 md:flex-initial"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isPending || isConfirming || uploadingImage}
              className="flex-1 md:flex-initial"
              size="lg"
            >
              {isSubmitting || isPending || isConfirming || uploadingImage ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Issue Certificate
                </>
              )}
            </Button>
          </div>

          {(isPending || isConfirming) && (
            <div className="p-4 border border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {isPending ? "Waiting for transaction approval..." : "Transaction confirmed! Saving to database..."}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
