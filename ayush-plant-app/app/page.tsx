"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, ArrowDown, Sparkles, ShieldAlert, Cpu } from "lucide-react";
import BotanicalScene from "@/components/3d/BotanicalScene";
import GrowthBackground from "@/components/ui/GrowthBackground";
import Header from "@/components/ui/Header";
import ProblemSection from "@/components/ui/ProblemSection";
import UploadSection from "@/components/ui/UploadSection";
import GeoMapSection from "@/components/ui/GeoMapSection";
import MarketplaceSection from "@/components/ui/MarketplaceSection";
import Footer from "@/components/ui/Footer";
import { Language, TRANSLATIONS } from "@/lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLang, setCurrentLang] = useState<Language>("en");

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Existing hero section depth parallax transform on scroll (Untouched)
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
        scale: 0.9,
        opacity: 0.3,
        y: 100,
        ease: "power1.inOut",
      });

      // Existing problem cards depth entrance (Untouched)
      const cards = gsap.utils.toArray<HTMLElement>("#problem .glass-panel");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToIdentify = () => {
    const element = document.getElementById("identify");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main ref={containerRef} className="relative bg-botanical-950 text-slate-100 min-h-screen font-sans">
      {/* 3D WebGL Background Scene (Untouched) */}
      <BotanicalScene scrollProgress={scrollProgress} />

      {/* Isolated SVG Scroll-Driven Tree Growth Animation Layer */}
      <GrowthBackground enabled={true} />

      {/* Glassmorphic Navigation Header */}
      <Header currentLang={currentLang} onLanguageChange={setCurrentLang} />

      {/* Section 1: Hero Landing */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-24 z-10 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-widest animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {t.heroTag}
          </div>

          <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight leading-tight text-slate-100">
            {t.heroHeading}
          </h1>

          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={scrollToIdentify}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase font-mono tracking-wider shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-3 group"
            >
              <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t.launchScanner}
            </button>

            <a
              href="#problem"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-botanical-800/80 text-emerald-300 font-mono text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-emerald-500/30"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              {t.exploreCrisis}
            </a>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-12 flex justify-center animate-bounce">
            <a href="#problem" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <ArrowDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: AYUSH Problem Statement */}
      <ProblemSection currentLang={currentLang} />

      {/* Section 3: Upload & Identification AI Tool */}
      <UploadSection currentLang={currentLang} />

      {/* Section 4: Regional Adulteration Geo-Location Map */}
      <GeoMapSection currentLang={currentLang} />

      {/* Section 5: B2B Raw Material Buying & Selling Marketplace */}
      <MarketplaceSection currentLang={currentLang} />

      {/* Section 6: Footer / Team */}
      <Footer currentLang={currentLang} />
    </main>
  );
}
