"use client";

import { WobbleCard } from "@/components/ui/wobble-card";
import { Shield, Zap, Globe, FileCheck, Lock, Clock } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Permanent Verification",
    description: "Every certificate is permanently stored and can be verified anytime, anywhere. No more lost or damaged paper certificates.",
    icon: <Shield className="h-8 w-8" />,
  },
  {
    title: "Instant Verification",
    description: "Verify any certificate in seconds with just a few clicks. No need to contact institutions or wait for verification.",
    icon: <Zap className="h-8 w-8" />,
  },
  {
    title: "Global Access",
    description: "Access your certificates from anywhere in the world. Share them easily with employers, institutions, or anyone who needs to verify them.",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    title: "Tamper-Proof",
    description: "Built with advanced security technology that makes it impossible to forge or alter certificates once issued.",
    icon: <Lock className="h-8 w-8" />,
  },
  {
    title: "Easy Issuance",
    description: "Institutions can issue certificates quickly and efficiently through our intuitive dashboard. Streamline your certification process.",
    icon: <FileCheck className="h-8 w-8" />,
  },
  {
    title: "24/7 Available",
    description: "Your certificates are always accessible. No office hours, no waiting times. Access your certificates whenever you need them.",
    icon: <Clock className="h-8 w-8" />,
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Experience the future of digital certificates with features designed for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-2">
            <WobbleCard
              containerClassName="h-full"
              className="flex flex-col justify-center items-center text-center space-y-4"
            >
              <div className="text-white mb-2">{features[0].icon}</div>
              <h3 className="text-2xl font-bold text-white">{features[0].title}</h3>
              <p className="text-neutral-200 max-w-md">{features[0].description}</p>
            </WobbleCard>
          </div>

          <div>
            <WobbleCard
              containerClassName="h-full bg-blue-600"
              className="flex flex-col justify-center items-center text-center space-y-4"
            >
              <div className="text-white mb-2">{features[1].icon}</div>
              <h3 className="text-2xl font-bold text-white">{features[1].title}</h3>
              <p className="text-neutral-200 max-w-md">{features[1].description}</p>
            </WobbleCard>
          </div>

          <div>
            <WobbleCard
              containerClassName="h-full bg-purple-600"
              className="flex flex-col justify-center items-center text-center space-y-4"
            >
              <div className="text-white mb-2">{features[2].icon}</div>
              <h3 className="text-2xl font-bold text-white">{features[2].title}</h3>
              <p className="text-neutral-200 max-w-md">{features[2].description}</p>
            </WobbleCard>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <WobbleCard
              containerClassName="h-full bg-emerald-600"
              className="flex flex-col justify-center items-center text-center space-y-4"
            >
              <div className="text-white mb-2">{features[3].icon}</div>
              <h3 className="text-2xl font-bold text-white">{features[3].title}</h3>
              <p className="text-neutral-200 max-w-md">{features[3].description}</p>
            </WobbleCard>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <WobbleCard
              containerClassName="h-full bg-rose-600"
              className="flex flex-col justify-center items-center text-center space-y-4"
            >
              <div className="text-white mb-2">{features[4].icon}</div>
              <h3 className="text-2xl font-bold text-white">{features[4].title}</h3>
              <p className="text-neutral-200 max-w-md">{features[4].description}</p>
            </WobbleCard>
          </div>

          <div>
            <WobbleCard
              containerClassName="h-full bg-amber-600"
              className="flex flex-col justify-center items-center text-center space-y-4"
            >
              <div className="text-white mb-2">{features[5].icon}</div>
              <h3 className="text-2xl font-bold text-white">{features[5].title}</h3>
              <p className="text-neutral-200 max-w-md">{features[5].description}</p>
            </WobbleCard>
          </div>
        </div>
      </div>
    </section>
  );
}

