"use client";

import { Mail, Chrome } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SocialLoginProps {
  onEmailLogin?: () => void;
  onGoogleLogin?: () => void;
  isLoading?: boolean;
}

export function SocialLogin({
  onEmailLogin,
  onGoogleLogin,
  isLoading,
}: SocialLoginProps) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onEmailLogin}
        disabled={isLoading}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <Mail className="h-5 w-5" />
        Continue with Email
      </Button>

      <Button
        onClick={onGoogleLogin}
        disabled={isLoading}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <Chrome className="h-5 w-5" />
        Continue with Google
      </Button>
    </div>
  );
}

