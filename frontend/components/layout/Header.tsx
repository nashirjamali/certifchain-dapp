"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { Wallet } from "lucide-react";

interface HeaderProps {
  user?: unknown;
  walletAddress?: `0x${string}`;
  onConnect?: () => void;
}

export function Header({ user, walletAddress, onConnect }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Verify", link: "/verify" },
    { name: "Dashboard", link: "/institution/dashboard" },
    { name: "How It Works", link: "/how-it-works" },
  ];

  return (
    <Navbar className="top-10">
      <NavBody>
        <Link
          href="/"
          className="relative z-20 flex items-center space-x-2 px-2 py-1 text-xl font-bold text-black dark:text-white"
        >
          <span>CertiChain</span>
        </Link>
        <NavItems items={navItems} />
        <div className="flex items-center gap-2">
          {walletAddress ? (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
              <Wallet className="h-4 w-4 text-cyan-500" />
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
              </span>
            </div>
          ) : (
            <Link href="/auth/login">
              <NavbarButton
                as="span"
                variant="primary"
                className="flex items-center gap-1.5"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </NavbarButton>
            </Link>
          )}
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 px-2 py-1 text-xl font-bold text-black dark:text-white"
          >
            <span>CertiChain</span>
          </Link>
          <div className="flex items-center gap-2">
            {walletAddress ? (
              <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Wallet className="h-4 w-4 text-cyan-500" />
                <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                  {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                </span>
              </div>
            ) : (
              <Link href="/auth/login">
                <NavbarButton
                  as="span"
                  variant="primary"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5"
                >
                  <Wallet className="h-3 w-3" />
                  Connect
                </NavbarButton>
              </Link>
            )}
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium"
            >
              {item.name}
            </Link>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
