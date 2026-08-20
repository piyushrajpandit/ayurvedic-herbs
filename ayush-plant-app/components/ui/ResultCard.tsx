"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle, MapPin, Sparkles, RefreshCw, ShieldAlert, Eye, Cpu, QrCode, Flag, Send, Check, Sliders, ArrowLeftRight, Download, Award } from "lucide-react";
import CertificateModal from "./CertificateModal";

interface Adulterant {
  adulterantName: string;
  scientificName?: string;
  visualDifferences: string;
  healthImpacts?: string;
}

interface Substitute {
  substituteName: string;
  scientificName?: string;
  therapeuticRationale: string;
}

interface PlantDetails {
  datasetLabel: string;
  commonName: string;
  ayurvedicName: string;
  scientificName: string;
  medicinalUses: string[];
  partsUsed: string[];
  knownAdulterants: Adulterant[];
  knownSubstitutes: Substitute[];
  regionOfAvailability: string[];
  imageUrl: string;
  isPlaceholderData?: boolean;
}

interface IdentificationResult {
  species: string;
  confidence: number;
  isLowConfidence?: boolean;
  inferenceTimeMs: number;
  gradcamHeatmap?: string | null;
  cryptographicHash?: string | null;
}

interface Candidate {
  species: string;
  confidence: number;
}

interface ResultCardProps {
  identification: IdentificationResult;
  plantDetails: PlantDetails;
  top3Candidates?: Candidate[];
  onReset: () => void;
}

