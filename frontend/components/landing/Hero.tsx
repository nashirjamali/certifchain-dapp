"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroProps {
  onGetStarted?: () => void;
  onVerifyNow?: () => void;
}

export function Hero({ onGetStarted, onVerifyNow }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="flex flex-col items-center justify-center text-center space-y-8 px-4 max-w-4xl mx-auto py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white">
          Digital Certificates. Forever Verifiable. Always Trusted.
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mt-4">
          Issue, verify, and manage digital certificates with permanent verification.
          Secure, tamper-proof, and accessible to everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            size="lg"
            variant="default"
            onClick={onGetStarted}
            asChild
          >
            <Link href="/institution/dashboard">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onVerifyNow}
            asChild
          >
            <Link href="/verify">Verify Certificate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
