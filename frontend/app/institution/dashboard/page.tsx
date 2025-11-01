"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Search, Download, ExternalLink } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"issued" | "stats">("issued");

  const mockCertificates = [
    {
      id: 1,
      recipientName: "John Doe",
      recipientEmail: "john@example.com",
      certificateType: "Course Completion",
      issueDate: "2024-01-15",
      tokenId: 12345,
      status: "active",
    },
    {
      id: 2,
      recipientName: "Jane Smith",
      recipientEmail: "jane@example.com",
      certificateType: "Professional Certification",
      issueDate: "2024-01-20",
      tokenId: 12346,
      status: "active",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Institution Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and issue certificates
            </p>
          </div>
          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={() => router.push("/institution/issue")}
          >
            <Plus className="h-4 w-4" />
            Issue Certificate
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="text-sm text-muted-foreground mt-1">Total Issued</div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="text-2xl font-bold text-foreground">2</div>
            <div className="text-sm text-muted-foreground mt-1">This Month</div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="text-2xl font-bold text-foreground">0</div>
            <div className="text-sm text-muted-foreground mt-1">Revoked</div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background">
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-sm text-muted-foreground mt-1">Active Rate</div>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-background">
          <div className="border-b border-border flex gap-4 px-6">
            <button
              onClick={() => setSelectedTab("issued")}
              className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                selectedTab === "issued"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Issued Certificates
            </button>
            <button
              onClick={() => setSelectedTab("stats")}
              className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                selectedTab === "stats"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Statistics
            </button>
          </div>

          <div className="p-6">
            {selectedTab === "issued" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search certificates..."
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                          Recipient
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                          Issue Date
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                          Token ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCertificates.map((cert) => (
                        <tr
                          key={cert.id}
                          className="border-b border-border hover:bg-muted/50 cursor-pointer"
                          onClick={() => router.push(`/certificate/${cert.tokenId}`)}
                        >
                          <td className="py-3 px-4">
                            <div className="text-sm font-medium text-foreground">
                              {cert.recipientName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {cert.recipientEmail}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-foreground">
                            {cert.certificateType}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {cert.issueDate}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-sm text-foreground">
                              #{cert.tokenId}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {cert.status}
                            </span>
                          </td>
                          <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {mockCertificates.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No certificates issued yet. Click "Issue Certificate" to get started.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center text-muted-foreground">
                  Statistics and analytics will be displayed here.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

