"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { Button } from "@/components/ui/button";
import { FileCheck, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user?: unknown;
  walletAddress?: `0x${string}`;
  onConnect?: () => void;
}

export function Header({ user, walletAddress, onConnect }: HeaderProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50")}>
      <div className="rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold">CertiChain</h1>

          <div className="flex-1 flex items-center justify-center">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Verify">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/verify">Verify Certificate</HoveredLink>
                  <HoveredLink href="/certificate">
                    View Certificate
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Dashboard">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/institution/dashboard">
                    Institution Dashboard
                  </HoveredLink>
                  <HoveredLink href="/institution/issue">
                    Issue Certificate
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Docs">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/how-it-works">Overview</HoveredLink>
                  <HoveredLink href="/how-it-works#issuing">
                    Issuing Certificates
                  </HoveredLink>
                  <HoveredLink href="/how-it-works#verification">
                    Verification Process
                  </HoveredLink>
                  <HoveredLink href="/how-it-works#blockchain">
                    Blockchain Security
                  </HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            {walletAddress ? (
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-cyan-500" />
                <span className="text-xs font-mono text-neutral-600">
                  {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                </span>
              </div>
            ) : (
              <>
                <Button
                  onClick={onConnect}
                  size="lg"
                  variant="ghost"
                  className="rounded-full"
                >
                  <Wallet className="h-4 w-4 mr-1.5" />
                  Connect Wallet
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
