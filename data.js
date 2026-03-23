// ── Medicine Database ─────────────────────────────────
const MEDICINE_DB = {
  enrofloxacin: {
    name: "Enrofloxacin",
    mr: { use:"श्वसन रोग (CRD), E.coli, Salmonella वर उपयुक्त", dose:"10mg/kg शरीर वजन, 5 दिवस पाण्यात", warning:"Laying hens ला देऊ नका" },
    en: { use:"Respiratory disease (CRD), E.coli, Salmonella", dose:"10mg/kg body weight, 5 days in water", warning:"Do not give to laying hens" },
    hi: { use:"श्वसन रोग (CRD), E.coli, Salmonella", dose:"10mg/kg शरीर भार, 5 दिन पानी में", warning:"अंडे देने वाली मुर्गियों को न दें" }
  },
  amoxicillin: {
    name: "Amoxicillin",
    mr: { use:"Bacterial infection, न्यूमोनिया, CRD", dose:"15mg/kg, 5 दिवस", warning:"गर्भवती पक्ष्यांना काळजीपूर्वक" },
    en: { use:"Bacterial infections, pneumonia, CRD", dose:"15mg/kg, 5 days", warning:"Use carefully in breeding birds" },
    hi: { use:"Bacterial संक्रमण, निमोनिया", dose:"15mg/kg, 5 दिन", warning:"ब्रीडिंग पक्षियों में सावधानी" }
  },
  amprolium: {
    name: "Amprolium",
    mr: { use:"Coccidiosis - रक्त विष्ठा, अशक्तपणा", dose:"30mg/kg, 5-7 दिवस पाण्यात मिसळा", warning:"Thiamine (Vit B1) सोबत देऊ नका" },
    en: { use:"Coccidiosis - bloody droppings, weakness", dose:"30mg/kg, 5-7 days in water", warning:"Don't give with Thiamine (Vit B1)" },
    hi: { use:"Coccidiosis - खूनी बीट, कमजोरी", dose:"30mg/kg, 5-7 दिन पानी में", warning:"Thiamine के साथ न दें" }
  },
  tylosin: {
    name: "Tylosin",
    mr: { use:"Mycoplasmosis, CRD, Chronic Respiratory Disease", dose:"500mg/L पाण्यात, 5 दिवस", warning:"Macrolide antibiotic - vet च्या सल्ल्याने" },
    en: { use:"Mycoplasmosis, CRD, Chronic respiratory disease", dose:"500mg/L water, 5 days", warning:"Macrolide antibiotic - use under vet guidance" },
    hi: { use:"Mycoplasmosis, CRD", dose:"500mg/L पानी, 5 दिन", warning:"पशु चिकित्सक की सलाह से दें" }
  },
  doxycycline: {
    name: "Doxycycline",
    mr: { use:"Respiratory + Intestinal infections, Mycoplasma, Chlamydia", dose:"10mg/kg, 5-7 दिवस", warning:"Laying hens - अंडी रंगहीन होऊ शकतात" },
    en: { use:"Respiratory + intestinal infections, Mycoplasma, Chlamydia", dose:"10mg/kg, 5-7 days", warning:"Eggs may discolor in layers" },
    hi: { use:"श्वसन + आंत संक्रमण", dose:"10mg/kg, 5-7 दिन", warning:"अंडे का रंग बदल सकता है" }
  },
  metronidazole: {
    name: "Metronidazole",
    mr: { use:"Blackhead disease (Histomoniasis), Anaerobic infections", dose:"25mg/kg, 5 दिवस", warning:"Broiler withdrawal period: 5 दिवस" },
    en: { use:"Blackhead disease (Histomoniasis), anaerobic infections", dose:"25mg/kg, 5 days", warning:"Broiler withdrawal: 5 days" },
    hi: { use:"Blackhead disease, Anaerobic संक्रमण", dose:"25mg/kg, 5 दिन", warning:"Withdrawal period: 5 दिन" }
  },
  electrolyte: {
    name: "Electrolyte / Electral",
    mr: { use:"उन्हाळ्यात ताण, आजारपणानंतर, Transport stress", dose:"1g/L पाण्यात, गरजेनुसार", warning:"ताजे बनवून द्या, शिळे पाणी देऊ नका" },
    en: { use:"Heat stress, post-illness recovery, transport stress", dose:"1g/L water, as needed", warning:"Prepare fresh, don't use stale water" },
    hi: { use:"गर्मी में तनाव, बीमारी के बाद", dose:"1g/L पानी, जरूरत अनुसार", warning:"ताजा बनाकर दें" }
  },
  vitaminad3e: {
    name: "Vitamin AD3E",
    mr: { use:"वाढीसाठी, अंडी उत्पादन वाढवण्यासाठी, रोग प्रतिकारक शक्ती", dose:"1ml/L पाण्यात, आठवड्यातून 2-3 दिवस", warning:"जास्त dose नको - Hypervitaminosis होतो" },
    en: { use:"Growth booster, egg production, immunity support", dose:"1ml/L water, 2-3 days/week", warning:"Don't overdose - causes hypervitaminosis" },
    hi: { use:"विकास, अंडा उत्पादन, रोग प्रतिरोधक क्षमता", dose:"1ml/L पानी, हफ्ते में 2-3 दिन", warning:"अधिक मात्रा न दें" }
  },
  sorbitol: {
    name: "Sorbitol (Liver Tonic)",
    mr: { use:"यकृत आरोग्य, Fatty liver syndrome रोखण्यासाठी", dose:"1ml/L पाण्यात, 5-7 दिवस", warning:"antibiotic course नंतर द्यावे" },
    en: { use:"Liver health, prevent fatty liver syndrome", dose:"1ml/L water, 5-7 days", warning:"Give after antibiotic course" },
    hi: { use:"लीवर स्वास्थ्य, Fatty liver syndrome", dose:"1ml/L पानी, 5-7 दिन", warning:"Antibiotic course के बाद दें" }
  },
  coccidiocide: {
    name: "Coccidiocide (Salinomycin/Lasalocid)",
    mr: { use:"Coccidiosis रोखण्यासाठी - Preventive", dose:"खाद्यात मिसळा - 60-70g/ton feed", warning:"Laying hens ना देऊ नका" },
    en: { use:"Coccidiosis prevention (in-feed)", dose:"60-70g/ton feed", warning:"Never give to laying hens" },
    hi: { use:"Coccidiosis रोकथाम (खाने में)", dose:"60-70g/ton feed", warning:"अंडे देने वाली मुर्गियों को न दें" }
  },
  colistin: {
    name: "Colistin",
    mr: { use:"E.coli, Gram-negative bacteria, Enteritis", dose:"75,000 IU/kg, 5 दिवस", warning:"शेवटचा उपाय म्हणून वापरा (Last resort)" },
    en: { use:"E.coli, gram-negative bacteria, enteritis", dose:"75,000 IU/kg, 5 days", warning:"Use as last resort only" },
    hi: { use:"E.coli, Gram-negative bacteria", dose:"75,000 IU/kg, 5 दिन", warning:"अंतिम उपाय के रूप में उपयोग करें" }
  },
  mareksvacc: {
    name: "Marek's Vaccine",
    mr: { use:"Marek's Disease पासून संरक्षण", dose:"Day 1 - Hatchery मध्येच देतात, एकच dose", warning:"थंड ठिकाणी साठवा (2-8°C)" },
    en: { use:"Protection against Marek's Disease", dose:"Day 1 at hatchery - single dose only", warning:"Store cold (2-8°C)" },
    hi: { use:"Marek's Disease से सुरक्षा", dose:"Day 1 hatchery में - एक ही dose", warning:"ठंडे में रखें (2-8°C)" }
  }
};

