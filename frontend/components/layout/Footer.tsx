"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">CertiChain</h3>
            <p className="text-sm text-muted-foreground">
              Blockchain-powered certificate verification platform
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/verify" className="hover:text-foreground">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CertiChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

