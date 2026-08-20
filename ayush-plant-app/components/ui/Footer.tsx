"use client";

import React from "react";
import { Leaf, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="about" className="relative z-10 py-12 border-t border-emerald-500/20 bg-botanical-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wider text-slate-100 uppercase">
              AYUSH BotaniAI
            </span>
            <p className="text-xs text-slate-400">
              SIH260170 • Ministry of AYUSH Hackathon Initiative
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono text-center md:text-right space-y-1">
          <p>Built with Next.js 14, TensorFlow, MongoDB Atlas & React Three Fiber</p>
          <p className="flex items-center justify-center md:justify-end gap-1 text-slate-500">
            Empowering the Indian Botanical Supply Chain <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
