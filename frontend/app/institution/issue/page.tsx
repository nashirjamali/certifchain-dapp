"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

export default function IssueCertificatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    recipientWallet: "",
    certificateType: "",
    description: "",
    issueDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/institution/dashboard");
    } catch (error) {
      console.error("Failed to issue certificate:", error);
    } finally {
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
              disabled={isSubmitting}
              className="flex-1 md:flex-initial"
              size="lg"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Issue Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

