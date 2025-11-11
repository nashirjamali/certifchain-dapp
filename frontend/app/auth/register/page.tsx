"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [selectedRole, setSelectedRole] = useState<"INSTITUTION" | "RECIPIENT" | null>(null);

  if (!isConnected || !address) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Please connect your wallet first to register.
          </p>
          <Button onClick={() => router.push("/auth/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    if (selectedRole === "INSTITUTION") {
      router.push("/auth/register/institution");
    } else if (selectedRole === "RECIPIENT") {
      router.push("/auth/register/recipient");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/auth/login")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Create Your Account
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setSelectedRole("INSTITUTION")}
            className={`p-8 border-2 rounded-lg transition-all text-left ${
              selectedRole === "INSTITUTION"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${
                  selectedRole === "INSTITUTION"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <Building2 className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Institution</h3>
                <p className="text-sm text-muted-foreground">
                  Issue and manage certificates for your organization. Perfect for
                  schools, universities, training centers, and certification bodies.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Issue certificates on blockchain</li>
                  <li>• Manage certificate database</li>
                  <li>• Track issuance statistics</li>
                  <li>• Verify certificate authenticity</li>
                </ul>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole("RECIPIENT")}
            className={`p-8 border-2 rounded-lg transition-all text-left ${
              selectedRole === "RECIPIENT"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${
                  selectedRole === "RECIPIENT"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Recipient</h3>
                <p className="text-sm text-muted-foreground">
                  Receive and manage your certificates. View your achievements
                  and share them with others.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Receive certificates</li>
                  <li>• View certificate history</li>
                  <li>• Share certificates</li>
                  <li>• Verify authenticity</li>
                </ul>
              </div>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/auth/login")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="flex-1"
            size="lg"
          >
            Continue
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

