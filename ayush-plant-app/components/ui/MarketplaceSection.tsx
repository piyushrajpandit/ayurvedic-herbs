"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Tag,
  ShieldCheck,
  PlusCircle,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  Send,
  UploadCloud,
  FileCheck,
  Image as ImageIcon,
} from "lucide-react";

interface Listing {
  id: string;
  title: string;
  species: string;
  seller: string;
  location: string;
  state: string;
  pricePerKg: number;
  availableKg: number;
  purityScore: string;
  imageUrl: string;
  grade: "Grade A+" | "Grade A" | "Organic Certified";
  verifiedDate: string;
}

const INITIAL_LISTINGS: Listing[] = [
  {
    id: "trade-1",
    title: "Organic Ashwagandha Dry Roots",
    species: "Withania somnifera (Ashwagandha)",
    seller: "Neemuch Farmer Producers Co-Op",
    location: "Neemuch Mandi",
    state: "Madhya Pradesh",
    pricePerKg: 480,
    availableKg: 850,
    purityScore: "99.6%",
    imageUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80",
    grade: "Grade A+",
    verifiedDate: "Verified Today",
  },
  {
    id: "trade-2",
    title: "Shade-Dried Krishna Tulsi Leaves",
    species: "Ocimum sanctum (Tulsi)",
    seller: "Himalayan Bio-Herb Traders",
    location: "Haridwar Wholesale Mandi",
    state: "Uttarakhand",
    pricePerKg: 240,
    availableKg: 1200,
    purityScore: "98.8%",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    grade: "Organic Certified",
    verifiedDate: "Verified Yesterday",
  },
  {
    id: "trade-3",
    title: "Pure Deseeded Amalaki Pericarp",
    species: "Emblica officinalis (Amla)",
    seller: "Western Ghats Tribal Collective",
    location: "Thrissur Hub",
    state: "Kerala",
    pricePerKg: 360,
    availableKg: 600,
    purityScore: "99.1%",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    grade: "Grade A+",
    verifiedDate: "Verified 2 days ago",
  },
  {
    id: "trade-4",
    title: "Authentic Aloe Vera Leaf Gel Slices",
    species: "Aloe barbadensis (Aloe Vera)",
    seller: "Thar Desert Farmers Union",
    location: "Jaipur Central Mandi",
    state: "Rajasthan",
    pricePerKg: 130,
    availableKg: 2500,
    purityScore: "100.0%",
    imageUrl: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=600&q=80",
    grade: "Grade A",
    verifiedDate: "Verified Today",
  },
  {
    id: "trade-5",
    title: "Sun-Dried Organic Neem Leaves",
    species: "Azadirachta indica (Neem)",
    seller: "Jodhpur Organic Growers Co-Op",
    location: "Nagaur Herbal Mandi",
    state: "Rajasthan",
    pricePerKg: 190,
    availableKg: 1400,
    purityScore: "99.4%",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80",
    grade: "Organic Certified",
    verifiedDate: "Verified Today",
  },
  {
    id: "trade-6",
    title: "Fresh Harvested Whole Brahmi Leaves",
    species: "Bacopa monnieri (Brahmi)",
    seller: "Palakkad Wetland Herbal Co-Op",
    location: "Thrissur Ayurvedic Mandi",
    state: "Kerala",
    pricePerKg: 420,
    availableKg: 550,
    purityScore: "99.8%",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    grade: "Grade A+",
    verifiedDate: "Verified Yesterday",
  },
];

