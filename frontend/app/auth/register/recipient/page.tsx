"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

export default function RegisterRecipientPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

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
      const response = await fetch("/api/auth/register/recipient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          walletAddress: address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Failed to register");
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Failed to register");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            Register as Recipient
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your account to receive and manage certificates
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
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="John Doe"
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
                placeholder="john@example.com"
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Wallet Address:</strong> {address}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Certificates will be linked to this wallet address
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
                  Register
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

