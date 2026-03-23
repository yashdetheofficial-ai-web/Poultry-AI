// ── State ──────────────────────────────────────────────
let LANG = "mr";
let uiState = "idle";

// ── DOM refs ───────────────────────────────────────────
const micBtn     = document.getElementById("micBtn");
const statusLbl  = document.getElementById("statusLbl");
const swEl       = document.getElementById("sw");
const chatBox    = document.getElementById("chatBox");
const topicBtns  = document.getElementById("topicBtns");
const welcomeMsg = document.getElementById("welcomeMsg");
const medInput   = document.getElementById("medInput");
const medSearch  = document.getElementById("medSearch");

// ── Live Clock ─────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const t = now.toLocaleTimeString("en-IN", {hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const d = now.toLocaleDateString("en-IN", {weekday:"short",day:"numeric",month:"short",year:"numeric"});
  document.getElementById("liveTime").textContent = t;
  document.getElementById("dateSub").textContent  = d;
}
updateClock();
setInterval(updateClock, 1000);

// ── Weather fetch ──────────────────────────────────────
async function fetchWeather() {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current=temperature_2m,relative_humidity_2m,weathercode&timezone=Asia/Kolkata";
    const res  = await fetch(url, {signal: AbortSignal.timeout(4000)});
    const data = await res.json();
    const temp = data.current.temperature_2m;
    const hum  = data.current.relative_humidity_2m;
    document.getElementById("liveTemp").textContent = temp + "°C";
    document.getElementById("liveHum").textContent  = hum  + "%";
    showWeatherTip(temp, hum);
  } catch(e) {
    document.getElementById("liveTemp").textContent = "N/A";
    document.getElementById("liveHum").textContent  = "N/A";
  }
}

// ── Weather Tip ────────────────────────────────────────
const WX_TIPS = {
  mr: (t, h) => {
    if (t > 35) return `⚠️ आज खूप उष्णता (${t}°C)! Fogger चालू ठेवा, पाण्यात Electrolyte + Vitamin C मिसळा.`;
    if (t < 15) return `🥶 आज थंडी (${t}°C)! Polythene curtain लावा, Brooder चालू ठेवा.`;
    if (h > 80) return `💧 आर्द्रता जास्त (${h}%)! Litter ओला होणार नाही याची काळजी घ्या.`;
    return `✅ आज हवामान चांगले (${t}°C, ${h}%). कोंबड्यांसाठी योग्य दिवस!`;
  },
  en: (t, h) => {
    if (t > 35) return `⚠️ High heat (${t}°C)! Run foggers, add Electrolyte + Vitamin C to water.`;
    if (t < 15) return `🥶 Cold today (${t}°C)! Put polythene curtains, keep brooder on.`;
    if (h > 80) return `💧 High humidity (${h}%)! Ensure litter doesn't get wet.`;
    return `✅ Good weather (${t}°C, ${h}%). Ideal day for your birds!`;
  },
  hi: (t, h) => {
    if (t > 35) return `⚠️ बहुत गर्मी (${t}°C)! Fogger चलाएं, Electrolyte + Vitamin C मिलाएं.`;
    if (t < 15) return `🥶 ठंड (${t}°C)! Polythene curtain लगाएं, Brooder चालू रखें.`;
    if (h > 80) return `💧 Humidity ज्यादा (${h}%)! बिछाव गीला न हो ध्यान रखें.`;
    return `✅ मौसम अच्छा (${t}°C, ${h}%). मुर्गियों के लिए अच्छा दिन!`;
  },
};
function showWeatherTip(temp, hum) {
  const el = document.getElementById("weatherTip");
  el.textContent = WX_TIPS[LANG](temp, hum);
  el.classList.add("show");
}