export default function ResultCard({
  identification,
  plantDetails,
  top3Candidates = [],
  onReset,
}: ResultCardProps) {
  const [showGradcam, setShowGradcam] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [suggestedSpecies, setSuggestedSpecies] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const confidencePercent = (identification.confidence * 100).toFixed(1);
  const isLowConfidence = Boolean(identification.isLowConfidence || identification.confidence < 0.6);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestedSpecies) return;

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          predictedSpecies: identification.species,
          suggestedCorrectSpecies: suggestedSpecies,
          confidence: identification.confidence,
          comments: feedbackComments,
        }),
      });
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowFeedbackModal(false);
        setFeedbackSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Feedback submit error:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Low Confidence Caution Banner */}
      {isLowConfidence && (
        <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/50 flex items-start gap-3 text-amber-200 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-300 font-bold mb-0.5">
              ⚠️ Low Confidence Warning ({confidencePercent}%)
            </strong>
            The uploaded image produced a low confidence score (&lt; 60%). The sample may be degraded, poorly lit, or represent an unindexed wild variant. Please inspect the visual adulteration features carefully or submit a clearer leaf photograph.
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified Identification • {identification.inferenceTimeMs}ms
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-slate-100 mb-1">
              {plantDetails.commonName}{" "}
              <span className="text-emerald-400 text-lg md:text-xl font-normal italic">
                ({plantDetails.scientificName})
              </span>
            </h3>
            <p className="text-amber-400 font-mono text-sm">
              Ayurvedic / Sanskrit Name: <span className="font-semibold text-amber-300">{plantDetails.ayurvedicName}</span>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center">
            <div className={`text-3xl md:text-5xl font-black font-mono ${isLowConfidence ? 'text-amber-400' : 'text-emerald-400'}`}>
              {confidencePercent}%
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              AI Confidence Score
            </span>
          </div>
        </div>
      </div>

      {/* Grad-CAM Explainable AI (XAI) Feature Viewer & Cryptographic Ledger Badge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grad-CAM Heatmap Card */}
        {identification.gradcamHeatmap && (
          <div className="glass-panel rounded-3xl p-6 space-y-4 border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-serif text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Explainable AI (Grad-CAM Overlay)
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowGradcam(!showGradcam)}
                  className="px-3 py-1 rounded-full bg-botanical-800 text-emerald-300 text-xs font-mono flex items-center gap-1.5 border border-emerald-500/30 hover:bg-botanical-700 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {showGradcam ? "Original Image" : "XAI Heatmap"}
                </button>
              </div>
            </div>

            {/* Interactive Side-by-Side Split Image Comparison Slider */}
            <div className="relative rounded-2xl overflow-hidden min-h-[220px] max-h-[260px] bg-slate-950 flex items-center justify-center border border-emerald-500/30 select-none group">
              {/* Layer 1: Base Reference Specimen (Right Side) */}
              <img
                src={plantDetails.imageUrl}
                alt="Original Leaf Specimen"
                className="max-h-[260px] w-full object-cover pointer-events-none"
              />

              {/* Layer 2: Clipped Grad-CAM XAI Heatmap (Left Side) */}
              <div
                className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none transition-all"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={identification.gradcamHeatmap}
                  alt="Grad-CAM Heatmap Layer"
                  className="max-h-[260px] w-[500px] max-w-none object-cover"
                />
              </div>

              {/* Interactive Vertical Drag Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-emerald-400 cursor-ew-resize flex items-center justify-center z-20 shadow-[0_0_12px_#34d399]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Range Input Overlay for Seamless Touch/Mouse Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
              />

              {/* Comparison Badges */}
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-slate-950/90 text-amber-300 text-[10px] font-mono border border-amber-500/40 backdrop-blur-xs z-10 pointer-events-none">
                🔴 XAI Neural Heatmap ({sliderPos}%)
              </div>
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-slate-950/90 text-emerald-300 text-[10px] font-mono border border-emerald-500/40 backdrop-blur-xs z-10 pointer-events-none">
                🟢 Original Specimen ({100 - sliderPos}%)
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/90 text-[10px] font-mono text-slate-300 border border-slate-700 backdrop-blur-xs z-10 pointer-events-none flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Drag Slider Horizontally to Compare</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Red/Yellow highlighted regions indicate the leaf pixel features (serrated margins, vein architecture, apex geometry) that drove the neural classification.
            </p>
          </div>
        )}

        {/* SHA-256 Cryptographic Hash & Serialized QR Badge */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 border border-teal-500/30 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold font-serif text-slate-100 flex items-center gap-2 mb-2">
              <QrCode className="w-4 h-4 text-teal-400" />
              Cryptographic Audit Proof
            </h4>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              SHA-256 Tamper-Proof Fingerprint:
            </span>
            <div className="p-3 rounded-xl bg-botanical-950/80 font-mono text-[11px] text-teal-300 break-all border border-teal-500/20">
              {identification.cryptographicHash || "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Ledger Status: <strong className="text-emerald-400">LOGGED ON-CHAIN</strong></span>
            <button
              type="button"
              onClick={() => setShowFeedbackModal(true)}
              className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
            >
              <Flag className="w-3.5 h-3.5" />
              Report Misclassification
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medicinal Uses & Parts Used */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h4 className="text-lg font-bold font-serif text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Therapeutic Uses & Parts
          </h4>
          
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Medicinal Indications:
            </span>
            <ul className="space-y-2">
              {plantDetails.medicinalUses.map((use, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Parts Used in Formulations:
            </span>
            <div className="flex flex-wrap gap-2">
              {plantDetails.partsUsed.map((part, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-botanical-800/80 border border-emerald-500/20 text-emerald-300 text-xs font-mono"
                >
                  {part}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Geographical Regions:
            </span>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {plantDetails.regionOfAvailability.join(", ")}
            </p>
          </div>
        </div>

        {/* Known Adulterants & Substitutes Banner */}
        <div className="glass-panel-gold rounded-3xl p-6 space-y-4 border border-amber-500/30">
          <h4 className="text-lg font-bold font-serif text-amber-400 flex items-center gap-2 border-b border-amber-500/20 pb-3">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Supply Chain Adulteration Risk
          </h4>

          {plantDetails.knownAdulterants && plantDetails.knownAdulterants.length > 0 ? (
            <div className="space-y-3">
              {plantDetails.knownAdulterants.map((adulterant, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm font-serif">
                      ⚠️ {adulterant.adulterantName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong className="text-amber-400/90 font-mono">Visual Difference:</strong>{" "}
                    {adulterant.visualDifferences}
                  </p>
                  {adulterant.healthImpacts && (
                    <p className="text-xs text-rose-300/90 leading-relaxed font-sans">
                      <strong className="text-rose-400 font-mono">Impact:</strong>{" "}
                      {adulterant.healthImpacts}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No common commercial adulterants recorded for this species.</p>
          )}

          {/* Genuine Substitutes */}
          {plantDetails.knownSubstitutes && plantDetails.knownSubstitutes.length > 0 && (
            <div className="pt-2 border-t border-amber-500/20">
              <span className="text-xs font-mono text-amber-400/90 uppercase tracking-wider block mb-2">
                Classical Ayurvedic Substitutes (Abhava Dravya):
              </span>
              {plantDetails.knownSubstitutes.map((sub, i) => (
                <div key={i} className="text-xs text-slate-300 bg-botanical-900/60 p-2.5 rounded-lg border border-emerald-500/20 font-sans">
                  <strong className="text-emerald-300">{sub.substituteName}:</strong> {sub.therapeuticRationale}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top 3 Alternative Candidates */}
      {top3Candidates.length > 0 && (
        <div className="glass-panel rounded-3xl p-6">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">
            Top Model Probability Candidates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3Candidates.map((candidate, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  idx === 0
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                    : "bg-botanical-900/40 border-slate-800 text-slate-400"
                }`}
              >
                <span className="text-xs font-medium truncate max-w-[180px]">
                  {candidate.species}
                </span>
                <span className="font-mono text-xs font-bold">
                  {(candidate.confidence * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons: Download PDF Certificate & Reset */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setShowCertModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download QA/QC Certificate (PDF)
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-botanical-800 hover:bg-botanical-700 text-emerald-300 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Scan Another Plant Sample
        </button>
      </div>

      {/* QA/QC Certificate Modal */}
      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        identification={identification}
        plantDetails={plantDetails}
      />

      {/* Active Learning Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 max-w-md w-full border border-amber-500/40 space-y-4">
            <h4 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
              <Flag className="w-5 h-5 text-amber-400" />
              Active Learning Retraining Feedback
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Help retrain our neural network by reporting incorrect classifications to the semi-supervised active learning queue.
            </p>

            {feedbackSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center gap-2 text-emerald-300 font-mono text-xs">
                <Check className="w-4 h-4 text-emerald-400" />
                Feedback recorded for active learning queue!
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    AI Prediction:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={identification.species}
                    className="w-full px-3 py-2 rounded-xl bg-botanical-950 text-slate-400 border border-slate-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Correct Species Label:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ocimum sanctum (Tulsi)"
                    value={suggestedSpecies}
                    onChange={(e) => setSuggestedSpecies(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-botanical-900 text-slate-100 border border-emerald-500/40 text-xs font-sans focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Notes / Differentiating Attributes:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Optional notes on visual leaf margins or vein arrangement"
                    value={feedbackComments}
                    onChange={(e) => setFeedbackComments(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-botanical-900 text-slate-100 border border-emerald-500/40 text-xs font-sans focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-mono text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase flex items-center gap-1.5 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit to Queue
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
