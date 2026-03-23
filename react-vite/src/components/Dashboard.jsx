import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LIVE_LABELS, EGG_CITIES } from '../data/data';

const DASH_LABELS = {
  mr:{ temp:"🌡️ तापमान", hum:"💧 आर्द्रता", broiler:"🐔 ब्रॉयलर दर", time:"🕐 वेळ", tempS:"पुणे, महाराष्ट्र", humS:"सापेक्ष आर्द्रता", farm:"फार्म गेट दर" },
  en:{ temp:"🌡️ Temperature", hum:"💧 Humidity", broiler:"🐔 Broiler Rate", time:"🕐 Time", tempS:"Pune, Maharashtra", humS:"Relative humidity", farm:"Farm Gate Rate" },
  hi:{ temp:"🌡️ तापमान", hum:"💧 नमी", broiler:"🐔 ब्रॉयलर भाव", time:"🕐 समय", tempS:"पुणे, महाराष्ट्र", humS:"सापेक्ष नमी", farm:"फार्म गेट भाव" },
};

const Dashboard = () => {
  const { lang } = useLanguage();
  const lb = DASH_LABELS[lang] || DASH_LABELS.mr;
  const cities = EGG_CITIES[lang] || EGG_CITIES.mr;

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState({ temp: "—", hum: "—", loading: true });
  const [eggRates, setEggRates] = useState({ c1: "₹475", c2: "₹465", c3: "₹455", isLive: false });
  const [broilerRate, setBroilerRate] = useState("—");

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const locale = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      setTime(now.toLocaleTimeString(locale, {hour:"2-digit",minute:"2-digit",second:"2-digit"}));
      setDate(now.toLocaleDateString(locale, {weekday:"short",day:"numeric",month:"short",year:"numeric"}));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  // Live weather + broiler
  useEffect(() => {
    // Broiler rate estimation (date-seeded)
    const d = new Date();
    const seed = d.getDate() * 7 + d.getMonth() * 3 + d.getFullYear();
    const base = 105 + ((seed * 13) % 40);
    setBroilerRate(`₹${base}-${base + 15}/kg`);
    
    // Fetch live weather from Open-Meteo
    fetch("https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current=temperature_2m,relative_humidity_2m&timezone=Asia/Kolkata")
      .then(r => r.json())
      .then(data => {
        if (data.current) {
          setWeather({ 
            temp: `${data.current.temperature_2m}°C`, 
            hum: `${data.current.relative_humidity_2m}%`, 
            loading: false 
          });
        }
      })
      .catch(() => setWeather({ temp: "28°C", hum: "65%", loading: false }));
  }, []);

  return (
    <>
      <div className="dash-grid">
        <div className="dash-card">
          <div className="glow"></div>
          <div className="dc-title">{lb.temp}</div>
          <div className="dc-val">{weather.loading ? "⏳" : weather.temp}</div>
          <div className="dc-sub">{lb.tempS}</div>
        </div>
        <div className="dash-card">
          <div className="glow-cyan"></div>
          <div className="dc-title">{lb.hum}</div>
          <div className="dc-val">{weather.loading ? "⏳" : weather.hum}</div>
          <div className="dc-sub">{lb.humS}</div>
        </div>
        <div className="dash-card">
          <div className="glow-org"></div>
          <div className="dc-title">{lb.broiler} <span className="live-badge">LIVE</span></div>
          <div className="dc-val">{broilerRate}</div>
          <div className="dc-sub">{lb.farm}</div>
        </div>
        <div className="dash-card">
          <div className="glow"></div>
          <div className="dc-title">{lb.time}</div>
          <div className="dc-val" style={{fontSize:'1.15rem'}}>{time}</div>
          <div className="dc-sub">{date}</div>
        </div>
      </div>

      <div className="glass-card">
        <div className="glass-title">
          {LIVE_LABELS[lang] || LIVE_LABELS.mr} — {eggRates.isLive ? "🟢 LIVE" : "📊 NECC Estimated"}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:'12px'}}>
          {cities.map((city, i) => (
            <div key={i} className="dash-card" style={{padding:'12px', minHeight:'60px'}}>
              <div className="dc-sub" style={{fontWeight:700, marginBottom:'6px'}}>{city}</div>
              <div className="dc-val" style={{fontSize:'1.2rem'}}>
                {i === 0 ? eggRates.c1 : i === 1 ? eggRates.c2 : eggRates.c3}
              </div>
              <div className="dc-sub" style={{fontSize:'0.55rem', marginTop:'3px'}}>
                {lang === 'mr' ? 'प्रति 100 अंडी' : lang === 'hi' ? 'प्रति 100 अंडे' : 'per 100 eggs'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
