import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/mongodb';
import Plant from '@/models/Plant';
import PredictionLog from '@/models/PredictionLog';

// Fallback Ayurvedic Knowledge Dictionary
const FALLBACK_PLANTS: Record<string, any> = {
  "Azadirachta indica (Neem)": {
    datasetLabel: "Azadirachta indica (Neem)",
    commonName: "Neem",
    ayurvedicName: "Nimba / Arishta",
    scientificName: "Azadirachta indica",
    medicinalUses: [
      "Purifies blood and treats chronic skin disorders (Eczema, Psoriasis)",
      "Antimicrobial and anti-inflammatory agent",
      "Manages blood sugar levels (Prameha in Ayurveda)"
    ],
    partsUsed: ["Leaves", "Bark", "Seeds", "Oil"],
    knownAdulterants: [
      {
        adulterantName: "Melia azedarach (Bakayan / Persian Lilac)",
        scientificName: "Melia azedarach",
        visualDifferences: "Bipinnately compound leaves with larger, wider leaflets and twice-serrated margins.",
        healthImpacts: "Contains toxic meliatoxins; can cause severe stomach upset if confused with Neem."
      },
      {
        adulterantName: "Millettia pinnata (Karanja) Leaves",
        scientificName: "Millettia pinnata",
        visualDifferences: "Karanja leaves are darker green, glossy, and lack serrated leaf margins.",
        healthImpacts: "Different alkaloid profile; lower anti-fungal efficacy."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Mahanimba (Melia azedarach - processed)",
        scientificName: "Melia azedarach",
        therapeuticRationale: "Used strictly externally for skin washes under expert supervision when Nimba is unavailable."
      }
    ],
    regionOfAvailability: ["Tropical & Sub-tropical India", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Neem_leaves.jpg",
  },
  "Ocimum sanctum (Tulsi)": {
    datasetLabel: "Ocimum sanctum (Tulsi)",
    commonName: "Holy Basil / Tulsi",
    ayurvedicName: "Tulasi / Surasa",
    scientificName: "Ocimum sanctum",
    medicinalUses: [
      "Relieves upper respiratory infections, cough, and cold (Kasa-Svasa)",
      "Potent adaptogen and immunomodulator (Rasayana)",
      "Reduces stress and enhances digestive fire (Agni)"
    ],
    partsUsed: ["Leaves", "Seeds", "Whole Plant"],
    knownAdulterants: [
      {
        adulterantName: "Ocimum basilicum (Sweet Basil)",
        scientificName: "Ocimum basilicum",
        visualDifferences: "Larger, smoother leaves with sweet anise scent rather than pungent clove-like fragrance.",
        healthImpacts: "Lacks the high eugenol content responsible for Tulsi's potent immunomodulatory potency."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Krishna Tulsi (Dark variety)",
        scientificName: "Ocimum sanctum var. sanctum",
        therapeuticRationale: "Equally potent; preferred in severe Kapha disorders."
      }
    ],
    regionOfAvailability: ["Throughout India", "Himalayan Foothills", "Deccan Plateau"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ocimum_sanctum_001.JPG",
  },
  "Withania somnifera (Ashwagandha)": {
    datasetLabel: "Withania somnifera (Ashwagandha)",
    commonName: "Ashwagandha / Indian Ginseng",
    ayurvedicName: "Ashwagandha / Hayahvaya",
    scientificName: "Withania somnifera",
    medicinalUses: [
      "Enhances vitality, stamina, and muscular strength (Balya & Vrishya)",
      "Reduces cortisol, anxiety, and insomnia (Nidrajanana)",
      "Supports neurological health and memory"
    ],
    partsUsed: ["Roots", "Leaves"],
    knownAdulterants: [
      {
        adulterantName: "Withania coagulans (Paneer Dodi) Roots",
        scientificName: "Withania coagulans",
        visualDifferences: "Roots are darker, thinner, and less starchy; lack the distinct horse-like odor.",
        healthImpacts: "Exhibits different coagulating properties and lower withanolide concentration."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Shatavari (Asparagus racemosus)",
        scientificName: "Asparagus racemosus",
        therapeuticRationale: "Substituted as a rejuvenating tonic (Rasayana) when cooling Pitta-pacifying action is preferred."
      }
    ],
    regionOfAvailability: ["Madhya Pradesh", "Rajasthan", "Punjab", "Gujarat"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Withania_somnifera_1.jpg",
  },
  "Aloe barbadensis (Aloe Vera)": {
    datasetLabel: "Aloe barbadensis (Aloe Vera)",
    commonName: "Aloe Vera",
    ayurvedicName: "Ghritakumari / Kumari",
    scientificName: "Aloe barbadensis",
    medicinalUses: [
      "Digestive tonic and laxative (Bhedana)",
      "Soothes burns, wound healing, and skin hydration",
      "Female reproductive tonic and anti-inflammatory"
    ],
    partsUsed: ["Leaf Gel", "Leaf Exudate (Elwa)"],
    knownAdulterants: [
      {
        adulterantName: "Synthetic Cellulose Gel / Xanthan Gum Admixture",
        scientificName: "N/A",
        visualDifferences: "Transparent synthetic gel lacking cellular fiber matrix and Aloin bitterness.",
        healthImpacts: "Devoid of active acemannan polysaccharides."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Kumari (Aloe indica - wild variant)",
        scientificName: "Aloe indica",
        therapeuticRationale: "Traditional wild variant with high aloin resin content."
      }
    ],
    regionOfAvailability: ["Arid regions", "Rajasthan", "Gujarat", "Deccan Peninsula"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png",
  },
  "Emblica officinalis (Amla)": {
    datasetLabel: "Emblica officinalis (Amla)",
    commonName: "Indian Gooseberry / Amla",
    ayurvedicName: "Amalaki / Dhatri",
    scientificName: "Emblica officinalis",
    medicinalUses: [
      "Richest natural source of Vitamin C; potent anti-aging antioxidant",
      "Promotes hair growth, eyesight, and liver detoxification",
      "Balances all three Doshas (Vata, Pitta, Kapha)"
    ],
    partsUsed: ["Fresh Fruit", "Dried Pericarp", "Leaves"],
    knownAdulterants: [
      {
        adulterantName: "Dried Apple Pericarp or Deseeded Wild Fruits",
        scientificName: "Malus domestica / Wild berries",
        visualDifferences: "Lacks 6-segmented ridges of genuine dried Amalaki pericarp; dark reddish-brown hue.",
        healthImpacts: "Absence of low-molecular-weight hydrolysable tannins (Emblicanin A & B)."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Haritaki (Terminalia chebula)",
        scientificName: "Terminalia chebula",
        therapeuticRationale: "Used as alternate digestive rejuvenator in Triphala formulations."
      }
    ],
    regionOfAvailability: ["Uttar Pradesh", "Himachal Pradesh", "Maharashtra", "Karnataka"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Phyllanthus_emblica_fruit.jpg",
  },
  "Bacopa monnieri (Brahmi)": {
    datasetLabel: "Bacopa monnieri (Brahmi)",
    commonName: "Brahmi / Water Hyssop",
    ayurvedicName: "Brahmi / Sarasvati",
    scientificName: "Bacopa monnieri",
    medicinalUses: [
      "Nootropic herb to enhance cognitive function, memory (Medhya), and focus",
      "Reduces anxiety and nervous exhaustion",
      "Mild sedative for sleep regulation"
    ],
    partsUsed: ["Whole Plant", "Leaves"],
    knownAdulterants: [
      {
        adulterantName: "Centella asiatica (Gotu Kola / Mandukaparni)",
        scientificName: "Centella asiatica",
        visualDifferences: "Centella has kidney-shaped serrated leaves, whereas Bacopa has small succulent oblong leaves.",
        healthImpacts: "Different active bacosides profile."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Mandukaparni (Centella asiatica)",
        scientificName: "Centella asiatica",
        therapeuticRationale: "Official Classical Ayurvedic substitute (Abhava Dravya) for Medhya (brain-tonic) effects."
      }
    ],
    regionOfAvailability: ["Wetlands throughout India", "Kerala", "West Bengal", "Bihar"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Bacopa_monnieri1.jpg",
  }
};

export async function POST(request: NextRequest) {
  try {
    const mlApiUrl = process.env.ML_API_URL || 'http://localhost:8000';
    const predictEndpoint = `${mlApiUrl.replace(/\/$/, '')}/predict`;

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: 'No image file uploaded. Please select an image file.' },
        { status: 400 }
      );
    }

    const fileType = (file as File).type || '';
    if (fileType && !fileType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Unsupported image format. Please upload JPEG, PNG, or WEBP.' },
        { status: 400 }
      );
    }

    const mlFormData = new FormData();
    mlFormData.append('file', file, (file as File).name || 'upload.jpg');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let mlResponse;
    try {
      mlResponse = await fetch(predictEndpoint, {
        method: 'POST',
        body: mlFormData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Inference request timed out after 10 seconds. The ML server may be warming up.',
          },
          { status: 540 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: `ML API offline or unreachable at ${predictEndpoint}. Please verify server status.`,
          details: err.message,
        },
        { status: 503 }
      );
    }

    if (!mlResponse.ok) {
      const errorText = await mlResponse.text();
      return NextResponse.json(
        {
          success: false,
          error: `ML inference server returned error code ${mlResponse.status}`,
          details: errorText,
        },
        { status: mlResponse.status }
      );
    }

    const mlData = await mlResponse.json();
    const topConfidence = mlData.confidence || 0.0;
    const isLowConfidence = topConfidence < 0.60;

    // Compute SHA-256 Cryptographic Fingerprint of prediction payload
    const rawPayloadString = `${mlData.species}:${topConfidence}:${Date.now()}`;
    const sha256Hash = crypto.createHash('sha256').update(rawPayloadString).digest('hex');

    const lat = formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : undefined;
    const lng = formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : undefined;
    const locationName = (formData.get('locationName') as string) || 'New Delhi Central Hub';
    const state = (formData.get('state') as string) || 'Delhi NCR';

    // Connect to MongoDB Atlas (if available)
    const dbConn = await connectToDatabase();
    if (dbConn) {
      try {
        await PredictionLog.create({
          species: mlData.species,
          confidence: topConfidence,
          isLowConfidence: isLowConfidence,
          top3Candidates: mlData.top_3 || [],
          clientIp: request.headers.get('x-forwarded-for') || '127.0.0.1',
          location: {
            latitude: lat,
            longitude: lng,
            locationName,
            state,
          },
        });
      } catch (logErr) {
        console.warn('⚠️ Failed to save prediction log to Mongo:', logErr);
      }
    }

    const topSpeciesName = mlData.species;

    const findPlant = async (speciesStr: string) => {
      if (!speciesStr) return FALLBACK_PLANTS["Azadirachta indica (Neem)"];
      
      const cleanTarget = speciesStr.toLowerCase();

      if (dbConn) {
        try {
          const found = await Plant.findOne({
            $or: [
              { datasetLabel: { $regex: new RegExp(cleanTarget.split(' ')[0], 'i') } },
              { scientificName: { $regex: new RegExp(cleanTarget.split(' ')[0], 'i') } },
              { commonName: { $regex: new RegExp(cleanTarget.split(' ')[0], 'i') } },
            ],
          });
          if (found) return found;
        } catch (dbErr) {
          console.warn('Plant Mongo query notice:', dbErr);
        }
      }

      for (const [key, val] of Object.entries(FALLBACK_PLANTS)) {
        const k = key.toLowerCase();
        const c = val.commonName.toLowerCase();
        const s = val.scientificName.toLowerCase();
        const a = val.ayurvedicName.toLowerCase();

        if (
          k.includes(cleanTarget) || cleanTarget.includes(k) ||
          c.includes(cleanTarget) || cleanTarget.includes(c) ||
          s.includes(cleanTarget) || cleanTarget.includes(s) ||
          a.includes(cleanTarget) || cleanTarget.includes(a) ||
          (cleanTarget.includes('aloe') && (k.includes('aloe') || c.includes('aloe'))) ||
          (cleanTarget.includes('amla') && (k.includes('amla') || c.includes('amla'))) ||
          (cleanTarget.includes('brahmi') && (k.includes('brahmi') || c.includes('brahmi'))) ||
          (cleanTarget.includes('neem') && (k.includes('neem') || c.includes('neem'))) ||
          (cleanTarget.includes('tulsi') && (k.includes('tulsi') || c.includes('tulsi'))) ||
          (cleanTarget.includes('ashwagandha') && (k.includes('ashwagandha') || c.includes('ashwagandha')))
        ) {
          return val;
        }
      }

      if (cleanTarget.includes("aloe")) return FALLBACK_PLANTS["Aloe barbadensis (Aloe Vera)"];
      if (cleanTarget.includes("amla")) return FALLBACK_PLANTS["Emblica officinalis (Amla)"];
      if (cleanTarget.includes("brahmi")) return FALLBACK_PLANTS["Bacopa monnieri (Brahmi)"];
      if (cleanTarget.includes("tulsi")) return FALLBACK_PLANTS["Ocimum sanctum (Tulsi)"];
      if (cleanTarget.includes("ashwagandha")) return FALLBACK_PLANTS["Withania somnifera (Ashwagandha)"];

      return FALLBACK_PLANTS["Azadirachta indica (Neem)"];
    };

    let primaryPlant = await findPlant(topSpeciesName);

    const top3Details = await Promise.all(
      (mlData.top_3 || []).map(async (candidate: { species: string; confidence: number }) => {
        const details = await findPlant(candidate.species);
        return {
          species: candidate.species,
          confidence: candidate.confidence,
          plantDetails: details || null,
        };
      })
    );

    return NextResponse.json({
      success: true,
      identification: {
        species: mlData.species,
        confidence: mlData.confidence,
        isLowConfidence: isLowConfidence,
        inferenceTimeMs: mlData.inference_time_ms,
        gradcamHeatmap: mlData.gradcam_heatmap || null,
        cryptographicHash: sha256Hash,
      },
      plantDetails: primaryPlant,
      top3Candidates: top3Details,
    });
  } catch (error: any) {
    console.error('API Error in /api/identify:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error during plant identification',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
