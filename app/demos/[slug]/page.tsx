'use client';
import React, { useState } from 'react';
import { domainThemes, tierConfig, Tier } from '@/lib/domain-config';
import { ImageWithSkeleton } from '@/components/image-with-skeleton';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [activeTier, setActiveTier] = useState<Tier>('premium');
  
  const theme = domainThemes[slug as keyof typeof domainThemes];
  if (!theme) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      
      {/* TIER SELECTOR NAV (Admin/Client View) */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 p-4 flex justify-center gap-4 shadow-sm">
        {(Object.keys(tierConfig) as Tier[]).map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all",
              activeTier === tier 
                ? theme.colors.primary + " text-white shadow-lg scale-105" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            {tierConfig[tier].name} Layout
          </button>
        ))}
      </div>

      {/* DYNAMIC HERO SECTION */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <ImageWithSkeleton 
          src={theme.heroImage} 
          alt={`${theme.name} Hero`} 
          fill
          className="object-cover opacity-30 dark:opacity-40"
          wrapperClassName="absolute inset-0 z-0"
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Reveal direction="up">
            <h1 className={cn("text-5xl md:text-7xl font-black mb-6 tracking-tight", theme.colors.text)}>
              {theme.name}
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-8">
              Experience the {activeTier.toUpperCase()} tier architecture.
            </p>
          </Reveal>

          {/* Tier Specific Render: Premium gets extra interactive elements */}
          {activeTier === 'premium' && (
            <Reveal direction="up" delay={0.4}>
              <div className="flex justify-center gap-4">
                <button className={cn("px-8 py-4 rounded-xl text-white font-bold text-lg shadow-2xl transition-transform hover:-translate-y-1", theme.colors.primary)}>
                  Book Appointment Now
                </button>
                <button className="px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-xl hover:bg-gray-50 transition-colors">
                  View Our Work
                </button>
              </div>
            </Reveal>
          )}

          {activeTier === 'basic' && (
            <Reveal direction="up" delay={0.4}>
              <button className={cn("px-6 py-3 rounded-md text-white font-semibold shadow-md", theme.colors.primary)}>
                Contact Us
              </button>
            </Reveal>
          )}
        </div>
      </section>

      {/* DYNAMIC CONTENT SECTIONS BASED ON TIER */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Included in {tierConfig[activeTier].name} Package</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tierConfig[activeTier].description}</p>
          </div>
        </Reveal>

        <div className={cn(
          "grid gap-8",
          activeTier === 'basic' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
        )}>
          {tierConfig[activeTier].sections.map((section, idx) => (
            <Reveal key={idx} delay={idx * 0.1} direction="up">
              <div className={cn(
                "p-8 rounded-2xl bg-white dark:bg-gray-800 border-2 transition-all",
                activeTier === 'premium' ? `hover:${theme.colors.border} hover:shadow-2xl hover:-translate-y-2` : 'border-transparent shadow-sm'
              )}>
                <div className={cn("w-12 h-12 rounded-full mb-6 flex items-center justify-center", theme.colors.primary)}>
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{section}</h3>
                <p className="text-gray-500 text-sm">
                  {activeTier === 'premium' 
                    ? "Advanced API integration with perfect Core Web Vitals and immersive animations." 
                    : "Clean, fast-loading, and responsive layout for maximum visibility."}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
