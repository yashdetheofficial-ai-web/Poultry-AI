import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KB, FALLBACK, WELCOME, STATUS, TOPIC_LABELS, MEDICINE_DB, MED_KEYS } from '../data/data';

const findMedicine = (query) => {
  const lo = query.toLowerCase().trim();
  for (const [key, terms] of Object.entries(MED_KEYS)) {
    if (terms.some(t => lo.includes(t.toLowerCase()))) {
      return MEDICINE_DB[key];
    }
  }
  return null;
};

const ChatBox = () => {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [uiState, setUiState] = useState("idle"); // idle, listening, speaking
  const chatRef = useRef(null);

  // Initialize Speech Recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if(recognition){
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN";
    recognition.maxAlternatives = 3;
  }

  useEffect(() => {
    // Add welcome message on load or lang change
    setMessages([{ role: 'ai', text: WELCOME[lang] || WELCOME.mr }]);
  }, [lang]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const addMsg = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const speak = (text, spokenLang) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = spokenLang === "mr" ? "mr-IN" : spokenLang === "hi" ? "hi-IN" : "en-IN";
    u.volume = 1;
    u.rate = 0.87;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang === u.lang || v.lang.startsWith(spokenLang));
    if (match) u.voice = match;
    u.onstart = () => setUiState("speaking");
    u.onend = () => setUiState("idle");
    u.onerror = () => setUiState("idle");
    window.speechSynthesis.speak(u);
  };

  const processQuery = (transcript) => {
    addMsg("user", transcript);
    const detectLang = (text) => {
      if (/[\u0900-\u097F]/.test(text)) return "mr";
      if (/\b(kya|hai|hain|mujhe|nahi|murgi|anda|dawai|bimari|tika|paani|achha|theek)\b/i.test(text)) return "hi";
      return "en";
    };
    const speechLang = detectLang(transcript);
    const ansLang = (lang !== "mr") ? lang : speechLang;
    
    const lo = transcript.toLowerCase().trim();
    const med = findMedicine(lo);
    
    let reply;
    if (med) {
      const info = med[ansLang] || med.en;
      reply = `💊 **${med.name}**\n\n🎯 उपयोग / Use:\n${info.use}\n\n💉 Dose:\n${info.dose}\n\n⚠️ ${info.warning}`;
      setTimeout(() => {
        addMsg("ai", reply);
        speak(`${med.name}. ${info.use}. Dose: ${info.dose}`, ansLang);
      }, 350);
      return;
    }

    let best = null, bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const k of item.keys) { 
        if(lo.includes(k.toLowerCase())) score++; 
      }
      if(score > bestScore){ bestScore = score; best = item; }
    }

    if (!best) {
      reply = FALLBACK[ansLang] || FALLBACK.en;
    } else {
      reply = best.answer[ansLang] || best.answer.en;
    }

    setTimeout(() => {
      addMsg("ai", reply);
      const speakText = reply.replace(/<[^>]+>/g,"").replace(/\*/g,"");
      speak(speakText, ansLang);
    }, 350);
  };

  const handleMicClick = () => {
    if(!recognition){ alert("Speech Recognition not supported in this browser."); return; }
    if(uiState === "listening"){ recognition.stop(); return; }
    if(uiState === "speaking") { window.speechSynthesis.cancel(); setUiState("idle"); return; }
    setUiState("listening");
    
    recognition.onresult = e => {
      let transcript="", maxConf=-1;
      for(let i=0; i<e.results[0].length; i++){
        if(e.results[0][i].confidence > maxConf){ 
          maxConf = e.results[0][i].confidence; 
          transcript = e.results[0][i].transcript; 
        }
      }
      setUiState("idle");
      if(transcript.trim()) processQuery(transcript.trim());
    };
    recognition.onerror = e => setUiState("idle");
    recognition.onend = () => { if(uiState === "listening") setUiState("idle"); };
    recognition.start();
  };

  const s = STATUS[lang] || STATUS.mr;
  const topics = TOPIC_LABELS[lang] || TOPIC_LABELS.mr;

  return (
    <>
      <div className="mic-sec">
        <button 
          className={`mic-btn ${uiState}`} 
          onClick={handleMicClick}
        >
          {uiState === "idle" ? "🎙️" : uiState === "listening" ? "🔴" : "🔊"}
        </button>
        <span className="mic-status">{uiState === "idle" ? s.idle : uiState === "listening" ? s.listening : s.speaking}</span>
      </div>

      <div className="chat-container" ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="av">{m.role === 'user' ? '🧑‍🌾' : '🤖'}</div>
            <div className="bbl" dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>") }} />
          </div>
        ))}
      </div>

      <div className="glass-card" style={{marginTop:'4px'}}>
        <div className="glass-title">🔥 {lang === 'mr' ? 'विषय — विचारण्यासाठी क्लिक करा' : lang === 'hi' ? 'विषय — पूछने के लिए क्लिक करें' : 'Topics — Click to ask'}</div>
        <div className="topics">
          {topics.map((t, i) => (
            <button key={i} className="tbtn" onClick={() => processQuery(t.q)}>
              <span>{t.e} {t.l}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