// ── Egg Rates ──────────────────────────────────────────
async function fetchEggRates() {
  try {
    const targetUrl = "https://www.commodityonline.com/egg-rate/maharashtra";
    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(targetUrl);
    const res  = await fetch(proxyUrl, {signal: AbortSignal.timeout(8000)});
    const data = await res.json();
    const html = data.contents || "";
    
    // Improved Regex to find Marathi/English city names and rates
    const findRate = (city) => {
      const re = new RegExp(`<td>${city}<\\/td>\\s*<td>[\\d.]+<\\/td>\\s*<td>(\\d+)<\\/td>`, "i");
      const m = html.match(re);
      return m ? m[1] : null;
    };

    const mumbai = findRate("Mumbai \\(CC\\)");
    const pune   = findRate("Pune");
    const nagpur = findRate("Nagpur");

    if (mumbai && pune && nagpur) {
      updateEggUI(mumbai, pune, nagpur, null, true);
      return;
    }
  } catch(e) { console.error("Egg Fetch Error:", e); }
  useEstimatedRates();
}

function updateEggUI(mumbai, pune, nagpur, dummy, isLive) {
  const el1 = document.getElementById("ep1"); if(el1) el1.textContent = "₹"+mumbai;
  const el2 = document.getElementById("ep2"); if(el2) el2.textContent = "₹"+pune;
  const el3 = document.getElementById("ep3"); if(el3) el3.textContent = "₹"+nagpur;
  
  const src = isLive ? "🟢 LIVE - CommodityOnline" : "📊 Estimated";
  const tit = document.getElementById("eggTitle");
  if(tit) tit.textContent = (LIVE_LABELS[LANG]||LIVE_LABELS.mr) + " — " + src;
}

function useEstimatedRates() {
  const seed = new Date().getDate();
  const base = 460 + (seed % 10) * 5;
  updateEggUI(
    (base + 10),
    (base + 5),
    (base - 10),
    null,
    false
  );
}

// ── Broiler Rate ───────────────────────────────────────
function fetchBroilerRate() {
  const seed = new Date().getDate() + new Date().getMonth();
  const base = 100 + (seed % 30) * 1.5;
  document.getElementById("liveBroiler").textContent = "₹" + base.toFixed(0) + "-" + (base+15).toFixed(0) + "/kg";
}

// ── Last Updated ───────────────────────────────────────
function setLastUpdated() {
  const now = new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
  const lblMap = { mr:"⏱ शेवटी updated: ", en:"⏱ Last updated: ", hi:"⏱ अंतिम अपडेट: " };
  document.getElementById("lastUpdated").textContent = (lblMap[LANG]||lblMap.mr) + now;
}