// Keys for medicine search
const MED_KEYS = {
  enrofloxacin: ["enrofloxacin","enro","एनरो","crd","respiratory","श्वसन"],
  amoxicillin:  ["amoxicillin","amox","अमोक्स","pneumonia","न्यूमोनिया","निमोनिया"],
  amprolium:    ["amprolium","कॉक्सी","cocci","coccidiosis","रक्त","bloody"],
  tylosin:      ["tylosin","टायलोसिन","mycoplasma","myco"],
  doxycycline:  ["doxycycline","doxy","डॉक्सी"],
  metronidazole:["metronidazole","metro","मेट्रो","blackhead","histomoniasis"],
  electrolyte:  ["electrolyte","electral","इलेक्ट्रोलाइट","electral","ताण","stress"],
  vitaminad3e:  ["vitamin","ad3e","vit","विटामिन","vitamins"],
  sorbitol:     ["sorbitol","liver","यकृत","लिवर","fatty"],
  coccidiocide: ["salinomycin","lasalocid","coccidiocide"],
  colistin:     ["colistin","कोलिस्टिन","ecoli","e.coli"],
  mareksvacc:   ["marek","मारेक","vaccine","lasi","लसी","vaccination"]
};

function findMedicine(query) {
  const lo = query.toLowerCase().trim();
  for (const [key, terms] of Object.entries(MED_KEYS)) {
    if (terms.some(t => lo.includes(t.toLowerCase()))) {
      return MEDICINE_DB[key];
    }
  }
  return null;
}

