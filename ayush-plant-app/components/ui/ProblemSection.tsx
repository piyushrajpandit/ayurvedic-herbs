"use client";

import React from "react";
import { AlertTriangle, Layers, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Language, TRANSLATIONS } from "@/lib/i18n";

interface ProblemSectionProps {
  currentLang?: Language;
}

export default function ProblemSection({ currentLang = "en" }: ProblemSectionProps) {
  const t = TRANSLATIONS[currentLang];
  return (
    <section id="problem" className="relative min-h-screen py-24 px-6 flex items-center z-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4" />
            Ministry of AYUSH Problem Statement SIH260170
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-slate-100">
            The Hidden Crisis in the <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-200">
              Ayurvedic Crude Drug Supply Chain
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans">
            Wholesalers, traders, and herbal extract manufacturers face rampant crude drug misidentification. Similar-looking species and deliberate adulterants bypass manual quality control, compromising Ayurvedic medicine safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-3">Morphological Similarity</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              Dried leaves, roots, and barks of distinct species often appear identical to the naked eye (e.g., *Bacopa monnieri* vs *Centella asiatica*).
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 bg-amber-950/40 px-3 py-2 rounded-xl border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
              High Misidentification Risk
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden group border-emerald-500/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-3">Deliberate Adulteration</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              Unscrupulous suppliers mix exhausted plant residues or cheap wild substitutes (e.g., *Melia azedarach* substituted for *Azadirachta indica*).
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Therapeutic Loss
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100 mb-3">Instant AI Safeguard</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              Our MobileNetV2 vision architecture instantly verifies leaf image geometry, matching against verified Ayurvedic pharmacopoeia databases.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400/90 bg-teal-950/40 px-3 py-2 rounded-xl border border-teal-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Instant Supply Chain Audit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