// ── Government Schemes Labels (3 languages) ────────────
const SCHEMES = {
  mr:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाखपर्यंत कर्ज | 25-33% सबसिडी", desc:"नवीन शेड, Equipment, Layer-Broiler Farm साठी. General: 25%, SC/ST: 33% अनुदान.", who:"👤 सर्व शेतकरी" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 ₹10 कोटीपर्यंत कर्ज | 3% व्याज सबसिडी", desc:"मोठे Poultry Farm, Processing Plant, Cold Storage, Hatchery साठी. केंद्र सरकारची प्रमुख योजना.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 महाराष्ट्र पशुधन विकास मंडळ", sub:"💰 50% सबसिडी — शेड + Equipment + DOC", desc:"Layer-Broiler Farm बांधणे, पिंजरे, Feeder, Drinker, Brooder वर 50% अनुदान.", who:"👤 महाराष्ट्र शेतकरी" },
    { name:"🥚 NPCBB — National Poultry Development Board", sub:"💰 Training + Technology Support Free", desc:"Backyard Poultry, Desi breeds (Giriraj, Kadaknath) पालनासाठी प्रशिक्षण व अनुदान.", who:"👤 Small/BPL Farmers" },
    { name:"🌾 RKVY — Rashtriya Krishi Vikas Yojana", sub:"💰 यंत्रसामग्री + Infrastructure अनुदान", desc:"Poultry machinery, feed mill, hatchery modernization साठी grant. Project-based funding.", who:"👤 शेतकरी / FPO" },
    { name:"🤝 SC/ST Special Poultry Scheme", sub:"💰 75% पर्यंत सबसिडी SC/ST साठी", desc:"अनुसूचित जाती-जमातींसाठी Farm setup, DOC, Feed वर 75% अनुदान.", who:"👤 SC / ST शेतकरी" },
    { name:"💳 KCC — Kisan Credit Card (Poultry)", sub:"💰 ₹1.60 लाखपर्यंत कमी व्याजात कर्ज", desc:"Feed, Medicine, DOC खरेदीसाठी फक्त 4% व्याजदराने कर्ज.", who:"👤 सर्व शेतकरी" },
    { name:"🌱 PM-KISAN — PM Kisan Samman Nidhi", sub:"💰 ₹6,000/वर्ष थेट खात्यात (3 हप्त्यात)", desc:"Poultry + शेती दोन्ही करणाऱ्या नोंदणीकृत शेतकऱ्यांसाठी वार्षिक मदत.", who:"👤 सर्व नोंदणीकृत शेतकरी" },
  ],
  en:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 Loan up to ₹25 Lakh | 25-33% Subsidy", desc:"For new shed, equipment, Layer-Broiler farm setup. General: 25%, SC/ST: 33% subsidy.", who:"👤 All Farmers" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 Loan up to ₹10 Crore | 3% Interest Subsidy", desc:"For large Poultry Farm, Processing Plant, Cold Storage, Hatchery. Central Govt flagship scheme.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% Subsidy — Shed + Equipment + DOC", desc:"Maharashtra Govt scheme. 50% grant on Layer-Broiler Farm, cages, Feeder, Drinker, Brooder.", who:"👤 Maharashtra Farmers" },
    { name:"🥚 NPCBB — National Poultry Development Board", sub:"💰 Training + Technology Support Free", desc:"Backyard Poultry, Desi breeds (Giriraj, Kadaknath) farming — training and grants.", who:"👤 Small/BPL Farmers" },
    { name:"🌾 RKVY — Rashtriya Krishi Vikas Yojana", sub:"💰 Machinery + Infrastructure Grants", desc:"Grants for poultry machinery, feed mill, hatchery modernization. Project-based funding.", who:"👤 Farmers / FPO" },
    { name:"🤝 SC/ST Special Poultry Scheme", sub:"💰 Up to 75% Subsidy for SC/ST", desc:"Special scheme for SC/ST — 75% subsidy on Farm setup, DOC, Feed.", who:"👤 SC / ST Farmers" },
    { name:"💳 KCC — Kisan Credit Card (Poultry)", sub:"💰 Loan up to ₹1.60 Lakh at Low Interest", desc:"For Feed, Medicine, DOC purchase at only 4% interest rate.", who:"👤 All Farmers" },
    { name:"🌱 PM-KISAN — PM Kisan Samman Nidhi", sub:"💰 ₹6,000/year Directly in Account (3 installments)", desc:"Annual support for registered farmers doing both Poultry + farming.", who:"👤 All Registered Farmers" },
  ],
  hi:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाख तक ऋण | 25-33% सब्सिडी", desc:"नया शेड, Equipment, Layer-Broiler Farm के लिए. General: 25%, SC/ST: 33% अनुदान.", who:"👤 सभी किसान" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 ₹10 करोड़ तक ऋण | 3% ब्याज सब्सिडी", desc:"बड़े Poultry Farm, Processing Plant, Cold Storage, Hatchery के लिए. केंद्र सरकार की मुख्य योजना.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% सब्सिडी — शेड + Equipment + DOC", desc:"महाराष्ट्र सरकार की योजना. Layer-Broiler Farm, पिंजरे, Feeder, Drinker पर 50% अनुदान.", who:"👤 महाराष्ट्र के किसान" },
    { name:"🥚 NPCBB — National Poultry Development Board", sub:"💰 Training + Technology Support मुफ्त", desc:"Backyard Poultry, देसी नस्लें (Giriraj, Kadaknath) — प्रशिक्षण और अनुदान.", who:"👤 Small/BPL Farmers" },
    { name:"🌾 RKVY — Rashtriya Krishi Vikas Yojana", sub:"💰 मशीनरी + Infrastructure अनुदान", desc:"Poultry मशीनरी, feed mill, hatchery के लिए grant. Project आधारित funding.", who:"👤 किसान / FPO" },
    { name:"🤝 SC/ST Special Poultry Scheme", sub:"💰 SC/ST के लिए 75% तक सब्सिडी", desc:"अनुसूचित जाति-जनजाति के लिए Farm setup, DOC, Feed पर 75% अनुदान.", who:"👤 SC / ST किसान" },
    { name:"💳 KCC — Kisan Credit Card (Poultry)", sub:"💰 ₹1.60 लाख तक कम ब्याज पर ऋण", desc:"Feed, Medicine, DOC खरीद के लिए सिर्फ 4% ब्याज दर पर कर्ज.", who:"👤 सभी किसान" },
    { name:"🌱 PM-KISAN — PM Kisan Samman Nidhi", sub:"💰 ₹6,000/साल सीधे खाते में (3 किस्तों में)", desc:"Poultry + खेती दोनों करने वाले पंजीकृत किसानों के लिए वार्षिक सहायता.", who:"👤 सभी पंजीकृत किसान" },
  ]
};