// ── Knowledge Base ────────────────────────────────────
const KB = [
  {
    keys:["broiler","ब्रॉयलर","meat","maans","broilar"],
    answer:{
      mr:"🐔 ब्रॉयलर कोंबडी पालन:\n• वजन: ४२-४५ दिवसांत २ ते २.५ किलो\n• तापमान: पहिला आठवडा ३५°C, दर आठवड्याला ३°C कमी\n• Starter feed: ०-२१ दिवस | Grower: २२-३५ | Finisher: ३५+\n• पाणी: दिवसाला ३०० मिली (उन्हाळ्यात दुप्पट)\n• FCR: १.६ ते १.८ (कमी FCR = जास्त नफा)\n• नफा: प्रति कोंबडी ₹३०-₅०, १००० कोंबड्यांत ₹३०-५०k/batch",
      en:"🐔 Broiler Farming:\n• Weight: 2-2.5kg in 42-45 days\n• Temp: 35°C week 1, reduce 3°C/week\n• Feed: Starter 0-21 days | Grower 22-35 | Finisher 35+\n• Water: 300ml/day (double in summer)\n• FCR: 1.6-1.8 (lower = more profit)\n• Profit: ₹30-50/bird, 1000 birds = ₹30-50k/batch",
      hi:"🐔 ब्रॉयलर मुर्गी पालन:\n• वजन: 42-45 दिनों में 2 से 2.5 किलो\n• तापमान: पहले हफ्ते 35°C, हर हफ्ते 3°C कम\n• FCR: 1.6-1.8\n• मुनाफा: ₹30-50 प्रति मुर्गी"
    }
  },
  {
    keys:["layer","लेयर","egg","अंडी","andi","anda","laying"],
    answer:{
      mr:"🥚 लेयर कोंबडी:\n• उत्पादन: वर्षाला २५०-३०० अंडी\n• पहिली अंडी: १८-२० आठवड्यांनी\n• प्रकाश: दिवसाला १४-१६ तास\n• कॅल्शियम: ३.५-४%\n• जाती: BV-300, Lohmann Brown, Hi-line\n• अंडी भाव: ₹5-8 प्रति अंडी (NECC दर)\n• Peak production: २५-३० आठवड्यांत ९०-९५%",
      en:"🥚 Layer Hen:\n• Production: 250-300 eggs/year\n• First egg: 18-20 weeks\n• Light: 14-16 hrs/day\n• Calcium: 3.5-4%\n• Breeds: BV-300, Lohmann Brown, Hi-line\n• Egg price: ₹5-8 per egg (NECC rate)\n• Peak: 90-95% at 25-30 weeks",
      hi:"🥚 लेयर मुर्गी:\n• उत्पादन: 250-300 अंडे/साल\n• पहला अंडा: 18-20 हफ्तों में\n• नस्लें: BV-300, Lohmann Brown\n• अंडे का भाव: ₹5-8 (NECC)"
    }
  },
  {
    keys:["feed","खाद्य","khadya","khaana","diet","nutrition","poshan"],
    answer:{
      mr:"🌾 खाद्य व्यवस्थापन:\n• Starter (0-21 दिवस): Protein 22-23%, Energy 2900 Kcal\n• Grower (22-35 दिवस): Protein 19-20%, Energy 3000 Kcal\n• Finisher (36+ दिवस): Protein 17-18%, Energy 3100 Kcal\n• Layer feed: Protein 16%, Calcium 3.5%, Phosphorus 0.4%\n• खाद्य दिवसातून 3-4 वेळा द्यावे",
      en:"🌾 Feed Management:\n• Starter (0-21 days): Protein 22-23%, Energy 2900 Kcal\n• Grower (22-35 days): Protein 19-20%, Energy 3000 Kcal\n• Finisher (36+ days): Protein 17-18%, Energy 3100 Kcal\n• Layer feed: Protein 16%, Calcium 3.5%\n• Feed 3-4 times daily",
      hi:"🌾 आहार प्रबंधन:\n• Starter (0-21 दिन): Protein 22-23%, 2900 Kcal\n• Grower (22-35 दिन): Protein 19-20%, 3000 Kcal\n• Finisher (36+ दिन): Protein 17-18%, 3100 Kcal\n• दिन में 3-4 बार आहार दें"
    }
  },
  {
    keys:["vaccination","vaccine","lasi","लसीकरण","tika","ranikhet","gumboro","marek","fowl"],
    answer:{
      mr:"💉 लसीकरण वेळापत्रक:\n• दिवस १: Marek's Disease (hatchery)\n• दिवस ७: Ranikhet F1 – डोळ्यात/नाकात\n• दिवस १४: Gumboro (IBD) – पाण्यात\n• दिवस २१: Ranikhet LaSota – पाण्यात\n• दिवस २८: Fowl Pox – पंखावर टोचणे\n• लेयर: Fowl Typhoid + EDS-76 + IB vaccine\n• लसीकरण सकाळी थंड वेळी करावे",
      en:"💉 Vaccination Schedule:\n• Day 1: Marek's Disease (at hatchery)\n• Day 7: Ranikhet F1 – eye/nose drop\n• Day 14: Gumboro (IBD) – drinking water\n• Day 21: Ranikhet LaSota – water\n• Day 28: Fowl Pox – wing web\n• Layer: Fowl Typhoid + EDS-76 + IB vaccine\n• Always vaccinate in cool morning hours",
      hi:"💉 टीकाकरण कार्यक्रम:\n• दिन 1: Marek's Disease\n• दिन 7: Ranikhet F1\n• दिन 14: Gumboro – पानी में\n• दिन 21: Ranikhet LaSota\n• दिन 28: Fowl Pox\n• सुबह ठंडे समय में टीका लगाएं"
    }
  },
  {
    keys:["medicine","औषध","dawai","aushadh","दवाई","treatment","antibiotic"],
    answer:{
      mr:"💊 प्रमुख औषधे:\n• Enrofloxacin – CRD, श्वसन रोग\n• Amoxicillin – Bacterial infection\n• Amprolium – Coccidiosis\n• Tylosin – Mycoplasmosis\n• Doxycycline – Respiratory + Intestinal\n• Electrolyte – ताण, उन्हाळा\n• Vitamin AD3E – वाढ, अंडी उत्पादन\n• Sorbitol – यकृत आरोग्य\n⚠️ कोणताही antibiotic vet च्या सल्ल्याने द्या\n💡 एखाद्या औषधाचे नाव टाका - सविस्तर माहिती मिळेल!",
      en:"💊 Key Medicines:\n• Enrofloxacin – CRD, respiratory\n• Amoxicillin – Bacterial infection\n• Amprolium – Coccidiosis\n• Tylosin – Mycoplasmosis\n• Doxycycline – Respiratory + intestinal\n• Electrolytes – Stress, summer\n• Vitamin AD3E – Growth, egg production\n• Sorbitol – Liver health\n⚠️ Always use antibiotics under vet guidance\n💡 Type a medicine name for detailed info!",
      hi:"💊 प्रमुख दवाइयाँ:\n• Enrofloxacin – CRD, श्वसन\n• Amoxicillin – Bacterial\n• Amprolium – Coccidiosis\n• Electrolytes – तनाव, गर्मी\n• Vitamin AD3E – विकास\n⚠️ Antibiotic हमेशा डॉक्टर की सलाह से\n💡 दवा का नाम टाइप करें - विस्तृत जानकारी मिलेगी!"
    }
  },
  {
    keys:["disease","रोग","rog","aajaar","sick","aajari","bimari","illness"],
    answer:{
      mr:"🏥 प्रमुख रोग व लक्षणे:\n• Ranikhet – मान वाकणे, हिरवी विष्ठा\n• Gumboro – पांढरी विष्ठा, अशक्तपणा\n• Marek's – पाय लुळे\n• Fowl Pox – तोंडावर फोड\n• CRD – श्वास घेताना आवाज\n• Coccidiosis – रक्त विष्ठा\n• Salmonella – जुलाब, अचानक मृत्यू\n⚠️ लक्षणे दिसताच पशुवैद्यकाशी संपर्क करा",
      en:"🏥 Major Diseases:\n• Ranikhet – twisted neck, green droppings\n• Gumboro – white droppings, weakness\n• Marek's – leg paralysis\n• Fowl Pox – face sores\n• CRD – rattling breath\n• Coccidiosis – bloody droppings\n• Salmonella – diarrhea, sudden deaths\n⚠️ Contact vet immediately",
      hi:"🏥 प्रमुख बीमारियाँ:\n• Ranikhet – गर्दन मुड़ना\n• Gumboro – सफेद बीट\n• Marek's – पैर लकवा\n• CRD – सांस में आवाज\n• Coccidiosis – खूनी बीट\n⚠️ लक्षण दिखते ही पशु चिकित्सक से संपर्क करें"
    }
  },
  {
    keys:["government","sarkar","scheme","yojana","subsidy","anudan","NABARD","loan"],
    answer:{
      mr:"🏛️ सरकारी योजना:\n• NABARD Poultry Venture Capital Fund: ₹25 लाखपर्यंत कर्ज\n• AHIDF – Animal Husbandry Infra Fund: ₹10 कोटी\n• महाराष्ट्र पशुधन विकास मंडळ – ५०% सबसिडी\n• PM-KISAN – ₹6000/वर्ष\n• SC/ST – ७५% सबसिडी\n• RKVY – यंत्रसामग्री अनुदान\n📞 जिल्हा पशुसंवर्धन विभागाशी संपर्क करा",
      en:"🏛️ Government Schemes:\n• NABARD Poultry Fund: up to ₹25 lakh\n• AHIDF: up to ₹10 Crore\n• Maharashtra Pashudhan: 50% subsidy\n• PM-KISAN: ₹6000/year\n• SC/ST: 75% subsidy\n• RKVY: machinery grants\n📞 Contact District Animal Husbandry Dept",
      hi:"🏛️ सरकारी योजनाएं:\n• NABARD: ₹25 लाख तक\n• AHIDF: ₹10 करोड़ तक\n• 50% सब्सिडी - शेड, Equipment\n• PM-KISAN: ₹6000/साल\n• SC/ST: 75% सब्सिडी\n📞 जिला पशुपालन विभाग से संपर्क करें"
    }
  },
  {
    keys:["shed","शेड","housing","farm","bandhkam","coop","construction"],
    answer:{
      mr:"🏗️ शेड बांधकाम:\n• दिशा: पूर्व-पश्चिम\n• ब्रॉयलर: ८-१० पक्षी/चौ.फूट\n• लेयर (Cage): ४५० cm² प्रति पक्षी\n• उंची: ८-१० फूट\n• Litter: Rice husk 3-4 इंच\n• Fogger system उन्हाळ्यासाठी आवश्यक\n• Biosecurity: Disinfectant foot dip",
      en:"🏗️ Shed Construction:\n• Direction: East-West\n• Broiler: 8-10 birds/sq.ft\n• Layer cage: 450cm² per bird\n• Height: 8-10 feet\n• Litter: Rice husk 3-4 inch\n• Fogger system for summer\n• Biosecurity: Disinfectant foot dip",
      hi:"🏗️ शेड निर्माण:\n• दिशा: पूर्व-पश्चिम\n• ब्रॉयलर: 8-10 पक्षी/वर्ग फुट\n• ऊंचाई: 8-10 फुट\n• बिछाव: Rice husk 3-4 इंच\n• Fogger system गर्मियों के लिए"
    }
  },
  {
    keys:["temperature","तापमान","tapman","heat","thandi","garam","brooder","heating"],
    answer:{
      mr:"🌡️ तापमान व्यवस्थापन:\n• आठवडा १: ३५°C | आठवडा २: ३२°C | आठवडा ३: २९°C\n• आठवडा ४: २६°C | आठवडा ५+: २४-२५°C\n• उन्हाळा: Fogger + Exhaust fan + Vitamin C\n• हिवाळा: Polythene curtain + Gas brooder\n• Humidity: ५५-७५%",
      en:"🌡️ Temperature Management:\n• Week 1: 35°C | Week 2: 32°C | Week 3: 29°C\n• Week 4: 26°C | Week 5+: 24-25°C\n• Summer: Fogger + exhaust fans, Vitamin C\n• Winter: Polythene curtains + Gas brooder\n• Humidity: 55-75%",
      hi:"🌡️ तापमान प्रबंधन:\n• हफ्ता 1: 35°C | हफ्ता 2: 32°C | हफ्ता 3: 29°C\n• गर्मी में: Fogger + पंखे\n• सर्दियों में: Polythene curtain + Brooder"
    }
  },
  {
    keys:["profit","नफा","nafa","income","kamai","business","kharcha","cost","earning"],
    answer:{
      mr:"💰 नफा-तोटा हिशोब:\n• ब्रॉयलर (१००० पक्षी, ४५ दिवस):\n  - DOC: ₹45,000 | खाद्य: ₹90,000 | औषधे: ₹8,000\n  - एकूण खर्च: ~₹1,55,000\n  - विक्री (2kg×₹120): ~₹2,20,000\n  - नफा: ~₹40,000-50,000/batch\n• वर्षात ५-६ batch = ₹2-3 लाख नफा",
      en:"💰 Profit Calculation:\n• Broiler (1000 birds, 45 days):\n  - DOC: ₹45,000 | Feed: ₹90,000 | Medicine: ₹8,000\n  - Total cost: ~₹1,55,000\n  - Sale (2kg×₹120): ~₹2,20,000\n  - Profit: ~₹40,000-50,000/batch\n• 5-6 batches/year = ₹2-3 lakh",
      hi:"💰 लाभ गणना:\n• ब्रॉयलर (1000 पक्षी):\n  - कुल खर्च: ~₹1,55,000\n  - बिक्री: ~₹2,20,000\n  - मुनाफा: ~₹40,000-50,000/batch"
    }
  },
  {
    keys:["market","बाजार","bajar","bhav","rate","vikri","sell","sale","price"],
    answer:{
      mr:"📊 बाजारभाव:\n• ब्रॉयलर: ₹90-₹145/kg (live weight)\n• अंडी: ₹5-₹8/piece (NECC)\n• गावरान: ₹300-₹500/kg\n• NECC website: necc.co.in\n📅 रेट दररोज बदलतो",
      en:"📊 Market Rates:\n• Broiler: ₹90-₹145/kg live weight\n• Eggs: ₹5-₹8/piece (NECC)\n• Country chicken: ₹300-₹500/kg\n• NECC website: necc.co.in\n📅 Rates change daily",
      hi:"📊 बाजार भाव:\n• ब्रॉयलर: ₹90-₹145/kg\n• अंडे: ₹5-₹8/piece\n• देशी: ₹300-₹500/kg\n• NECC: necc.co.in"
    }
  },
  {
    keys:["desi","देशी","gavran","गावरान","country chicken","kadaknath","giriraj","naati"],
    answer:{
      mr:"🐓 गावरान / देशी कोंबडी:\n• जाती: गिरीराज, कड़कनाथ, वनराज, Srinidhi\n• वाढ: ७०-९० दिवसांत १.५-२ किलो\n• मांस भाव: ₹300-₹500/kg\n• अंडी: साधारण १२०-१५० /वर्ष\n• NABARD गावरान पालनावर ५०% अनुदान",
      en:"🐓 Desi/Country Chicken:\n• Breeds: Giriraj, Kadaknath, Vanaraja, Srinidhi\n• Growth: 1.5-2kg in 70-90 days\n• Meat price: ₹300-₹500/kg\n• Eggs: ~120-150/year\n• NABARD gives 50% subsidy",
      hi:"🐓 देशी मुर्गी:\n• नस्लें: गिरीराज, कड़कनाथ, वनराजा\n• 70-90 दिनों में 1.5-2 किलो\n• मांस: ₹300-₹500/kg\n• NABARD: 50% सब्सिडी"
    }
  },
  {
    keys:["chick","पिल्ले","pille","DOC","day old","hatchery","hatching"],
    answer:{
      mr:"🐣 Day-old Chicks (DOC):\n• फक्त BIS certified Hatchery मधून विकत घ्या\n• आणताना थंड हवा लागू देऊ नका\n• ताबडतोब कोमट Glucose पाणी द्या\n• पहिले ४ तास फक्त पाणी\n• Brooder ४८ तास आधी गरम करा (३५°C)",
      en:"🐣 Day-old Chicks:\n• Buy from BIS certified hatcheries\n• Keep warm during transport\n• Give warm Glucose water on arrival\n• First 4 hours: water only\n• Pre-warm brooder 48 hrs (35°C)",
      hi:"🐣 Day-old Chicks:\n• BIS certified Hatchery से खरीदें\n• आते ही गुनगुना Glucose पानी दें\n• पहले 4 घंटे: सिर्फ पानी\n• 48 घंटे पहले Brooder गरम करें"
    }
  },
  {
    keys:["water","पाणी","pani","paani","pine","hydration"],
    answer:{
      mr:"💧 पाणी व्यवस्थापन:\n• नेहमी स्वच्छ व ताजे पाणी उपलब्ध असावे\n• ब्रॉयलर: ३०० मिली/दिन (उन्हाळ्यात ५०० मिली)\n• भांडे रोज साफ करा\n• उन्हाळ्यात: Electrolyte + Vitamin C",
      en:"💧 Water Management:\n• Always provide clean fresh water\n• Broiler: 300ml/day (500ml summer)\n• Clean drinkers daily\n• Summer: Electrolyte + Vitamin C",
      hi:"💧 पानी प्रबंधन:\n• हमेशा साफ ताजा पानी दें\n• ब्रॉयलर: 300 मिली/दिन\n• गर्मियों में Electrolyte + Vitamin C"
    }
  },
  {
    keys:["hello","hi","नमस्कार","namaste","namaskaar","hey","kasa ahe"],
    answer:{
      mr:"नमस्कार! 🐔 मी तुमचा Poultry AI आहे. कुक्कुटपालनाबद्दल विचारा — अंडी दर, औषधे, रोग, लसीकरण, सरकारी योजना, लेयर, ब्रॉयलर!",
      en:"Hello! 🐔 I'm your Poultry AI. Ask about egg rates, medicines, diseases, vaccination, govt schemes, layer, broiler!",
      hi:"नमस्ते! 🐔 मैं आपका Poultry AI हूँ। अंडे का भाव, दवाइयाँ, बीमारी, टीकाकरण, सरकारी योजना — कुछ भी पूछें!"
    }
  },
];