export default function MarketplaceSection() {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellForm, setSellForm] = useState({
    title: "",
    species: "Withania somnifera (Ashwagandha)",
    seller: "",
    location: "",
    pricePerKg: "",
    availableKg: "",
    imageUrl: "",
  });
  const [sellSuccess, setSellSuccess] = useState(false);

  const [selectedBuyListing, setSelectedBuyListing] = useState<Listing | null>(null);
  const [buyQuantity, setBuyQuantity] = useState<number>(50);
  const [buySuccess, setBuySuccess] = useState(false);

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellForm.title || !sellForm.seller || !sellForm.pricePerKg) return;

    const newListing: Listing = {
      id: `trade-${Date.now()}`,
      title: sellForm.title,
      species: sellForm.species,
      seller: sellForm.seller,
      location: sellForm.location || "Central Mandi",
      state: "Verified Location",
      pricePerKg: Number(sellForm.pricePerKg),
      availableKg: Number(sellForm.availableKg) || 100,
      purityScore: "99.5%",
      imageUrl: sellForm.imageUrl || "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80",
      grade: "Grade A+",
      verifiedDate: "Just Now",
    };

    setListings([newListing, ...listings]);
    setSellSuccess(true);
    setTimeout(() => {
      setShowSellModal(false);
      setSellSuccess(false);
      setSellForm({
        title: "",
        species: "Withania somnifera (Ashwagandha)",
        seller: "",
        location: "",
        pricePerKg: "",
        availableKg: "",
        imageUrl: "",
      });
    }, 1800);
  };

  const handleConfirmPurchase = () => {
    setBuySuccess(true);
    setTimeout(() => {
      setSelectedBuyListing(null);
      setBuySuccess(false);
      setBuyQuantity(50);
    }, 2000);
  };

  return (
    <section id="marketplace" className="relative py-24 px-6 bg-slate-950 z-10 border-t border-emerald-500/20">
      <div className="max-w-7xl w-full mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
              <ShoppingBag className="w-4 h-4 text-teal-400" />
              Verified B2B Raw Material Trading Marketplace
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100">
              Buy & Sell Authentic Raw Herbs
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl font-sans">
              Direct trade platform connecting certified herb collectors, farmers, and mandis with Ayurvedic pharmaceutical manufacturers.
            </p>
          </div>

          <button
            onClick={() => setShowSellModal(true)}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            List Raw Material Batch for Sale
          </button>
        </div>

        {/* Listings Grid with High-Res Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-5 border border-emerald-500/30 space-y-4 flex flex-col justify-between hover:border-emerald-400/60 transition-all group bg-slate-900/90 shadow-xl"
            >
              <div className="space-y-3">
                {/* High Quality Botanical Product Image */}
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Quality & Grade Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="px-3 py-1 rounded-xl bg-emerald-950/90 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/40 backdrop-blur-md flex items-center gap-1 shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      AI Purity {item.purityScore}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-slate-950/90 text-[11px] font-mono text-amber-300 border border-amber-500/40 backdrop-blur-md z-10">
                    {item.grade}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-slate-300 truncate z-10">
                    {item.verifiedDate}
                  </div>
                </div>

                {/* Listing Title & Species */}
                <div>
                  <span className="text-xs font-mono text-emerald-400 block mb-1">
                    {item.species}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-100 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Seller & Location Info */}
                <div className="space-y-1 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <p className="text-slate-300 font-semibold truncate">🏢 Seller: {item.seller}</p>
                  <p className="flex items-center gap-1 text-teal-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-teal-400" />
                    {item.location}, {item.state}
                  </p>
                </div>
              </div>

              {/* Price & Buy Action Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Bulk Trade Price</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">₹{item.pricePerKg}</span>
                  <span className="text-xs text-slate-400 font-mono"> / kg</span>
                </div>

                <button
                  onClick={() => setSelectedBuyListing(item)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono uppercase tracking-wider font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 cursor-pointer"
                >
                  Buy Batch
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SELL MODAL (Post New Listing) */}
      {showSellModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 max-w-lg w-full border border-emerald-500/40 space-y-4 bg-slate-900 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                List Raw Material Batch for Sale
              </h3>
              <button onClick={() => setShowSellModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sellSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2 font-mono">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-300">Listing Published Live!</h4>
                <p className="text-xs text-slate-300">
                  Your raw material batch has been AI-verified and listed on the pan-India marketplace.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSellSubmit} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Batch Listing Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Organic Ashwagandha Roots Grade A"
                    value={sellForm.title}
                    onChange={(e) => setSellForm({ ...sellForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 border border-emerald-500/40 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Botanical Species:</label>
                    <select
                      value={sellForm.species}
                      onChange={(e) => setSellForm({ ...sellForm, species: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 text-emerald-300 border border-emerald-500/40"
                    >
                      <option value="Withania somnifera (Ashwagandha)">Ashwagandha</option>
                      <option value="Ocimum sanctum (Tulsi)">Tulsi</option>
                      <option value="Azadirachta indica (Neem)">Neem</option>
                      <option value="Aloe barbadensis (Aloe Vera)">Aloe Vera</option>
                      <option value="Emblica officinalis (Amla)">Amla</option>
                      <option value="Bacopa monnieri (Brahmi)">Brahmi</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Seller / Mandi Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rajasthan Farmers Union"
                      value={sellForm.seller}
                      onChange={(e) => setSellForm({ ...sellForm, seller: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 border border-emerald-500/40 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Asking Price (₹ per kg):</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 450"
                      value={sellForm.pricePerKg}
                      onChange={(e) => setSellForm({ ...sellForm, pricePerKg: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 border border-emerald-500/40 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Available Quantity (kg):</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500"
                      value={sellForm.availableKg}
                      onChange={(e) => setSellForm({ ...sellForm, availableKg: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 border border-emerald-500/40 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Image URL (Optional Photo Link):</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={sellForm.imageUrl}
                    onChange={(e) => setSellForm({ ...sellForm, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 border border-emerald-500/40 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSellModal(false)}
                    className="px-4 py-2.5 rounded-full text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publish Listing
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* BUY ORDER MODAL */}
      {selectedBuyListing && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 max-w-md w-full border border-emerald-500/40 space-y-4 bg-slate-900 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                Raw Material Purchase Order
              </h3>
              <button onClick={() => setSelectedBuyListing(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {buySuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2 font-mono">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-300">Purchase Order Placed!</h4>
                <p className="text-xs text-slate-300">
                  Escrow payment initiated. QA/QC verification certificate linked to order.
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px]">{selectedBuyListing.species}</span>
                  <h4 className="text-base font-serif font-bold text-slate-100">{selectedBuyListing.title}</h4>
                  <p className="text-emerald-400 font-bold">₹{selectedBuyListing.pricePerKg} / kg</p>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Select Order Quantity (kg):</label>
                  <input
                    type="number"
                    min="10"
                    max={selectedBuyListing.availableKg}
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 border border-emerald-500/40 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between font-bold">
                  <span>Total Order Amount:</span>
                  <span className="text-emerald-400 text-sm">
                    ₹{(selectedBuyListing.pricePerKg * buyQuantity).toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedBuyListing(null)}
                    className="px-4 py-2.5 rounded-full text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPurchase}
                    className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    Confirm Escrow Purchase
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
