"use client";

import React, { useState } from "react";
import {
  MapPin,
  ShieldAlert,
  Activity,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Layers,
  Filter,
  Radio,
  ExternalLink,
  Sparkles,
  Globe,
  Leaf,
  Info,
} from "lucide-react";

interface PlantGeoDistribution {
  id: string;
  commonName: string;
  scientificName: string;
  ayurvedicName: string;
  primaryRegion: string;
  state: string;
  lat: number;
  lng: number;
  activePhytochemical: string;
  harvestingSeason: string;
  primaryMandi: string;
  adulterationThreat: string;
  sourcingGrade: string;
  purityConfidence: string;
  imageUrl: string;
}

const TOP_10_MEDICINAL_PLANTS: PlantGeoDistribution[] = [
  {
    id: "plant-1",
    commonName: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    ayurvedicName: "Ghritakumari / Kumari",
    primaryRegion: "Thar Arid Region",
    state: "Rajasthan",
    lat: 26.9124,
    lng: 75.7873,
    activePhytochemical: "Aloin & Acemannan (18.4%)",
    harvestingSeason: "October – March",
    primaryMandi: "Jaipur Central Mandi",
    adulterationThreat: "Synthetic cellulose / Xanthan gel dilution",
    sourcingGrade: "Grade A+ Succulent",
    purityConfidence: "100.0%",
    imageUrl: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-2",
    commonName: "Ashwagandha",
    scientificName: "Withania somnifera",
    ayurvedicName: "Ashwagandha / Hayahvaya",
    primaryRegion: "Malwa Plateau",
    state: "Madhya Pradesh",
    lat: 24.4746,
    lng: 74.8703,
    activePhytochemical: "Withanolides & Withaferin A (4.2%)",
    harvestingSeason: "January – April",
    primaryMandi: "Neemuch Medicinal Hub",
    adulterationThreat: "Withania coagulans (Paneer Dodi) roots",
    sourcingGrade: "High Alkaloid Grade",
    purityConfidence: "99.6%",
    imageUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-3",
    commonName: "Tulsi",
    scientificName: "Ocimum sanctum",
    ayurvedicName: "Surasa / Vishnu-Priya",
    primaryRegion: "Himalayan Foothills",
    state: "Uttarakhand",
    lat: 28.6562,
    lng: 77.2227,
    activePhytochemical: "Eugenol & Ursolic Acid (7.1%)",
    harvestingSeason: "September – December",
    primaryMandi: "Khari Baoli Market (Delhi)",
    adulterationThreat: "Ocimum basilicum (Sweet Basil leaves)",
    sourcingGrade: "Essential Oil Rich",
    purityConfidence: "98.8%",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-4",
    commonName: "Amla (Indian Gooseberry)",
    scientificName: "Emblica officinalis",
    ayurvedicName: "Amalaki / Dhatri",
    primaryRegion: "Vindhyan Forest Belt",
    state: "Uttar Pradesh",
    lat: 24.5854,
    lng: 73.7125,
    activePhytochemical: "Ascorbic Acid & Gallic Acid (28.5%)",
    harvestingSeason: "November – February",
    primaryMandi: "Udaipur Forest Collection Hub",
    adulterationThreat: "Dried Apple Pericarp / Spent pulp",
    sourcingGrade: "Wild Forest Grade",
    purityConfidence: "99.1%",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-5",
    commonName: "Brahmi",
    scientificName: "Bacopa monnieri",
    ayurvedicName: "Brahmi / Saraswati",
    primaryRegion: "Western Ghats Wetlands",
    state: "Kerala",
    lat: 10.5276,
    lng: 76.2144,
    activePhytochemical: "Bacosides A & B (12.3%)",
    harvestingSeason: "July – November",
    primaryMandi: "Thrissur Ayurvedic Hub",
    adulterationThreat: "Centella asiatica (Gotu Kola / Mandukaparni)",
    sourcingGrade: "Nootropic Grade",
    purityConfidence: "99.8%",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-6",
    commonName: "Neem",
    scientificName: "Azadirachta indica",
    ayurvedicName: "Nimba / Arishta",
    primaryRegion: "Marwar Desert Border",
    state: "Rajasthan",
    lat: 27.2000,
    lng: 73.7400,
    activePhytochemical: "Azadirachtin & Nimbin (3.8%)",
    harvestingSeason: "May – August",
    primaryMandi: "Nagaur Organic Hub",
    adulterationThreat: "Melia azedarach (Bakayan) leaves",
    sourcingGrade: "Grade A Bitter Leaf",
    purityConfidence: "99.4%",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-7",
    commonName: "Giloy (Guduchi)",
    scientificName: "Tinospora cordifolia",
    ayurvedicName: "Amrita / Guduchi",
    primaryRegion: "Gir Forest Ecosystem",
    state: "Gujarat",
    lat: 23.0225,
    lng: 72.5714,
    activePhytochemical: "Tinosporide & Berberine (5.6%)",
    harvestingSeason: "All Year (Peak Oct–Feb)",
    primaryMandi: "Ahmedabad Botanical Mandi",
    adulterationThreat: "Tinospora sinensis (Wild stem variant)",
    sourcingGrade: "Immunomodulator Grade",
    purityConfidence: "99.2%",
    imageUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-8",
    commonName: "Shatavari",
    scientificName: "Asparagus racemosus",
    ayurvedicName: "Shatavari / Bahupatri",
    primaryRegion: "Sahyadri Western Ghats",
    state: "Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    activePhytochemical: "Shatavarins I-IV (9.2%)",
    harvestingSeason: "December – March",
    primaryMandi: "Pune Herbal Auction Hub",
    adulterationThreat: "Asparagus adscendens (Safed Musli spent roots)",
    sourcingGrade: "Grade A Tuber Root",
    purityConfidence: "98.9%",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-9",
    commonName: "Turmeric (Haridra)",
    scientificName: "Curcuma longa",
    ayurvedicName: "Haridra / Nisha",
    primaryRegion: "Deccan Plateau River Basins",
    state: "Tamil Nadu",
    lat: 11.3410,
    lng: 77.7172,
    activePhytochemical: "Curcumin (5.4%)",
    harvestingSeason: "January – March",
    primaryMandi: "Erode Curcumin Trading Hub",
    adulterationThreat: "Metanil Yellow / Cassava starch flour",
    sourcingGrade: "High Curcumin Grade",
    purityConfidence: "99.7%",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plant-10",
    commonName: "Haritaki",
    scientificName: "Terminalia chebula",
    ayurvedicName: "Abhaya / Pathya",
    primaryRegion: "Chota Nagpur Forest Region",
    state: "Jharkhand",
    lat: 22.5726,
    lng: 88.3639,
    activePhytochemical: "Chebulagic & Chebulic Acid (32.1%)",
    harvestingSeason: "November – January",
    primaryMandi: "Kolkata Crude Herbal Market",
    adulterationThreat: "Immature pericarp / Spent fruit powder",
    sourcingGrade: "Triphala Grade A+",
    purityConfidence: "99.0%",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  },
];

