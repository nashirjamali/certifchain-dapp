"use client";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { AuthModal } from "@/components/auth/AuthModal";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { WalletConnect } from "@/components/auth/WalletConnect";
import { useState } from "react";

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailLogin = () => {
    console.log("Email login");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleWalletConnect = () => {
    console.log("Wallet connect");
  };

  const handleWalletDisconnect = () => {
    console.log("Wallet disconnect");
  };

  return (
    <DefaultLayout>
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)] py-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome to CertiChain</h1>
            <p className="text-default-500">
              Choose your preferred authentication method
            </p>
          </div>

          <div className="space-y-4">
            <SocialLogin
              onEmailLogin={handleEmailLogin}
              onGoogleLogin={handleGoogleLogin}
            />

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-default-200" />
              <span className="text-sm text-default-500">OR</span>
              <div className="flex-1 border-t border-default-200" />
            </div>

            <WalletConnect
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
              isConnected={false}
            />
          </div>

          <div className="text-center text-sm text-default-500">
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
      </main>
    </DefaultLayout>
  );
}
