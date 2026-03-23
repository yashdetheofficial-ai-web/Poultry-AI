import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SCHEMES = {
  mr:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाखपर्यंत कर्ज | 25-33% सबसिडी", desc:"नवीन शेड, Equipment, Layer-Broiler Farm साठी. General: 25%, SC/ST: 33% अनुदान.", who:"👤 सर्व शेतकरी", link:"https://www.nabard.org/content.aspx?id=591", linkText:"NABARD अधिकृत साईट" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure Dev Fund", sub:"💰 ₹10 कोटीपर्यंत कर्ज | 3% व्याज सबसिडी", desc:"मोठे Poultry Farm, Processing Plant, Cold Storage, Hatchery साठी. केंद्र सरकारची प्रमुख योजना 2025-26.", who:"👤 FPO / SHG / Entrepreneur", link:"https://ahidf.udyamimitra.in/", linkText:"AHIDF पोर्टल" },
    { name:"🐔 महाराष्ट्र पशुधन विकास मंडळ", sub:"💰 50% सबसिडी — शेड + Equipment + DOC", desc:"Layer-Broiler Farm बांधणे, पिंजरे, Feeder, Drinker, Brooder वर 50% अनुदान. ऑनलाइन अर्ज करा.", who:"👤 महाराष्ट्र शेतकरी", link:"https://ahd.maharashtra.gov.in/", linkText:"पशुसंवर्धन विभाग" },
    { name:"🎯 PM-KISAN Samman Nidhi", sub:"💰 ₹6,000 प्रति वर्ष — थेट बँक खात्यात", desc:"प्रत्येक शेतकऱ्याला वार्षिक ₹6,000 (3 हप्त्यांमध्ये ₹2,000). आधार कार्ड व बँक खाते आवश्यक.", who:"👤 सर्व छोटे शेतकरी", link:"https://pmkisan.gov.in/", linkText:"PM-KISAN पोर्टल" },
    { name:"🐣 National Livestock Mission (NLM)", sub:"💰 ₹50 लाखपर्यंत | 50% सबसिडी (SC/ST: 60%)", desc:"गावरान / देशी कोंबडी पालन, Rural Backyard Poultry, Kadaknath, Giriraj जाती वाटप. ग्रामीण शेतकऱ्यांसाठी.", who:"👤 ग्रामीण शेतकरी", link:"https://nlm.udyamimitra.in/", linkText:"NLM पोर्टल" },
    { name:"📋 RKVY — Rashtriya Krishi Vikas Yojana", sub:"💰 यंत्रसामग्री अनुदान + तांत्रिक सहाय्य", desc:"Poultry Farm साठी यंत्रसामग्री, Egg Grading Machine, Cold Storage, Transport Vehicle अनुदान.", who:"👤 सर्व शेतकरी / FPO", link:"https://rkvy.nic.in/", linkText:"RKVY पोर्टल" }
  ],
  en:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 Loan up to ₹25 Lakh | 25-33% Subsidy", desc:"For new shed, equipment, Layer-Broiler farm setup. General: 25%, SC/ST: 33% subsidy.", who:"👤 All Farmers", link:"https://www.nabard.org/content.aspx?id=591", linkText:"NABARD Official" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure Dev Fund", sub:"💰 Loan up to ₹10 Crore | 3% Interest Subsidy", desc:"For large Poultry Farm, Processing Plant, Cold Storage, Hatchery. Central Govt flagship scheme 2025-26.", who:"👤 FPO / SHG / Entrepreneur", link:"https://ahidf.udyamimitra.in/", linkText:"AHIDF Portal" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% Subsidy — Shed + Equipment + DOC", desc:"Maharashtra Govt scheme. 50% grant on Layer-Broiler Farm, cages, Feeder, Drinker, Brooder. Apply online.", who:"👤 Maharashtra Farmers", link:"https://ahd.maharashtra.gov.in/", linkText:"AHD Maharashtra" },
    { name:"🎯 PM-KISAN Samman Nidhi", sub:"💰 ₹6,000 per year — Direct Bank Transfer", desc:"Every farmer gets ₹6,000/year (₹2,000 in 3 installments). Aadhaar card & bank account required.", who:"👤 All Small Farmers", link:"https://pmkisan.gov.in/", linkText:"PM-KISAN Portal" },
    { name:"🐣 National Livestock Mission (NLM)", sub:"💰 Up to ₹50 Lakh | 50% Subsidy (SC/ST: 60%)", desc:"Rural Backyard Poultry, Desi breeds (Kadaknath, Giriraj) distribution. For rural farmers.", who:"👤 Rural Farmers", link:"https://nlm.udyamimitra.in/", linkText:"NLM Portal" },
    { name:"📋 RKVY — Rashtriya Krishi Vikas Yojana", sub:"💰 Machinery Grants + Technical Assistance", desc:"Grants for Poultry machinery, Egg Grading Machine, Cold Storage, Transport Vehicle.", who:"👤 All Farmers / FPO", link:"https://rkvy.nic.in/", linkText:"RKVY Portal" }
  ],
  hi:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाख तक ऋण | 25-33% सब्सिडी", desc:"नया शेड, Equipment, Layer-Broiler Farm के लिए. General: 25%, SC/ST: 33% अनुदान.", who:"👤 सभी किसान", link:"https://www.nabard.org/content.aspx?id=591", linkText:"NABARD आधिकारिक" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure Dev Fund", sub:"💰 ₹10 करोड़ तक ऋण | 3% ब्याज सब्सिडी", desc:"बड़े Poultry Farm, Processing Plant, Cold Storage, Hatchery के लिए. केंद्र सरकार की प्रमुख योजना 2025-26.", who:"👤 FPO / SHG / Entrepreneur", link:"https://ahidf.udyamimitra.in/", linkText:"AHIDF पोर्टल" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% सब्सिडी — शेड + Equipment + DOC", desc:"महाराष्ट्र सरकार की योजना. Layer-Broiler Farm, पिंजरे, Feeder, Drinker पर 50% अनुदान.", who:"👤 महाराष्ट्र के किसान", link:"https://ahd.maharashtra.gov.in/", linkText:"पशुपालन विभाग" },
    { name:"🎯 PM-KISAN Samman Nidhi", sub:"💰 ₹6,000 प्रति वर्ष — सीधे बैंक खाते में", desc:"हर किसान को ₹6,000/साल (3 किस्तों में ₹2,000). आधार कार्ड और बैंक अकाउंट जरूरी.", who:"👤 सभी छोटे किसान", link:"https://pmkisan.gov.in/", linkText:"PM-KISAN पोर्टल" },
    { name:"🐣 National Livestock Mission (NLM)", sub:"💰 ₹50 लाख तक | 50% सब्सिडी (SC/ST: 60%)", desc:"ग्रामीण Backyard Poultry, देशी नस्लें (कड़कनाथ, गिरिराज) वितरण. ग्रामीण किसानों के लिए.", who:"👤 ग्रामीण किसान", link:"https://nlm.udyamimitra.in/", linkText:"NLM पोर्टल" },
    { name:"📋 RKVY — Rashtriya Krishi Vikas Yojana", sub:"💰 मशीनरी अनुदान + तकनीकी सहायता", desc:"Poultry मशीनरी, Egg Grading Machine, Cold Storage, Transport Vehicle के लिए अनुदान.", who:"👤 सभी किसान / FPO", link:"https://rkvy.nic.in/", linkText:"RKVY पोर्टल" }
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
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px'}}>
              <div className="sc-tag">{s.who}</div>
              <a 
                href={s.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  fontSize:'0.7rem', fontWeight:800, color:'var(--purple-light, #a855f7)', 
                  textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'4px',
                  padding:'4px 12px', borderRadius:'12px', border:'1px solid rgba(123,43,249,0.2)',
                  background:'rgba(123,43,249,0.06)', transition:'0.3s'
                }}
                onMouseEnter={e => { e.target.style.background='rgba(123,43,249,0.15)'; e.target.style.borderColor='rgba(123,43,249,0.4)'; }}
                onMouseLeave={e => { e.target.style.background='rgba(123,43,249,0.06)'; e.target.style.borderColor='rgba(123,43,249,0.2)'; }}
              >
                🔗 {s.linkText}
              </a>
            </div>
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
