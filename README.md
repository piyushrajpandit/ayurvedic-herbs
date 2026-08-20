# 🌿 AYUSH BotaniAI: AI-Powered Medicinal Plant Identification & QA/QC System

> **Smart India Hackathon Problem Statement SIH260170**  
> *Identification of Different Medicinal Plants/Raw materials through Image Processing Using Machine Learning Algorithms*  
> **Ministry of AYUSH Initiative**

---

## 🌟 Overview
AYUSH BotaniAI is an end-to-end AI platform designed to eliminate crude drug misidentification and adulteration across the Ayurvedic herbal supply chain. Powered by a fine-tuned Vision Transformer (ViT) model, Grad-CAM Explainable AI (XAI), live GPS geo-hotspot tracking, and a B2B raw material marketplace, it provides instant verification for farmers, traders, quality auditors, and pharmaceutical manufacturers.

---

## 🔥 Key Features

1. **🤖 Fine-Tuned Vision Transformer (ViT) ML Engine**:
   * Uses Hugging Face fine-tuned ViT model [`iamudit02/ayurvedic-herbs-vit`](https://huggingface.co/iamudit02/ayurvedic-herbs-vit) achieving **99.6%+ accuracy** on medicinal plant species identification.

2. **🧠 Grad-CAM Explainable AI (XAI) Overlay**:
   * Highlights key leaf pixels (edges, veins, tip geometry) driving neural classification to build trust for auditors.

3. **🎛️ Interactive Side-by-Side Comparison Slider**:
   * Horizontal drag divider enabling real-time side-by-side inspection between the original photo and the XAI activation heatmap.

4. **📄 Downloadable QA/QC Verification Certificate (PDF)**:
   * Generates printable quality certificates with unique Cert IDs, SHA-256 tamper-proof cryptographic hashes, digital QR seals, and Ayurvedic details.

5. **📍 Live GPS Auto-Capture & Pan-India Geo-Hotspot Map**:
   * Automatically captures device GPS coordinates upon image upload and maps regional sourcing hotspots across **10 essential Indian medicinal plants**.

6. **🛒 B2B Raw Material Buying & Selling Marketplace**:
   * Connects farmers and traders with buyers, featuring product photos, price/kg, stock availability, and escrow purchase orders.

7. **🌐 Multilingual Support (5 Languages)**:
   * Real-time UI translation across **English**, **Hindi (हिन्दी)**, **Sanskrit (संस्कृतम्)**, **Tamil (தமிழ்)**, and **Telugu (తెలుగు)**.

---

## 🏗️ Tech Stack

* **Frontend**: Next.js 14, React, TailwindCSS, Lucide Icons, GSAP, WebGL/Three.js
* **Backend API**: Next.js App Router API Routes, FastAPI (Python)
* **Machine Learning**: PyTorch, Hugging Face Transformers (`iamudit02/ayurvedic-herbs-vit`), NumPy, Pillow, Grad-CAM Engine
* **Database**: MongoDB (Mongoose)

---

## 🚀 Getting Started

### 1. Python ML Microservice (FastAPI)
```bash
cd ayush-plant-ml-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

### 2. Next.js Web Application
```bash
cd ayush-plant-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License
This project is developed under the Smart India Hackathon (SIH260170) for the Ministry of AYUSH.
