"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, LogOut } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";

interface WalletConnectProps {
  disableRedirect?: boolean;
}

export function WalletConnect({ disableRedirect = false }: WalletConnectProps) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (hasRedirected || !isConnected || !address || disableRedirect) {
      return;
    }

    const checkUserAndRedirect = async () => {
      try {
        const response = await fetch(`/api/auth/user?walletAddress=${address}`);
        const data = await response.json();

        if (data.success && data.user) {
          setHasRedirected(true);
          
          if (data.user.role === 'INSTITUTION' || data.user.role === 'ADMIN') {
            router.push('/institution/dashboard');
          } else if (data.user.role === 'RECIPIENT') {
            router.push('/dashboard');
          } else {
            router.push('/');
          }
        } else {
          setHasRedirected(true);
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        setHasRedirected(true);
        router.push('/');
      }
    };

    const timeoutId = setTimeout(() => {
      checkUserAndRedirect();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isConnected, address, disableRedirect, hasRedirected, router]);

  if (isConnected && address) {
    return (
      <div className="rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5" />
            <div>
              <p className="text-sm">Wallet Connected</p>
              <p className="font-mono text-sm">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          className="w-full"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={openConnectModal}
      variant="default"
      size="lg"
      className="w-full"
    >
      <Wallet className="h-5 w-5" />
      Connect Wallet
    </Button>
  );
}

