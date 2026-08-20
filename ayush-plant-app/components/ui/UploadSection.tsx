"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Sparkles, AlertCircle, Loader2, MapPin, Compass } from "lucide-react";
import ResultCard from "./ResultCard";
import { Language, TRANSLATIONS } from "@/lib/i18n";

const MANDI_LOCATIONS = [
  { name: "Auto GPS (Detect Location)", state: "GPS", lat: null, lng: null },
  { name: "Jaipur Central Mandi", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { name: "Neemuch Medicinal Hub", state: "Madhya Pradesh", lat: 24.4746, lng: 74.8703 },
  { name: "Khari Baoli Herb Market", state: "Delhi NCR", lat: 28.6562, lng: 77.2227 },
  { name: "Thrissur Ayurvedic Mandi", state: "Kerala", lat: 10.5276, lng: 76.2144 },
  { name: "Udaipur Forest Collection Hub", state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
];

interface UploadSectionProps {
  currentLang?: Language;
}

export default function UploadSection({ currentLang = "en" }: UploadSectionProps) {
  const t = TRANSLATIONS[currentLang];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);

  // Geolocation State
  const [selectedMandiIndex, setSelectedMandiIndex] = useState<number>(0);
  const [userGps, setUserGps] = useState<{ lat: number | null; lng: number | null; address: string }>({
    lat: 28.6139,
    lng: 77.2090,
    address: "New Delhi Central Hub",
  });
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsDetectingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserGps({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: `GPS Lat: ${pos.coords.latitude.toFixed(2)}, Lng: ${pos.coords.longitude.toFixed(2)}`,
          });
          setIsDetectingGps(false);
        },
        (err) => {
          console.warn("GPS Geolocation notice:", err.message);
          setIsDetectingGps(false);
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WEBP).");
      return;
    }
    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultData(null);

    // Auto-detect & attach current live location when photo is uploaded
    if ("geolocation" in navigator) {
      setIsDetectingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserGps({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: `Live GPS: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`,
          });
          setIsDetectingGps(false);
        },
        (err) => {
          console.warn("GPS notice:", err.message);
          setIsDetectingGps(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleIdentify = async () => {
    if (!selectedFile) return;

    setIsScanning(true);
    setError(null);

    const activeMandi = MANDI_LOCATIONS[selectedMandiIndex];
    const finalLat = activeMandi.lat ?? userGps.lat ?? 28.6139;
    const finalLng = activeMandi.lng ?? userGps.lng ?? 77.2090;
    const finalLocationName = activeMandi.lat ? activeMandi.name : userGps.address;
    const finalState = activeMandi.state === "GPS" ? "Delhi NCR" : activeMandi.state;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("latitude", finalLat.toString());
    formData.append("longitude", finalLng.toString());
    formData.append("locationName", finalLocationName);
    formData.append("state", finalState);

    try {
      const response = await fetch("/api/identify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process image identification.");
      }

      setResultData(data);
    } catch (err: any) {
      console.error("Identification Error:", err);
      setError(err.message || "Could not connect to identification service.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResultData(null);
    setError(null);
  };

  return (
    <section id="identify" className="relative min-h-screen py-24 px-6 flex items-center justify-center z-10">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            AI Material Verification Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100">
            {t.identifyTitle}
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-sans">
            {t.identifySubtitle}
          </p>

          {/* Geo-location & Mandi Hub Selector */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-botanical-900/90 border border-emerald-500/30 text-slate-300 text-xs font-mono">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.locationHub}:</span>
              <select
                value={selectedMandiIndex}
                onChange={(e) => setSelectedMandiIndex(Number(e.target.value))}
                className="bg-slate-950 text-emerald-300 font-bold font-mono text-xs px-2.5 py-1 rounded-lg border border-emerald-500/40 focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                {MANDI_LOCATIONS.map((m, idx) => (
                  <option key={idx} value={idx}>
                    {m.name} {m.state !== "GPS" ? `(${m.state})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400">
              <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
              <span>
                {isDetectingGps ? (
                  "Acquiring GPS Signal..."
                ) : (
                  <>
                    GPS Fix: <span className="text-emerald-400 font-bold">{MANDI_LOCATIONS[selectedMandiIndex].lat ? `${MANDI_LOCATIONS[selectedMandiIndex].lat}° N` : userGps.address}</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Display Result Card if dataset returned */}
        {resultData ? (
          <ResultCard
            identification={resultData.identification}
            plantDetails={resultData.plantDetails}
            top3Candidates={resultData.top3Candidates}
            onReset={handleReset}
          />
        ) : (
          <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 relative overflow-hidden">
            {/* Drag & Drop Upload Zone */}
            {!previewUrl ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-12 text-center cursor-pointer transition-colors group bg-botanical-950/40"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <p className="text-slate-200 font-serif font-bold text-xl mb-1">
                  {t.dragDrop}
                </p>
                <p className="text-slate-400 text-xs font-mono mb-4">
                  Supports JPEG, PNG, WEBP (Max size 10MB)
                </p>
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-emerald-600/30 border border-emerald-400/40 text-emerald-300 text-xs font-mono uppercase tracking-wider hover:bg-emerald-600/50 transition-colors"
                >
                  {t.browseFiles}
                </button>
              </div>
            ) : (
              /* Image Preview & Animated Scanning Overlay */
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden max-h-[380px] bg-slate-950 flex items-center justify-center border border-emerald-500/30">
                  <img
                    src={previewUrl}
                    alt="Sample Preview"
                    className="max-h-[380px] w-full object-contain"
                  />

                  {/* Animated Cybernetic Scanning Laser Line */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col items-center justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute shadow-[0_0_15px_#34c773] animate-scan-laser" />
                      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 border border-emerald-400/50">
                        <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                        <span className="text-sm font-mono text-emerald-300 uppercase tracking-widest">
                          Running AI Neural Vision Scan...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isScanning}
                    className="px-5 py-2.5 rounded-full bg-botanical-900 text-slate-300 text-xs font-mono uppercase hover:bg-botanical-800 transition-colors disabled:opacity-50"
                  >
                    Change Image
                  </button>

                  <button
                    type="button"
                    onClick={handleIdentify}
                    disabled={isScanning}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm uppercase font-mono tracking-wider shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t.analyzing}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        {t.analyzeButton}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-3 text-rose-200 text-xs font-mono">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-rose-400 font-bold mb-0.5">Scan Failed</strong>
                  {error}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
