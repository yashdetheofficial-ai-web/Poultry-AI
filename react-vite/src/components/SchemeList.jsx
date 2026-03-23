import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SCHEMES = {
  mr:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाखपर्यंत कर्ज | 25-33% सबसिडी", desc:"नवीन शेड, Equipment, Layer-Broiler Farm साठी. General: 25%, SC/ST: 33% अनुदान.", who:"👤 सर्व शेतकरी" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 ₹10 कोटीपर्यंत कर्ज | 3% व्याज सबसिडी", desc:"मोठे Poultry Farm, Processing Plant, Cold Storage, Hatchery साठी. केंद्र सरकारची प्रमुख योजना.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 महाराष्ट्र पशुधन विकास मंडळ", sub:"💰 50% सबसिडी — शेड + Equipment + DOC", desc:"Layer-Broiler Farm बांधणे, पिंजरे, Feeder, Drinker, Brooder वर 50% अनुदान.", who:"👤 महाराष्ट्र शेतकरी" }
  ],
  en:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 Loan up to ₹25 Lakh | 25-33% Subsidy", desc:"For new shed, equipment, Layer-Broiler farm setup. General: 25%, SC/ST: 33% subsidy.", who:"👤 All Farmers" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 Loan up to ₹10 Crore | 3% Interest Subsidy", desc:"For large Poultry Farm, Processing Plant, Cold Storage, Hatchery.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% Subsidy — Shed + Equipment + DOC", desc:"Maharashtra Govt scheme. 50% grant on Layer-Broiler Farm, cages, Feeder, Drinker, Brooder.", who:"👤 Maharashtra Farmers" }
  ],
  hi:[
    { name:"🏦 NABARD — Poultry Venture Capital Fund", sub:"💰 ₹25 लाख तक ऋण | 25-33% सब्सिडी", desc:"नया शेड, Equipment, Layer-Broiler Farm के लिए. General: 25%, SC/ST: 33% अनुदान.", who:"👤 सभी किसान" },
    { name:"🏗️ AHIDF — Animal Husbandry Infrastructure", sub:"💰 ₹10 करोड़ तक ऋण | 3% ब्याज सब्सिडी", desc:"बड़े Poultry Farm, Processing Plant, Cold Storage, Hatchery के लिए.", who:"👤 FPO / SHG / Entrepreneur" },
    { name:"🐔 Maharashtra Pashudhan Vikas Mandal", sub:"💰 50% सब्सिडी — शेड + Equipment + DOC", desc:"महाराष्ट्र सरकार की योजना. Layer-Broiler Farm, पिंजरे, Feeder, Drinker पर 50% अनुदान.", who:"👤 महाराष्ट्र के किसान" }
  ]
};

const noteMap = {
  mr:`📞 अधिक माहितीसाठी: जिल्हा पशुसंवर्धन कार्यालय`,
  en:`📞 For more info: District Animal Husbandry Office`,
  hi:`📞 अधिक जानकारी: जिला पशुपालन कार्यालय`
};

const SchemeList = () => {
  const { lang } = useLanguage();
  const schemes = SCHEMES[lang] || SCHEMES.mr;

  return (
    <div className="glass-card" style={{marginTop:'12px'}}>
      <div className="glass-title">
        🏛️ {lang === 'mr' ? 'पोल्ट्री सरकारी योजना' : lang === 'hi' ? 'पोल्ट्री सरकारी योजनाएं' : 'Poultry Govt Schemes'} (Current 2025-26)
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

      <div style={{marginTop: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px'}}>
        <p style={{marginBottom:'5px', fontSize:'0.75rem', color:'var(--muted)'}}>{noteMap[lang] || noteMap.mr}</p>
        <a href="tel:18001801551" className="call-btn">📞 Call Helpline: 1800-180-1551</a>
        <p style={{fontSize:'0.55rem', marginTop:'5px', opacity:0.6}}>(Toll Free | केंद्र शासन पोल्ट्री मदत केंद्र)</p>
      </div>
    </div>
  );
};

export default SchemeList;
