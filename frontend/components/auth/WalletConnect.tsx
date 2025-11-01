"use client";

import { Wallet, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WalletConnectProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  isConnected?: boolean;
  address?: `0x${string}`;
}

export function WalletConnect({
  onConnect,
  onDisconnect,
  isConnected,
  address,
}: WalletConnectProps) {
  if (isConnected && address) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="text-sm text-slate-400">Wallet Connected</p>
              <p className="font-mono text-sm text-slate-200">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={onDisconnect}
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
      onClick={onConnect}
      variant="default"
      size="lg"
      className="w-full"
    >
      <Wallet className="h-5 w-5" />
      Connect Wallet
    </Button>
  );
}