function updateSchemeLabels() {
  const schemes = SCHEMES[LANG] || SCHEMES.mr;
  schemes.forEach((s, i) => {
    const n = i + 1;
    const nameEl = document.getElementById("sc"+n+"-name");
    const subEl  = document.getElementById("sc"+n+"-sub");
    const descEl = document.getElementById("sc"+n+"-desc");
    const whoEl  = document.getElementById("sc"+n+"-who");
    if(nameEl) nameEl.textContent = s.name;
    if(subEl)  subEl.textContent  = s.sub;
    if(descEl) descEl.textContent = s.desc;
    if(whoEl)  whoEl.textContent  = s.who;
  });
  const titles = {
    mr:"🏛️ पोल्ट्री सरकारी योजना (Current 2025-26)",
    en:"🏛️ Poultry Government Schemes (Current 2025-26)",
    hi:"🏛️ पोल्ट्री सरकारी योजनाएं (Current 2025-26)"
  };
  const btnHTML = '<a href="tel:18001801551" class="call-btn">📞 Call Helpline: 1800-180-1551</a>';
  const tfHTML = '<p style="font-size:0.55rem; margin-top:5px; opacity:0.6;">(Toll Free | केंद्र शासन पोल्ट्री मदत केंद्र)</p>';
  const noteMap = {
    mr:`<p style="margin-bottom:5px;">📞 अधिक माहितीसाठी: जिल्हा पशुसंवर्धन कार्यालय</p>${btnHTML}${tfHTML}`,
    en:`<p style="margin-bottom:5px;">📞 For more info: District Animal Husbandry Office</p>${btnHTML}${tfHTML}`,
    hi:`<p style="margin-bottom:5px;">📞 अधिक जानकारी: जिला पशुपालन कार्यालय</p>${btnHTML}${tfHTML}`
  };
  const tEl = document.getElementById("yojanaMainTitle");
  if(tEl) tEl.textContent = titles[LANG]||titles.mr;
  const nEl = document.getElementById("schemeNote");
  if(nEl) nEl.innerHTML = noteMap[LANG]||noteMap.mr;
}

// ── Load All Live Data ─────────────────────────────────
async function loadLiveData() {
  const refBtn = document.getElementById("refBtn");
  if(refBtn){ refBtn.textContent="⏳ Loading..."; refBtn.disabled=true; }
  
  // Show fast/static data and estimated egg rates instantly
  fetchBroilerRate();
  useEstimatedRates();
  updateDashLabels();
  updateSchemeLabels();
  setLastUpdated();

  // Fetch heavy network (Weather & NECC Live Egg Rates) concurrently with timeout
  await Promise.allSettled([
    fetchWeather(),
    fetchEggRates()
  ]);

  setLastUpdated();
  if(refBtn){ refBtn.textContent="🔄 Refresh"; refBtn.disabled=false; }
}

