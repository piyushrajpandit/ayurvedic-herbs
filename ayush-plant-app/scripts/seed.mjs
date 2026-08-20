import mongoose from 'mongoose';
import process from 'process';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayush_db';

const PlantSchema = new mongoose.Schema(
  {
    datasetLabel: { type: String, required: true, unique: true },
    commonName: { type: String, required: true },
    ayurvedicName: { type: String, required: true },
    scientificName: { type: String, required: true },
    medicinalUses: [{ type: String }],
    partsUsed: [{ type: String }],
    knownAdulterants: [
      {
        adulterantName: String,
        scientificName: String,
        visualDifferences: String,
        healthImpacts: String,
      },
    ],
    knownSubstitutes: [
      {
        substituteName: String,
        scientificName: String,
        therapeuticRationale: String,
      },
    ],
    regionOfAvailability: [{ type: String }],
    imageUrl: { type: String },
    isPlaceholderData: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Plant = mongoose.models.Plant || mongoose.model('Plant', PlantSchema);

const seedPlants = [
  {
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
        adulterantName: "Milletia pinnata (Karanja) Leaves",
        scientificName: "Millettia pinnata",
        visualDifferences: "Karanja leaves are darker green, glossy, and lack the serrated leaf margin characteristic of Neem leaves.",
        healthImpacts: "Different alkaloid profile; may cause mild gastric upset if ingested in large doses."
      },
      {
        adulterantName: "Melia azedarach (Bakayan / Persian Lilac)",
        scientificName: "Melia azedarach",
        visualDifferences: "Bipinnately compound leaves with larger, wider leaflets and twice-serrated margins.",
        healthImpacts: "Contains toxic meliatoxins; can cause severe stomach upset and neurotoxicity if confused with Neem."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Mahanimba (Melia azedarach - processed)",
        scientificName: "Melia azedarach",
        therapeuticRationale: "Used strictly externally for skin washes under expert supervision when Nimba is unavailable."
      }
    ],
    regionOfAvailability: ["Tropical & Sub-tropical India", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh", "Tamil Nadu"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Neem_leaves.jpg",
    isPlaceholderData: false
  },
  {
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
        adulterantName: "Ocimum basilicum (Sweet Basil / Sweet Tulsi)",
        scientificName: "Ocimum basilicum",
        visualDifferences: "Larger, smoother, brighter green leaves with sweet anise scent rather than pungent clove-like fragrance.",
        healthImpacts: "Lacks the high eugenol content responsible for Tulsi's potent immunomodulatory potency."
      },
      {
        adulterantName: "Ocimum gratissimum (Ram Tulsi / Wild Basil)",
        scientificName: "Ocimum gratissimum",
        visualDifferences: "Larger shrub with coarse, hairy leaves and stronger lemon-thyme aroma.",
        healthImpacts: "Varying essential oil profile; milder anti-inflammatory effect."
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
    isPlaceholderData: false
  },
  {
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
        visualDifferences: "Roots are darker, thinner, and less starchy; lack the distinct horse-like odor of genuine Ashwagandha.",
        healthImpacts: "Exhibits different coagulating properties and lower withanolide concentration."
      },
      {
        adulterantName: "Exhausted Root Powder",
        scientificName: "Withania somnifera (spent material)",
        visualDifferences: "Faded color, reduced pungent aroma, starch content depleted by chemical extraction.",
        healthImpacts: "Inert material with zero therapeutic efficacy."
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
    isPlaceholderData: false
  },
  {
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
    isPlaceholderData: false
  },
  {
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
        visualDifferences: "Centella has kidney-shaped (reniform) serrated leaves, whereas Bacopa has small, fleshy, oblong succulent leaves.",
        healthImpacts: "Centella is a recognized Ayurvedic substitute (Mandukaparni), but commercial mixing mislabels dosage standards."
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
    isPlaceholderData: false
  },
  {
    datasetLabel: "Aloe barbadensis (Aloe Vera / Ghritkumari)",
    commonName: "Aloe Vera",
    ayurvedicName: "Ghritakumari / Kumari",
    scientificName: "Aloe barbadensis",
    medicinalUses: [
      "Digestive tonic and laxative (Bhedana)",
      "Soothes burns, wound healing, and skin hydration",
      "Female reproductive tonic"
    ],
    partsUsed: ["Leaf Gel", "Leaf Exudate (Elwa)"],
    knownAdulterants: [
      {
        adulterantName: "Synthetic Cellulose Gel / Xanthan Gum Admixture",
        scientificName: "N/A",
        visualDifferences: "Transparent gel without cellular fiber matrix or characteristic bitter Aloin smell.",
        healthImpacts: "Void of active acemannan polysaccharides."
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "Kumari (Aloe indica - wild variant)",
        scientificName: "Aloe indica",
        therapeuticRationale: "Wild traditional variety with higher aloin resin content."
      }
    ],
    regionOfAvailability: ["Arid regions", "Rajasthan", "Gujarat", "Deccan Peninsula"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png",
    isPlaceholderData: false
  },
  {
    datasetLabel: "Placeholder Species (Demo Data)",
    commonName: "Sample Ayurvedic Plant",
    ayurvedicName: "Sample Sanskrit Name",
    scientificName: "Sample species",
    medicinalUses: ["[VERIFY FOR DEMO] General wellness and digestive support"],
    partsUsed: ["[VERIFY FOR DEMO] Leaves"],
    knownAdulterants: [
      {
        adulterantName: "[VERIFY FOR DEMO] Common wild weed adulterant",
        visualDifferences: "[VERIFY FOR DEMO] Leaves lack serrated edge",
        healthImpacts: "[VERIFY FOR DEMO] Reduced potency"
      }
    ],
    knownSubstitutes: [
      {
        substituteName: "[VERIFY FOR DEMO] Allied species",
        therapeuticRationale: "[VERIFY FOR DEMO] Similar therapeutic rasa"
      }
    ],
    regionOfAvailability: ["[VERIFY FOR DEMO] Central India"],
    imageUrl: "https://via.placeholder.com/400x300?text=AYUSH+Medicinal+Plant",
    isPlaceholderData: true
  }
];

async function seedDB() {
  try {
    console.log(`🔌 Connecting to MongoDB Atlas at ${MONGODB_URI.replace(/:([^@]+)@/, ':****@')}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully.');

    console.log('🧹 Clearing existing plant records...');
    await Plant.deleteMany({});

    console.log('🌱 Inserting Ayurvedic plant knowledge base records...');
    const created = await Plant.insertMany(seedPlants);
    console.log(`🎉 Successfully seeded ${created.length} plant records!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDB();
