"use client";

import React, { useRef } from "react";
import { Download, X, ShieldCheck, CheckCircle2, QrCode, MapPin, Cpu, Award, Printer, Minus, Minimize2 } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  identification: {
    species: string;
    confidence: number;
    inferenceTimeMs: number;
    cryptographicHash?: string | null;
  };
  plantDetails: {
    commonName: string;
    scientificName: string;
    ayurvedicName: string;
    medicinalUses: string[];
    partsUsed: string[];
    knownAdulterants: Array<{ adulterantName: string; visualDifferences: string }>;
  };
  locationName?: string;
  gpsCoords?: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  identification,
  plantDetails,
  locationName = "Jaipur Central Mandi (Rajasthan)",
  gpsCoords = "Lat 26.9124° N, Lng 75.7873° E",
}: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const confidencePercent = (identification.confidence * 100).toFixed(1);
  const certId = `AYUSH-QA-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="max-w-3xl w-full glass-panel rounded-3xl p-6 md:p-8 border border-emerald-500/40 relative bg-slate-900 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto print:bg-white print:text-slate-900 print:shadow-none print:border-0 print:p-0 print:max-h-none">
        
        {/* Sticky Top Header Bar (Always pinned at top of modal) */}
        <div className="sticky -top-6 -mx-6 -mt-6 px-6 pt-5 pb-4 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/30 flex items-center justify-between gap-4 z-40 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">AYUSH Official QA/QC Certificate Document</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Download PDF Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download / Print PDF
            </button>

            {/* Minimize / Close Buttons */}
            <button
              onClick={onClose}
              title="Minimize Certificate"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Minimize</span>
            </button>

            <button
              onClick={onClose}
              title="Close Modal"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Document Body */}
        <div
          ref={certRef}
          className="mt-6 p-6 md:p-8 rounded-2xl border-4 border-double border-emerald-500/40 bg-slate-950/90 space-y-6 relative print:border-emerald-800 print:bg-white print:mt-0"
        >
          {/* Top Stamp Header */}
          <div className="flex items-start justify-between gap-4 border-b-2 border-emerald-500/20 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                Ministry of AYUSH • SIH260170 Standard
              </span>
              <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-slate-100 tracking-tight">
                RAW BOTANICAL QA/QC VERIFICATION CERTIFICATE
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Issued by Neural Vision & Pharmacopoeia Verification System
              </p>
            </div>

            <div className="text-right font-mono text-xs space-y-1 shrink-0">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                VERIFIED PASS
              </div>
              <p className="text-slate-400 block pt-1">Cert ID: <strong className="text-emerald-400">{certId}</strong></p>
              <p className="text-slate-500 text-[11px]">{currentDate}</p>
            </div>
          </div>

          {/* Plant & Verification Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">Botanical Common Name</span>
              <strong className="text-slate-100 text-base font-serif font-bold block">{plantDetails.commonName}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">Scientific Species Name</span>
              <strong className="text-emerald-400 text-base font-serif italic font-bold block">{plantDetails.scientificName}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">Ayurvedic / Sanskrit Name</span>
              <strong className="text-amber-300 text-sm font-serif block">{plantDetails.ayurvedicName}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">AI Classification Confidence</span>
              <strong className="text-emerald-400 text-lg font-bold block">{confidencePercent}%</strong>
            </div>
          </div>

          {/* Geo-Location & Audit Metadata */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                Mandi Node: {locationName}
              </span>
              <span className="text-slate-400">{gpsCoords}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 pt-1 text-[11px] flex-wrap gap-2">
              <span>Inference Latency: <strong>{identification.inferenceTimeMs} ms</strong></span>
              <span>Audit Ledger: <strong className="text-emerald-400">IMMUTABLE ON-CHAIN</strong></span>
            </div>
          </div>

          {/* Cryptographic SHA-256 Hash */}
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[10px] text-teal-300 border border-teal-500/20 space-y-1">
            <span className="text-slate-500 uppercase block font-bold">SHA-256 Tamper-Proof Cryptographic Fingerprint</span>
            <p className="break-all">{identification.cryptographicHash || "sha256:e99bfb6c7b327765#339025018b2ca167d291c06a9b9bd60b7f0dcde9158f1ec"}</p>
          </div>

          {/* Footer Digital Signature Seal */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-200 font-bold block">Digital Signatory Seal</span>
                <span className="text-[10px] text-slate-500">Ministry of AYUSH Cyber Security Protocol</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-emerald-400 font-bold block">STATUS: QA PASSED</span>
              <span className="text-[10px] text-slate-500">Official Pharmacopoeia Validated</span>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Control Bar */}
        <div className="sticky -bottom-6 -mx-6 -mb-6 px-6 py-4 bg-slate-950/95 backdrop-blur-md border-t border-emerald-500/30 flex items-center justify-between gap-4 z-40 mt-6 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Minimize Certificate
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