// ── Dashboard Labels ───────────────────────────────────
const DASH_LABELS = {
  mr:{ temp:"🌡️ तापमान", hum:"💧 आर्द्रता", broiler:"🐔 ब्रॉयलर दर", time:"🕐 वेळ", tempS:"Pune, Maharashtra", humS:"सापेक्ष आर्द्रता", live:"LIVE" },
  en:{ temp:"🌡️ Temperature", hum:"💧 Humidity", broiler:"🐔 Broiler Rate", time:"🕐 Current Time", tempS:"Pune, Maharashtra", humS:"Relative humidity", live:"LIVE" },
  hi:{ temp:"🌡️ तापमान", hum:"💧 नमी", broiler:"🐔 ब्रॉयलर भाव", time:"🕐 वर्तमान समय", tempS:"पुणे, महाराष्ट्र", humS:"सापेक्ष नमी", live:"LIVE" },
};

function updateDashLabels() {
  const lb = DASH_LABELS[LANG]||DASH_LABELS.mr;
  const tL = document.getElementById("tempLabel");    if(tL) tL.textContent = lb.temp;
  const hL = document.getElementById("humLabel");     if(hL) hL.textContent = lb.hum;
  const bL = document.getElementById("broilerLabel"); if(bL) bL.textContent = lb.broiler;
  const tiL = document.getElementById("timeLabel");   if(tiL) tiL.textContent = lb.time;
  const tS = document.getElementById("tempSub");      if(tS) tS.textContent = lb.tempS;
  const hS = document.getElementById("humSub");       if(hS) hS.textContent = lb.humS;
  const lT = document.getElementById("liveTxt");      if(lT) lT.textContent = lb.live;
  const eT = document.getElementById("eggTitle");     if(eT) eT.textContent = LIVE_LABELS[LANG]||LIVE_LABELS.mr;
  setLastUpdated();
  const ec = EGG_CITIES[LANG]||EGG_CITIES.mr;
  const c1 = document.getElementById("c1"); if(c1) c1.textContent = ec[0];
  const c2 = document.getElementById("c2"); if(c2) c2.textContent = ec[1];
  const c3 = document.getElementById("c3"); if(c3) c3.textContent = ec[2];
  const c4 = document.getElementById("c4"); if(c4) c4.textContent = ec[3];
}

// ── Language Selector ──────────────────────────────────
function setLang(lang) {
  LANG = lang;
  ["Mr","En","Hi"].forEach(l => {
    document.getElementById("lb"+l)?.classList.toggle("active", l.toLowerCase()===lang);
  });
  welcomeMsg.textContent = WELCOME[lang]||WELCOME.mr;
  // Update medicine section placeholder
  updateMedPlaceholder();
  setUI(uiState);
  buildTopics();
  updateDashLabels();
  updateSchemeLabels();
  const t = parseFloat(document.getElementById("liveTemp").textContent)||25;
  const h = parseFloat(document.getElementById("liveHum").textContent)||60;
  showWeatherTip(t, h);
  const titles = { mr:"🔥 Quick Topics — click किंवा mic वर बोला", en:"🔥 Quick Topics — click or speak", hi:"🔥 Quick Topics — click करें" };
  document.getElementById("topicTitle").textContent = titles[lang]||titles.mr;
  // Update med section title
  const medTitles = { mr:"💊 औषध शोधा (Medicine Search)", en:"💊 Medicine Search", hi:"💊 दवा खोजें" };
  const medEl = document.getElementById("medSectionTitle");
  if(medEl) medEl.textContent = medTitles[lang]||medTitles.mr;
  const btnTxt = { mr:"🔍 शोधा", en:"🔍 Search", hi:"🔍 खोजें" };
  if(medSearch) medSearch.textContent = btnTxt[lang]||btnTxt.mr;
}

function updateMedPlaceholder() {
  if(!medInput) return;
  const ph = {
    mr:"औषधाचे नाव टाका (उदा. Enrofloxacin, Amprolium...)",
    en:"Type medicine name (e.g. Enrofloxacin, Amprolium...)",
    hi:"दवा का नाम टाइप करें (जैसे Enrofloxacin, Amprolium...)"
  };
  medInput.placeholder = ph[LANG]||ph.mr;
}

