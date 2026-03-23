import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SCHEMES = {
  mr:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाखपर्यंत कर्ज | 25-33% सबसिडी", desc:"नवीन शेड, Equipment, Layer-Broiler Farm साठी. General: 25%, SC/ST: 33% अनुदान. अर्ज प्रक्रिया: जिल्हा पशुसंवर्धन विभाग / NABARD शाखा.", who:"👤 सर्व शेतकरी" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 ₹10 कोटीपर्यंत कर्ज | 3% व्याज सबसिडी", desc:"मोठे Poultry Farm, Processing Plant, Cold Storage, Hatchery साठी. केंद्र सरकारची प्रमुख योजना 2025-26.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 महाराष्ट्र पशुधन विकास मंडळ", sub:"💰 50% सबसिडी — शेड + Equipment + DOC", desc:"Layer-Broiler Farm बांधणे, पिंजरे, Feeder, Drinker, Brooder वर 50% अनुदान. ऑनलाइन अर्ज: mahapariksha.gov.in", who:"👤 महाराष्ट्र शेतकरी" },
    { name:"🎯 PM-KISAN Samman Nidhi", sub:"💰 ₹6,000 प्रति वर्ष — थेट बँक खात्यात", desc:"प्रत्येक शेतकऱ्याला वार्षिक ₹6,000 (3 हप्त्यांमध्ये ₹2,000). आधार कार्ड व बँक खाते आवश्यक.", who:"👤 सर्व छोटे शेतकरी" }
  ],
  en:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 Loan up to ₹25 Lakh | 25-33% Subsidy", desc:"For new shed, equipment, Layer-Broiler farm setup. General: 25%, SC/ST: 33% subsidy. Apply: District Animal Husbandry / NABARD branch.", who:"👤 All Farmers" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 Loan up to ₹10 Crore | 3% Interest Subsidy", desc:"For large Poultry Farm, Processing Plant, Cold Storage, Hatchery. Central Govt flagship scheme 2025-26.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% Subsidy — Shed + Equipment + DOC", desc:"Maharashtra Govt scheme. 50% grant on Layer-Broiler Farm, cages, Feeder, Drinker, Brooder. Apply online: mahapariksha.gov.in", who:"👤 Maharashtra Farmers" },
    { name:"🎯 PM-KISAN Samman Nidhi", sub:"💰 ₹6,000 per year — Direct Bank Transfer", desc:"Every farmer gets ₹6,000/year (₹2,000 in 3 installments). Aadhaar card & bank account required.", who:"👤 All Small Farmers" }
  ],
  hi:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाख तक ऋण | 25-33% सब्सिडी", desc:"नया शेड, Equipment, Layer-Broiler Farm के लिए. General: 25%, SC/ST: 33% अनुदान. आवेदन: जिला पशुपालन विभाग.", who:"👤 सभी किसान" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 ₹10 करोड़ तक ऋण | 3% ब्याज सब्सिडी", desc:"बड़े Poultry Farm, Processing Plant, Cold Storage, Hatchery के लिए. केंद्र सरकार की प्रमुख योजना 2025-26.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% सब्सिडी — शेड + Equipment + DOC", desc:"महाराष्ट्र सरकार की योजना. Layer-Broiler Farm, पिंजरे, Feeder, Drinker पर 50% अनुदान.", who:"👤 महाराष्ट्र के किसान" },
    { name:"🎯 PM-KISAN Samman Nidhi", sub:"💰 ₹6,000 प्रति वर्ष — सीधे बैंक खाते में", desc:"हर किसान को ₹6,000/साल (3 किस्तों में ₹2,000). आधार कार्ड और बैंक अकाउंट जरूरी.", who:"👤 सभी छोटे किसान" }
  ]
};

const SCHEME_TITLE = {
  mr: '🏛️ पोल्ट्री सरकारी योजना (चालू वर्ष 2025-26)',
  en: '🏛️ Poultry Govt Schemes (Current Year 2025-26)',
  hi: '🏛️ पोल्ट्री सरकारी योजनाएं (वर्तमान वर्ष 2025-26)'
};

const noteMap = {
  mr:'📞 अधिक माहितीसाठी: जिल्हा पशुसंवर्धन कार्यालय',
  en:'📞 For more info: District Animal Husbandry Office',
  hi:'📞 अधिक जानकारी: जिला पशुपालन कार्यालय'
};

const callLabel = {
  mr: '📞 हेल्पलाइनवर कॉल करा: 1800-180-1551',
  en: '📞 Call Helpline: 1800-180-1551',
  hi: '📞 हेल्पलाइन पर कॉल करें: 1800-180-1551'
};

const tollNote = {
  mr: '(Toll Free | केंद्र शासन पोल्ट्री मदत केंद्र)',
  en: '(Toll Free | Central Govt Poultry Helpline)',
  hi: '(टोल फ्री | केंद्र सरकार पोल्ट्री सहायता केंद्र)'
};

const SchemeList = () => {
  const { lang } = useLanguage();
  const schemes = SCHEMES[lang] || SCHEMES.mr;

  return (
    <div className="glass-card">
      <div className="glass-title">
        {SCHEME_TITLE[lang] || SCHEME_TITLE.mr}
      </div>
      
      <div className="scheme-scroll">
        {schemes.map((s, i) => (
          <div key={i} className="scheme-card">
            <div className="sc-name">{s.name}</div>
            <div className="sc-subsidy">{s.sub}</div>
            <div className="sc-desc">{s.desc}</div>
            <div className="sc-tag">{s.who}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop: '24px', textAlign: 'center', background: 'rgba(123,43,249,0.04)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(123,43,249,0.1)'}}>
        <p style={{marginBottom:'8px', fontSize:'0.78rem', color:'var(--muted)'}}>{noteMap[lang] || noteMap.mr}</p>
        <a href="tel:18001801551" className="call-btn">{callLabel[lang] || callLabel.mr}</a>
        <p style={{fontSize:'0.6rem', marginTop:'8px', opacity:0.5}}>{tollNote[lang] || tollNote.mr}</p>
      </div>
    </div>
  );
};

export default SchemeList;
