export type Language = "en" | "hi" | "sa" | "ta" | "te";

export interface Translations {
  title: string;
  subtitle: string;
  scanner: string;
  adulterationCrisis: string;
  geoMap: string;
  marketplace: string;
  scanRawMaterial: string;
  heroTag: string;
  heroHeading: string;
  heroSubtitle: string;
  launchScanner: string;
  exploreCrisis: string;
  identifyTitle: string;
  identifySubtitle: string;
  locationHub: string;
  dragDrop: string;
  browseFiles: string;
  analyzing: string;
  analyzeButton: string;
  confidenceScore: string;
  verifiedIdentification: string;
  ayurvedicName: string;
  therapeuticUses: string;
  adulterationRisk: string;
  downloadPdf: string;
  reportMisclassification: string;
  scanAnother: string;
  changeLanguage: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    title: "AYUSH BotaniAI",
    subtitle: "Medicinal Plant Verification System",
    scanner: "AI Scanner",
    adulterationCrisis: "Adulteration Crisis",
    geoMap: "Geo-Hotspot Map",
    marketplace: "B2B Marketplace",
    scanRawMaterial: "Scan Raw Material",
    heroTag: "SIH260170 • Ministry of AYUSH Initiative",
    heroHeading: "AI-Powered Medicinal Plant Identification",
    heroSubtitle: "Eliminating crude drug misidentification and adulteration across the Ayurvedic supply chain with neural vision & pharmacopoeia intelligence.",
    launchScanner: "Launch Neural Scanner",
    exploreCrisis: "Explore Crisis Report",
    identifyTitle: "Identify Medicinal Plant Sample",
    identifySubtitle: "Upload a leaf or crude botanical raw material photograph to instantly verify species authenticity, locate geo-coordinates, and check for known adulterants.",
    locationHub: "Location Hub",
    dragDrop: "Drag and drop your plant sample image here",
    browseFiles: "Browse Files",
    analyzing: "Analyzing Botanical Sample...",
    analyzeButton: "Analyze Botanical Sample",
    confidenceScore: "AI Confidence Score",
    verifiedIdentification: "Verified Identification",
    ayurvedicName: "Ayurvedic / Sanskrit Name",
    therapeuticUses: "Therapeutic Uses & Parts",
    adulterationRisk: "Supply Chain Adulteration Risk",
    downloadPdf: "Download QA/QC Certificate (PDF)",
    reportMisclassification: "Report Misclassification",
    scanAnother: "Scan Another Plant Sample",
    changeLanguage: "Language",
  },
  hi: {
    title: "आयुष बोटानी-एआई",
    subtitle: "औषधीय पौधा और कच्चा माल सत्यापन प्रणाली",
    scanner: "एआई स्कैनर",
    adulterationCrisis: "मिलावट संकट रिपोर्ट",
    geoMap: "भौगोलिक हॉटस्पॉट मानचित्र",
    marketplace: "क्रय-विक्रय बाज़ार",
    scanRawMaterial: "कच्चे माल का परीक्षण करें",
    heroTag: "SIH260170 • आयुष मंत्रालय पहल",
    heroHeading: "एआई-संचालित औषधीय पौधा पहचान प्रणाली",
    heroSubtitle: "तंत्रिका दृष्टि और आयुर्वेद ज्ञानकोश के साथ कच्चे माल की गलत पहचान और मिलावट को समाप्त करना।",
    launchScanner: "न्यूरल स्कैनर चालू करें",
    exploreCrisis: "संकट रिपोर्ट देखें",
    identifyTitle: "औषधीय पौधे का नमूना पहचानें",
    identifySubtitle: "प्रजाति की प्रामाणिकता और मिलावट की जांच के लिए पत्तियों की तस्वीर अपलोड करें।",
    locationHub: "स्थान मंडी हब",
    dragDrop: "यहाँ अपने पौधे का चित्र खींचकर लाएँ",
    browseFiles: "फ़ाइलें चुनें",
    analyzing: "नमूने का विश्लेषण हो रहा है...",
    analyzeButton: "नमूने का विश्लेषण करें",
    confidenceScore: "एआई सटीकता स्कोर",
    verifiedIdentification: "सत्यापित पहचान",
    ayurvedicName: "आयुर्वेदिक / संस्कृत नाम",
    therapeuticUses: "चिकित्सीय उपयोग और भाग",
    adulterationRisk: "सप्लाई चेन मिलावट का जोखिम",
    downloadPdf: "क्यूए/क्यूसी प्रमाण पत्र (पीडीएफ) डाउनलोड करें",
    reportMisclassification: "गलत पहचान की रिपोर्ट करें",
    scanAnother: "अन्य पौधे का परीक्षण करें",
    changeLanguage: "भाषा बदलें",
  },
  sa: {
    title: "आयुष वनस्पति-एआई",
    subtitle: "औषधीय वनस्पति प्रमाणन तन्त्रम्",
    scanner: "एआई वीक्षकम्",
    adulterationCrisis: "मिश्रण सङ्कट विवरणम्",
    geoMap: "भौगोलिक मानचित्रम्",
    marketplace: "व्यापार क्षेत्रम्",
    scanRawMaterial: "मूलद्रव्यं परीक्षताम्",
    heroTag: "SIH260170 • आयुष मन्त्रालयस्य उपक्रमः",
    heroHeading: "एआई-सञ्चालितं वनस्पति अभिज्ञानम्",
    heroSubtitle: "आयुर्वेदिक संभरण शृङ्खलायां औषध मिश्रणस्य निर्मूलनम्।",
    launchScanner: "वीक्षकं प्रारभताम्",
    exploreCrisis: "विवरणं पश्यतु",
    identifyTitle: "औषधीय वनस्पतेः प्रतिदर्शं चिह्नायतु",
    identifySubtitle: "प्रजातेः सत्यतायाः परीक्षणाय पत्रस्य चित्रम् उपारोपयतु।",
    locationHub: "स्थान हब",
    dragDrop: "अत्र चित्रम् नयतु",
    browseFiles: "चित्रम् चिनोतु",
    analyzing: "विश्लेषणं चलति...",
    analyzeButton: "प्रतिदर्शं विश्लिषतु",
    confidenceScore: "विश्वसनीयता अङ्कः",
    verifiedIdentification: "प्रमाणितम् अभिज्ञानम्",
    ayurvedicName: "आयुर्वेदिक / संस्कृत नाम",
    therapeuticUses: "चिकित्सीय उपयोगाः",
    adulterationRisk: "मिश्रण सङ्कटः",
    downloadPdf: "प्रमाणपत्रं (PDF) अवाहरतु",
    reportMisclassification: "दोषं निवेदयतु",
    scanAnother: "अन्यं प्रतिदर्शं परीक्षताम्",
    changeLanguage: "भाषा",
  },
  ta: {
    title: "ஆயுஷ் போட்டனி-AI",
    subtitle: "மூலிகைத் தாவர சரிபார்ப்பு அமைப்பு",
    scanner: "AI ஸ்கேனர்",
    adulterationCrisis: "கலப்பட விழிப்புணர்வு",
    geoMap: "புவியியல் வரைபடம்",
    marketplace: "வர்த்தக மையம்",
    scanRawMaterial: "மூலப்பொருளைச் சோதிக்கவும்",
    heroTag: "SIH260170 • ஆயுஷ் அமைச்சக முயற்சி",
    heroHeading: "AI-மூலம் மூலிகைத் தாவரங்கள் கண்டறிதல்",
    heroSubtitle: "ஆயுர்வேத விநியோகச் சங்கிலியில் மூலிகை கலப்படத்தைத் தடுத்தல்.",
    launchScanner: "ஸ்கேனரைத் தொடங்கு",
    exploreCrisis: "அறிக்கையைப் பார்",
    identifyTitle: "மூலிகைத் மாதிரியைக் கண்டறியவும்",
    identifySubtitle: "தாவரத்தின் உண்மைத்தன்மையை சரிபார்க்க புகைப்படத்தைப் பதிவேற்றவும்.",
    locationHub: "இடம் மையம்",
    dragDrop: "படத்தை இங்கே இழுத்து இடவும்",
    browseFiles: "கோப்புகளைத் தேர்ந்தெடு",
    analyzing: "ஆய்வு செய்யப்படுகிறது...",
    analyzeButton: "மாதிரியை ஆய்வு செய்",
    confidenceScore: "AI துல்லிய அளவு",
    verifiedIdentification: "சரிபார்க்கப்பட்ட அடையாளம்",
    ayurvedicName: "ஆயுர்வேத / சமஸ்கிருத பெயர்",
    therapeuticUses: "மருத்துவப் பயன்கள்",
    adulterationRisk: "கலப்பட அபாயம்",
    downloadPdf: "QA/QC சான்றிதழ் (PDF) பதிவிறக்கு",
    reportMisclassification: "தவறைப் புகாரளி",
    scanAnother: "மற்றொரு மாதிரியைச் சோதி",
    changeLanguage: "மொழி",
  },
  te: {
    title: "ఆయుష్ బొటాని-AI",
    subtitle: "ఔషధ మొక్కల ధృవీకరణ వ్యవస్థ",
    scanner: "AI స్కేనర్",
    adulterationCrisis: "కల్తీ నివేదిక",
    geoMap: "భౌగోళిక మ్యాప్",
    marketplace: "వ్యాపార వేదిక",
    scanRawMaterial: "ముడి సరుకును తనిఖీ చేయండి",
    heroTag: "SIH260170 • ఆయుష్ మంత్రిత్వ శాఖ చొరవ",
    heroHeading: "AI-ఆధారిత ఔషధ మొక్కల గుర్తింపు",
    heroSubtitle: "ఆయుర్వేద సరఫరా వ్యవస్థలో ఔషధాల కల్తీని అరికట్టడం.",
    launchScanner: "స్కేనర్‌ను ప్రారంభించండి",
    exploreCrisis: "నివేదికను చూడండి",
    identifyTitle: "ఔషధ మొక్క నమూనాను గుర్తించండి",
    identifySubtitle: "మొక్కల ప్రామాణికతను తనిఖీ చేయడానికి ఫోటోను అప్‌లోడ్ చేయండి.",
    locationHub: "ప్రాంతీయ కేంద్రం",
    dragDrop: "చిత్రాన్ని ఇక్కడ వేయండి",
    browseFiles: "ఫైళ్లను ఎంచుకోండి",
    analyzing: "విశ్లేషిస్తోంది...",
    analyzeButton: "నమూనాను విశ్లేషించండి",
    confidenceScore: "AI ఖచ్చితత్వ స్కోరు",
    verifiedIdentification: "ధృవీకరించబడిన గుర్తింపు",
    ayurvedicName: "ఆయుర్వేద / సంస్కృత పేరు",
    therapeuticUses: "వైద్య ఉపయోగాలు",
    adulterationRisk: "కల్తీ ప్రమాదం",
    downloadPdf: "QA/QC సర్టిఫికేట్ (PDF) డౌన్‌లోడ్ చేయండి",
    reportMisclassification: "తప్పును నివేదించండి",
    scanAnother: "మరో నమూనాను తనిఖీ చేయండి",
    changeLanguage: "భాష",
  },
};
