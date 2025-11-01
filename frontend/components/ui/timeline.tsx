"use client";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from "motion/react";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Timeline = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContainerHeight(ref.current.scrollHeight);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -containerHeight + window.innerHeight]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{ y, opacity, scale }}
        className={cn(
          "sticky top-1/2 -translate-y-1/2 left-0 w-full"
        )}
      >
        <TimelineContent>{children}</TimelineContent>
      </motion.div>
    </div>
  );
};

export const TimelineContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
      {children}
    </div>
  );
};

export const TimelineItem = ({
  title,
  description,
  icon: Icon,
  iconColor,
  date,
  className,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  date?: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white",
              iconColor || "bg-cyan-500"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="flex-1">
          {date && (
            <div className="text-sm font-medium text-cyan-500 mb-1">{date}</div>
          )}
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