export default function GeoMapSection() {
  const [selectedPlant, setSelectedPlant] = useState<PlantGeoDistribution>(TOP_10_MEDICINAL_PLANTS[0]);

  const googleMapsUrl = `https://maps.google.com/maps?q=${selectedPlant.lat},${selectedPlant.lng}&z=10&output=embed`;

  return (
    <section id="geolocation" className="relative py-24 px-6 bg-slate-950 z-10 border-t border-emerald-500/20">
      <div className="max-w-7xl w-full mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Globe className="w-4 h-4 text-teal-400" />
            Top 10 Indian Medicinal Plants Sourcing Map
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100">
            Geographical Distribution & Sourcing Hotspots
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-sans">
            Pan-India spatial mapping tracking the harvest origin points, phytochemical concentration zones, and trade mandis for India&apos;s 10 essential Ayurvedic species.
          </p>
        </div>

        {/* Top 10 Species Selection Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-2 overflow-x-auto">
          {TOP_10_MEDICINAL_PLANTS.map((plant, idx) => {
            const isSelected = selectedPlant.id === plant.id;
            return (
              <button
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={`px-4 py-2.5 rounded-2xl font-mono text-xs flex items-center gap-2 transition-all border shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-950 to-teal-950 border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-950/70 ring-2 ring-emerald-500/30 scale-105"
                    : "bg-slate-900/90 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{plant.commonName}</span>
                <span className="text-[10px] text-slate-500">({plant.state})</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Live Google Maps + Detailed Phytochemical Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Real Google Maps GIS Viewport */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-4 border border-emerald-500/30 relative overflow-hidden min-h-[520px] flex flex-col justify-between bg-slate-950 shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-3 px-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">{selectedPlant.primaryRegion} ({selectedPlant.state})</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedPlant.lat},${selectedPlant.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open GPS in Google Maps
              </a>
            </div>

            {/* Embedded Live Google Maps Frame */}
            <div className="relative w-full h-[440px] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-slate-900">
              <iframe
                title="Google Maps Sourcing View"
                src={googleMapsUrl}
                className="w-full h-full border-0 filter contrast-125 brightness-90 saturate-125"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Glassmorphic Overlay Card */}
              <div className="absolute top-4 left-4 bg-slate-950/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-emerald-500/40 text-xs font-mono shadow-2xl flex items-center gap-3 max-w-sm">
                <img
                  src={selectedPlant.imageUrl}
                  alt={selectedPlant.commonName}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40 shrink-0"
                />
                <div>
                  <span className="text-emerald-400 font-bold block">{selectedPlant.commonName}</span>
                  <span className="text-[11px] text-slate-300 italic block">{selectedPlant.scientificName}</span>
                  <span className="text-[10px] text-slate-500 block">Sourcing Hub: {selectedPlant.primaryMandi}</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-3 px-2 flex items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified Sourcing Hotspot • {selectedPlant.sourcingGrade}
              </span>
              <span className="text-slate-500 text-[11px]">GPS Datum: {selectedPlant.lat}° N, {selectedPlant.lng}° E</span>
            </div>
          </div>

          {/* Plant Phytochemical & Sourcing Details Inspector */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-emerald-500/30 space-y-6 bg-slate-900/90 shadow-2xl">
            {/* Plant Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block">
                  {selectedPlant.state} • {selectedPlant.primaryRegion}
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-100">{selectedPlant.commonName}</h3>
                <p className="text-emerald-400 text-xs font-mono italic">{selectedPlant.scientificName}</p>
                <p className="text-amber-400 text-xs font-mono font-semibold">Sanskrit: {selectedPlant.ayurvedicName}</p>
              </div>

              <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shrink-0">
                {selectedPlant.purityConfidence} Pure
              </span>
            </div>

            {/* Phytochemical & Harvesting Details */}
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Active Phytochemical Marker</span>
                <strong className="text-emerald-300 font-bold text-sm block">{selectedPlant.activePhytochemical}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Peak Harvesting Season</span>
                <strong className="text-slate-200 font-bold block">{selectedPlant.harvestingSeason}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Primary Mandi Trade Hub</span>
                <strong className="text-teal-300 font-bold block">{selectedPlant.primaryMandi}</strong>
              </div>
            </div>

            {/* Known Adulteration Threat */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1 text-xs font-mono text-rose-200">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Primary Adulteration Threat</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedPlant.adulterationThreat}</p>
            </div>

            {/* Quick Scanner Scroll Action */}
            <a
              href="#identify"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <Navigation className="w-4 h-4" />
              Scan Sample of {selectedPlant.commonName}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
