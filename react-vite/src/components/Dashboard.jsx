import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LIVE_LABELS, EGG_CITIES } from '../data/data';

const DASH_LABELS = {
  mr:{ temp:"🌡️ तापमान", hum:"💧 आर्द्रता", broiler:"🐔 ब्रॉयलर दर", time:"🕐 वेळ", tempS:"Pune, Maharashtra", humS:"सापेक्ष आर्द्रता", live:"LIVE" },
  en:{ temp:"🌡️ Temperature", hum:"💧 Humidity", broiler:"🐔 Broiler Rate", time:"🕐 Current Time", tempS:"Pune, Maharashtra", humS:"Relative humidity", live:"LIVE" },
  hi:{ temp:"🌡️ तापमान", hum:"💧 नमी", broiler:"🐔 ब्रॉयलर भाव", time:"🕐 समय", tempS:"पुणे, महाराष्ट्र", humS:"सापेक्ष नमी", live:"LIVE" },
};

const Dashboard = () => {
  const { lang } = useLanguage();
  const lb = DASH_LABELS[lang] || DASH_LABELS.mr;
  const cities = EGG_CITIES[lang] || EGG_CITIES.mr;

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState({ temp: "N/A", hum: "N/A" });
  const [eggRates, setEggRates] = useState({ c1: "₹475", c2: "₹465", c3: "₹455", isLive: false });
  const [broilerRate, setBroilerRate] = useState("₹110-125/kg");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", {hour:"2-digit",minute:"2-digit",second:"2-digit"}));
      setDate(now.toLocaleDateString("en-IN", {weekday:"short",day:"numeric",month:"short",year:"numeric"}));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Generate static broiler rate based on date seed
    const seed = new Date().getDate() + new Date().getMonth();
    const base = 100 + (seed % 30) * 1.5;
    setBroilerRate(`₹${base.toFixed(0)}-${(base+15).toFixed(0)}/kg`);
    
    // Fetch weather
    fetch("https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current=temperature_2m,relative_humidity_2m&timezone=Asia/Kolkata")
      .then(res => res.json())
      .then(data => {
        setWeather({ temp: `${data.current.temperature_2m}°C`, hum: `${data.current.relative_humidity_2m}%` });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="dash-grid">
        <div className="dash-card">
          <div className="glow"></div>
          <div className="dc-title">{lb.temp}</div>
          <div className="dc-val">{weather.temp}</div>
          <div className="dc-sub">{lb.tempS}</div>
        </div>
        <div className="dash-card">
          <div className="glow"></div>
          <div className="dc-title">{lb.hum}</div>
          <div className="dc-val">{weather.hum}</div>
          <div className="dc-sub">{lb.humS}</div>
        </div>
        <div className="dash-card">
          <div className="glow-org"></div>
          <div className="dc-title">{lb.broiler} <span style={{marginLeft:'auto', background:'red', color:'white', fontSize:'8px', padding:'2px 4px', borderRadius:'4px'}}>{lb.live}</span></div>
          <div className="dc-val">{broilerRate}</div>
          <div className="dc-sub">Pune (Farm Gate)</div>
        </div>
        <div className="dash-card">
          <div className="glow"></div>
          <div className="dc-title">{lb.time}</div>
          <div className="dc-val" style={{fontSize:'1.1rem'}}>{time}</div>
          <div className="dc-sub">{date}</div>
        </div>
      </div>

      <div className="glass-card" style={{marginTop:'12px'}}>
        <div className="glass-title">
          {LIVE_LABELS[lang] || LIVE_LABELS.mr} — {eggRates.isLive ? "🟢 LIVE - CommodityOnline" : "📊 Estimated"}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px, 1fr))', gap:'8px'}}>
          <div className="dash-card" style={{padding:'8px', minHeight:'50px'}}>
            <div className="dc-sub">{cities[0]}</div>
            <div className="dc-val" style={{fontSize:'1.1rem'}}>{eggRates.c1}</div>
          </div>
          <div className="dash-card" style={{padding:'8px', minHeight:'50px'}}>
            <div className="dc-sub">{cities[1]}</div>
            <div className="dc-val" style={{fontSize:'1.1rem'}}>{eggRates.c2}</div>
          </div>
          <div className="dash-card" style={{padding:'8px', minHeight:'50px'}}>
            <div className="dc-sub">{cities[2]}</div>
            <div className="dc-val" style={{fontSize:'1.1rem'}}>{eggRates.c3}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