const LIVE_LABELS = {
  mr:"🥚 NECC अंडी दर (आज)",
  en:"🥚 NECC Egg Rate (Today)",
  hi:"🥚 NECC अंडे का भाव (आज)"
};

const FALLBACK = {
  mr:"मला तुमचा प्रश्न नीट समजला नाही. ब्रॉयलर, लेयर, अंडी, औषधे, रोग, लसीकरण, बाजारभाव किंवा सरकारी योजनेबद्दल विचारा.",
  en:"I didn't understand. Ask about broiler, layer, eggs, medicines, disease, vaccination, market rates, or govt schemes.",
  hi:"समझ नहीं आया। ब्रॉयलर, लेयर, अंडे, दवाइयाँ, बीमारी, टीकाकरण, बाजार भाव पूछें।"
};

const WELCOME = {
  mr:"नमस्कार! मी तुमचा Poultry AI आहे. 🐔 अंडी live दर, औषध माहिती, सरकारी योजना, लेयर-ब्रॉयलर — सर्व मराठी, English, हिंदीत!",
  en:"Hello! I'm your Poultry AI. 🐔 Ask about live egg rates, medicine info, govt schemes, layer/broiler — in Marathi, English or Hindi!",
  hi:"नमस्ते! मैं आपका Poultry AI हूँ। 🐔 अंडे का भाव, दवा जानकारी, सरकारी योजना — मराठी, English, हिंदी में!"
};

