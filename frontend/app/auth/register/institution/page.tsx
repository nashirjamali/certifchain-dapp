"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Upload } from "lucide-react";

export default function RegisterInstitutionPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    email: "",
    website: "",
    description: "",
  });
  const [logo, setLogo] = useState<File | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      router.push("/auth/login");
    }
  }, [isConnected, address, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let logoUrl = null;
      if (logo) {
        const formData = new FormData();
        formData.append("file", logo);
        const uploadResponse = await fetch("/api/ipfs/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          logoUrl = uploadData.url;
        }
      }

      const response = await fetch("/api/auth/register/institution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          walletAddress: address,
          logo: logoUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/institution/dashboard");
      } else {
        setError(data.error || "Failed to register institution");
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Failed to register institution");
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
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
            onClick={() => router.push("/auth/register")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Register as Institution
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete your institution profile to start issuing certificates
          </p>
        </div>

        {error && (
          <div className="p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-950/20">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-background space-y-6">
            <div className="space-y-2">
              <label htmlFor="institutionName" className="text-sm font-medium text-foreground">
                Institution Name <span className="text-destructive">*</span>
              </label>
              <input
                id="institutionName"
                name="institutionName"
                type="text"
                required
                value={formData.institutionName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="CertiChain Academy"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="contact@institution.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="institutionType" className="text-sm font-medium text-foreground">
                Institution Type <span className="text-destructive">*</span>
              </label>
              <select
                id="institutionType"
                name="institutionType"
                required
                value={formData.institutionType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select type...</option>
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="Training Center">Training Center</option>
                <option value="Certification Body">Certification Body</option>
                <option value="Online Platform">Online Platform</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium text-foreground">
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://institution.com"
              />
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
                placeholder="Brief description of your institution..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="logo" className="text-sm font-medium text-foreground">
                Institution Logo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background text-foreground cursor-pointer hover:bg-muted"
                >
                  <Upload className="h-4 w-4" />
                  {logo ? logo.name : "Upload Logo"}
                </label>
                {logo && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setLogo(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Wallet Address:</strong> {address}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This wallet will be used to issue certificates on the blockchain
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/auth/register")}
              className="flex-1 md:flex-initial"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-initial"
              size="lg"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Register Institution
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

