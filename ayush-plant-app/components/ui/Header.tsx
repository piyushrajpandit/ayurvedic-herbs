"use client";

import React, { useState } from "react";
import { Leaf, ShieldAlert, Sparkles, Cpu, Compass, Globe, ShoppingBag } from "lucide-react";
import { Language, TRANSLATIONS } from "@/lib/i18n";

interface HeaderProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function Header({ currentLang = "en", onLanguageChange }: HeaderProps) {
  const [lang, setLang] = useState<Language>(currentLang);
  const t = TRANSLATIONS[lang];

  const handleLangSelect = (newLang: Language) => {
    setLang(newLang);
    if (onLanguageChange) onLanguageChange(newLang);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border border-emerald-500/20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-botanical-300 p-[2px]">
            <div className="w-full h-full bg-botanical-950 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-wider text-slate-100 uppercase">
              AYUSH <span className="text-emerald-400 font-mono text-sm">SIH260170</span>
            </span>
            <p className="text-[10px] text-emerald-400/80 uppercase tracking-widest font-mono">
              {t.subtitle}
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => scrollTo("problem")}
            className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            {t.adulterationCrisis}
          </button>
          <button
            onClick={() => scrollTo("identify")}
            className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            {t.scanner}
          </button>
          <button
            onClick={() => scrollTo("geolocation")}
            className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-teal-400" />
            {t.geoMap}
          </button>
          <button
            onClick={() => scrollTo("marketplace")}
            className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold text-emerald-300"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            {t.marketplace}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {/* Multilingual Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-mono text-slate-300">
            <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={lang}
              onChange={(e) => handleLangSelect(e.target.value as Language)}
              className="bg-transparent text-emerald-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-950 text-slate-200">🇬🇧 English</option>
              <option value="hi" className="bg-slate-950 text-slate-200">🇮🇳 हिन्दी (Hindi)</option>
              <option value="sa" className="bg-slate-950 text-slate-200">🕉️ संस्कृतम् (Sanskrit)</option>
              <option value="ta" className="bg-slate-950 text-slate-200">🌺 தமிழ் (Tamil)</option>
              <option value="te" className="bg-slate-950 text-slate-200">🌿 తెలుగు (Telugu)</option>
            </select>
          </div>

          <button
            onClick={() => scrollTo("identify")}
            className="hidden sm:inline-flex relative items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-emerald-500 to-amber-500 group-hover:from-emerald-500 group-hover:to-amber-500 hover:text-white text-slate-950 shadow-lg shadow-emerald-950/50"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-botanical-950 text-emerald-300 rounded-full group-hover:bg-opacity-0 group-hover:text-slate-950 flex items-center gap-2 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t.scanRawMaterial}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
