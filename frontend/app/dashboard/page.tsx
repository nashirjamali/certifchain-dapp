"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Search, Download, ExternalLink, Award, Calendar } from "lucide-react";

interface Certificate {
  id: string;
  tokenId: string;
  recipientName: string;
  certificateType: string;
  issueDate: string;
  ipfsHash: string;
  ipfsImageHash?: string;
  institution: {
    institutionName: string;
    logo?: string;
    institutionType?: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isConnected || !address) {
      router.push("/auth/login");
      return;
    }

    const fetchCertificates = async () => {
      try {
        const response = await fetch(`/api/certificates/my-certificates?walletAddress=${address}`);
        const data = await response.json();
        
        if (data.success) {
          setCertificates(data.certificates);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [address, isConnected, router]);

  const filteredCertificates = certificates.filter((cert) =>
    cert.certificateType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.institution.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              My Certificates
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage your certificates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{certificates.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Total Certificates</div>
              </div>
            </div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {certificates.filter((cert) => {
                    const issueDate = new Date(cert.issueDate);
                    const now = new Date();
                    return issueDate.getMonth() === now.getMonth() && 
                           issueDate.getFullYear() === now.getFullYear();
                  }).length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">This Month</div>
              </div>
            </div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {certificates.filter((cert) => cert.ipfsImageHash).length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">With Images</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-background">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {filteredCertificates.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? (
                  <div>
                    <p>No certificates found matching your search.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p>You don't have any certificates yet.</p>
                    <p className="text-sm mt-2">Certificates will appear here once they are issued to you.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/certificate/${cert.tokenId}`)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          {cert.institution.logo ? (
                            <img
                              src={cert.institution.logo}
                              alt={cert.institution.institutionName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Award className="h-6 w-6 text-primary" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {cert.certificateType}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {cert.institution.institutionName}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>Issued to: {cert.recipientName}</span>
                              <span>•</span>
                              <span>
                                {new Date(cert.issueDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/certificate/${cert.tokenId}`)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Link
                          href={`/verify?tokenId=${cert.tokenId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