// ── Medicine Search ────────────────────────────────────
function doMedicineSearch() {
  const query = medInput ? medInput.value.trim() : "";
  if(!query) return;
  const med = findMedicine(query);
  if(med) {
    const info = med[LANG] || med.en;
    const reply = `💊 <b>${med.name}</b>\n\n🎯 उपयोग / Use:\n${info.use}\n\n💉 Dose / मात्रा:\n${info.dose}\n\n⚠️ ${info.warning}`;
    addMsg("user", query);
    setTimeout(() => { addMsg("ai", reply); speak(`${med.name}. ${info.use}. Dose: ${info.dose}`, LANG); }, 300);
  } else {
    const notFound = {
      mr:`⚠️ "${query}" हे औषध सापडले नाही. Enrofloxacin, Amoxicillin, Amprolium, Tylosin, Doxycycline, Electrolyte, Vitamin AD3E, Sorbitol असे नाव टाका.`,
      en:`⚠️ Medicine "${query}" not found. Try: Enrofloxacin, Amoxicillin, Amprolium, Tylosin, Doxycycline, Electrolyte, Vitamin AD3E, Sorbitol.`,
      hi:`⚠️ दवा "${query}" नहीं मिली। Enrofloxacin, Amoxicillin, Amprolium, Tylosin, Doxycycline, Electrolyte, Vitamin AD3E टाइप करें।`
    };
    addMsg("user", query);
    addMsg("ai", notFound[LANG]||notFound.en);
  }
  if(medInput) medInput.value = "";
}

// Enter key for medicine search
if(medInput) {
  medInput.addEventListener("keydown", e => { if(e.key==="Enter") doMedicineSearch(); });
}
if(medSearch) {
  medSearch.addEventListener("click", doMedicineSearch);
}

// ── Build Topics ───────────────────────────────────────
function buildTopics() {
  topicBtns.innerHTML = "";
  (TOPIC_LABELS[LANG]||TOPIC_LABELS.mr).forEach(t => {
    const b = document.createElement("button");
    b.className = "tbtn";
    b.textContent = t.e+" "+t.l;
    b.onclick = () => processQuery(t.q);
    topicBtns.appendChild(b);
  });
}
buildTopics();

// ── Find Answer ────────────────────────────────────────
function findAnswer(text) {
  const lo = text.toLowerCase().trim();
  // First check medicine DB
  const med = findMedicine(lo);
  if(med) {
    const info = med[LANG]||med.en;
    return { isMed:true, med, info };
  }
  let best=null, bestScore=0;
  for (const item of KB) {
    let score=0;
    for (const k of item.keys) { if(lo.includes(k.toLowerCase())) score++; }
    if(score>bestScore){ bestScore=score; best=item; }
  }
  return bestScore>0 ? { isMed:false, item:best } : null;
}

// ── Detect Lang ────────────────────────────────────────
function detectLang(text) {
  if (/[\u0900-\u097F]/.test(text)) return "mr";
  if (/\b(kya|hai|hain|mujhe|nahi|murgi|anda|dawai|bimari|tika|paani|achha|theek)\b/i.test(text)) return "hi";
  return "en";
}

