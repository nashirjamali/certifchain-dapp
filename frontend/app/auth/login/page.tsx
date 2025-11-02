"use client";

import { SocialLogin } from "@/components/auth/SocialLogin";
import { WalletConnect } from "@/components/auth/WalletConnect";

export default function LoginPage() {
  const handleEmailLogin = () => {
    console.log("Email login");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  return (
    <div className="relative min-h-[calc(100vh-200px)] w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-50 flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Connect Your Wallet
            </h1>
            <p className="text-muted-foreground">
              Sign in to CertiChain
            </p>
          </div>

          <div className="space-y-6">
            <SocialLogin
              onEmailLogin={handleEmailLogin}
              onGoogleLogin={handleGoogleLogin}
            />

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-border" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <WalletConnect />
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
