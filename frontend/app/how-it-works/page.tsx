export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            How It Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how CertiChain revolutionizes certificate verification using
            blockchain technology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                1
              </div>
              <h2 className="text-xl font-semibold">Issue Certificate</h2>
            </div>
            <p className="text-muted-foreground">
              Institutions issue certificates on the blockchain as NFTs. Each
              certificate includes metadata stored on IPFS for fast access.
            </p>
          </div>

          <div className="space-y-3 p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                2
              </div>
              <h2 className="text-xl font-semibold">Receive Certificate</h2>
            </div>
            <p className="text-muted-foreground">
              Recipients receive an email notification with their certificate
              link. They can claim it to their wallet or verify it directly.
            </p>
          </div>

          <div className="space-y-3 p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                3
              </div>
              <h2 className="text-xl font-semibold">Verify Certificate</h2>
            </div>
            <p className="text-muted-foreground">
              Anyone can verify a certificate by entering the token ID. The
              system checks both the database and blockchain for authenticity.
            </p>
          </div>

          <div className="space-y-3 p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                4
              </div>
              <h2 className="text-xl font-semibold">Revoke if Needed</h2>
            </div>
            <p className="text-muted-foreground">
              Institutions can revoke certificates when necessary. The
              revocation status is permanently recorded on the blockchain.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 border border-border rounded-lg bg-background">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                Immutable proof of authenticity stored on Ethereum blockchain
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                Fast verification through database cache with blockchain
                confirmation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                Decentralized storage via IPFS for certificate metadata and
                images
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                Social login support for easy access without crypto knowledge
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                Public verification - no account needed to verify certificates
              </span>
            </li>
          </ul>
        </div>

        <div className="text-center pt-8">
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