// ── Add Message ────────────────────────────────────────
function addMsg(role, text) {
  const d = document.createElement("div");
  d.className = "msg "+(role==="user"?"user":"ai");
  const html = text.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
  d.innerHTML = `<div class="av">${role==="user"?"🧑‍🌾":"🤖"}</div>
    <div class="bbl"><div class="lbl">${role==="user"?"You / तुम्ही":"AI Assistant"}</div>${html}</div>`;
  chatBox.appendChild(d);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ── Process Query ──────────────────────────────────────
function processQuery(transcript) {
  addMsg("user", transcript);
  const speechLang = detectLang(transcript);
  const ansLang    = (LANG!=="mr") ? LANG : speechLang;
  const result     = findAnswer(transcript);

  let reply;
  if(!result) {
    reply = FALLBACK[ansLang]||FALLBACK.en;
  } else if(result.isMed) {
    const info = result.med[ansLang]||result.med.en;
    reply = `💊 **${result.med.name}**\n\n🎯 उपयोग / Use:\n${info.use}\n\n💉 Dose:\n${info.dose}\n\n⚠️ ${info.warning}`;
  } else {
    reply = result.item.answer[ansLang]||result.item.answer.en;
  }

  setTimeout(() => {
    addMsg("ai", reply);
    const speakText = reply.replace(/<[^>]+>/g,"");
    speak(speakText, ansLang);
  }, 350);
}

// ── TTS ────────────────────────────────────────────────
function speak(text, lang) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang   = lang==="mr"?"mr-IN":lang==="hi"?"hi-IN":"en-IN";
  u.volume = 1;
  u.rate   = 0.87;
  u.pitch  = 1;
  const voices = window.speechSynthesis.getVoices();
  const match  = voices.find(v => v.lang===u.lang || v.lang.startsWith(lang==="mr"?"mr":lang==="hi"?"hi":"en"));
  if(match) u.voice = match;
  u.onstart=()=>setUI("speaking");
  u.onend=()=>setUI("idle");
  u.onerror=()=>setUI("idle");
  window.speechSynthesis.speak(u);
}
if(window.speechSynthesis){
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
}

// ── UI state ───────────────────────────────────────────
function setUI(state) {
  uiState = state;
  micBtn.className    = state==="idle"?"":state;
  swEl.className      = "sw "+(state!=="idle"?state:"");
  statusLbl.className = state!=="idle"?state:"";
  const s = STATUS[LANG]||STATUS.mr;
  if(state==="idle")        { micBtn.textContent="🎙️"; statusLbl.textContent=s.idle; }
  else if(state==="listening"){ micBtn.textContent="🔴"; statusLbl.textContent=s.listening; }
  else if(state==="speaking") { micBtn.textContent="🔊"; statusLbl.textContent=s.speaking; }
}

// ── Speech Recognition ─────────────────────────────────
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if(SpeechRecognition){
  recognition = new SpeechRecognition();
  recognition.continuous=false;
  recognition.interimResults=false;
  recognition.lang="hi-IN";
  recognition.maxAlternatives=3;
}

micBtn.addEventListener("click", () => {
  if(!recognition){ alert("Speech Recognition support नाही.\nकृपया Google Chrome वापरा."); return; }
  if(uiState==="listening"){ recognition.stop(); return; }
  if(uiState==="speaking") { window.speechSynthesis.cancel(); setUI("idle"); return; }
  setUI("listening");
  recognition.start();
});

if(recognition){
  recognition.onresult = e => {
    let transcript="", maxConf=-1;
    for(let i=0;i<e.results[0].length;i++){
      if(e.results[0][i].confidence>maxConf){ maxConf=e.results[0][i].confidence; transcript=e.results[0][i].transcript; }
    }
    setUI("idle");
    if(transcript.trim()) processQuery(transcript.trim());
  };
  recognition.onerror = e => {
    setUI("idle");
    const ERRS = {
      "not-allowed":{ mr:"⚠️ Microphone blocked. Browser Settings मध्ये Mic Allow करा.", en:"⚠️ Mic blocked. Allow microphone in browser settings.", hi:"⚠️ Mic blocked. Browser Settings में Mic Allow करें।" },
      "no-speech":  { mr:"⚠️ आवाज ऐकू आला नाही. पुन्हा try करा.", en:"⚠️ No speech detected. Try again.", hi:"⚠️ कोई आवाज़ नहीं। फिर कोशिश करें।" },
    };
    const m=ERRS[e.error]; if(m) addMsg("ai",m[LANG]||m.en);
  };
  recognition.onend = () => { if(uiState==="listening") setUI("idle"); };
}

// ── Init ───────────────────────────────────────────────
updateMedPlaceholder();
loadLiveData();
setInterval(loadLiveData, 30 * 60 * 1000);