const STATUS = {
  mr:{ idle:"🎙️ Mic वर click करा आणि बोला", listening:"🎤 ऐकतोय… बोला!", speaking:"🔊 सांगतोय…" },
  en:{ idle:"🎙️ Click mic and speak", listening:"🎤 Listening… Speak!", speaking:"🔊 Speaking…" },
  hi:{ idle:"🎙️ Mic पर click करें और बोलें", listening:"🎤 सुन रहा हूँ… बोलें!", speaking:"🔊 बता रहा हूँ…" },
};

const TOPIC_LABELS = {
  mr:[
    {e:"🐔",l:"ब्रॉयलर",q:"broiler farming"},
    {e:"🥚",l:"लेयर / अंडी",q:"layer egg production"},
    {e:"🌾",l:"खाद्य",q:"feed khadya diet"},
    {e:"💉",l:"लसीकरण",q:"vaccination tika"},
    {e:"🏥",l:"रोग",q:"disease rog bimari"},
    {e:"💊",l:"औषधे",q:"medicine dawai aushadh"},
    {e:"🌡️",l:"तापमान",q:"temperature brooder"},
    {e:"💰",l:"नफा",q:"profit nafa income"},
    {e:"🏗️",l:"शेड",q:"shed housing farm"},
    {e:"📊",l:"बाजारभाव",q:"market bhav rate"},
    {e:"🏛️",l:"सरकारी योजना",q:"government scheme yojana NABARD"},
    {e:"🐓",l:"गावरान",q:"desi gavran country chicken"},
    {e:"🐣",l:"DOC पिल्ले",q:"chick DOC day old"},
    {e:"💧",l:"पाणी",q:"water pani"},
  ],
  en:[
    {e:"🐔",l:"Broiler",q:"broiler farming"},
    {e:"🥚",l:"Layer/Eggs",q:"layer egg production"},
    {e:"🌾",l:"Feed",q:"feed diet nutrition"},
    {e:"💉",l:"Vaccination",q:"vaccination schedule"},
    {e:"🏥",l:"Diseases",q:"disease illness sick"},
    {e:"💊",l:"Medicines",q:"medicine treatment antibiotic"},
    {e:"🌡️",l:"Temperature",q:"temperature brooder heat"},
    {e:"💰",l:"Profit",q:"profit income business"},
    {e:"🏗️",l:"Shed",q:"shed housing construction"},
    {e:"📊",l:"Market Rates",q:"market rate price sell"},
    {e:"🏛️",l:"Govt Schemes",q:"government scheme subsidy NABARD"},
    {e:"🐓",l:"Desi Chicken",q:"desi country chicken kadaknath"},
    {e:"🐣",l:"DOC Chicks",q:"chick day old hatchery"},
    {e:"💧",l:"Water",q:"water hydration"},
  ],
  hi:[
    {e:"🐔",l:"ब्रॉयलर",q:"broiler farming"},
    {e:"🥚",l:"लेयर/अंडे",q:"layer egg production anda"},
    {e:"🌾",l:"आहार",q:"feed khaana diet"},
    {e:"💉",l:"टीकाकरण",q:"vaccination tika"},
    {e:"🏥",l:"बीमारियाँ",q:"disease bimari sick"},
    {e:"💊",l:"दवाइयाँ",q:"medicine dawai antibiotic"},
    {e:"🌡️",l:"तापमान",q:"temperature brooder heat"},
    {e:"💰",l:"मुनाफा",q:"profit income business"},
    {e:"🏗️",l:"शेड",q:"shed housing farm"},
    {e:"📊",l:"बाजार भाव",q:"market rate bhav"},
    {e:"🏛️",l:"सरकारी योजना",q:"government scheme yojana NABARD"},
    {e:"🐓",l:"देशी मुर्गी",q:"desi country chicken gavran"},
    {e:"🐣",l:"DOC चूजे",q:"chick day old hatchery"},
    {e:"💧",l:"पानी",q:"water paani"},
  ],
};

const EGG_CITIES = {
  mr:["मुंबई","पुणे","नागपूर"],
  en:["Mumbai","Pune","Nagpur"],
  hi:["मुंबई","पुणे","नागपुर"]
};
