"use client";

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Lock, Zap, Mail, Shield, Globe, Clock, type LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  iconName?: 'Lock' | 'Zap' | 'Mail' | 'Shield' | 'Globe' | 'Clock';
}

interface FeatureCardsProps {
  features: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  Lock,
  Zap,
  Mail,
  Shield,
  Globe,
  Clock,
};

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why CertiChain?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Built on blockchain technology for permanent, tamper-proof certificate verification
          </p>
        </div>
        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.iconName ? iconMap[feature.iconName] : null;
            return (
              <BentoGridItem
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={IconComponent ? <IconComponent className="h-6 w-6 text-cyan-500" /> : null}
                className={`${
                  index === 0 || index === features.length - 1
                    ? 'md:col-span-2'
                    : ''
                }`}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

