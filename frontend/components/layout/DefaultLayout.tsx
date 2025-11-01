"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "./Container";

interface DefaultLayoutProps {
  children: ReactNode;
  user?: unknown;
  walletAddress?: `0x${string}`;
  onConnect?: () => void;
}

export function DefaultLayout({
  children,
  user,
  walletAddress,
  onConnect,
}: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} walletAddress={walletAddress} onConnect={onConnect} />
      <main className="flex-1 pt-24">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
