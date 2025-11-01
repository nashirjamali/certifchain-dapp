"use client";

import { LampContainer } from '@/components/ui/lamp';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroProps {
  onGetStarted?: () => void;
  onVerifyNow?: () => void;
}

export function Hero({ onGetStarted, onVerifyNow }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <LampContainer>
        <div className="flex flex-col items-center justify-center text-center space-y-8 px-4">
          <TextGenerateEffect
            words="Blockchain-Powered Certificates. Forever Verifiable. Always Trusted."
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          />
          <p className="max-w-2xl text-lg md:text-xl text-neutral-300 mt-4">
            Issue, verify, and manage digital certificates on the Ethereum blockchain.
            Immutable, secure, and accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
              onClick={onGetStarted}
              asChild
            >
              <Link href="/institution/dashboard">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 px-8 py-6 text-lg"
              onClick={onVerifyNow}
              asChild
            >
              <Link href="/verify">Verify Certificate</Link>
            </Button>
          </div>
        </div>
      </LampContainer>
      <BackgroundBeams className="pointer-events-none" />
    </section>
  );
}
