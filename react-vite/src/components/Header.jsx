import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { lang, setLang } = useLanguage();

  return (
    <header>
      <div className="logo-area">
        <div className="logo">🐔</div>
        <div>
          <div className="title">Poultry AI</div>
          <div className="tagline">BY Dethe Patil Poultry Intelligence in Farming</div>
        </div>
      </div>
      <div className="lang-sel">
        <button 
          className={`lang-btn ${lang === 'mr' ? 'active' : ''}`}
          onClick={() => setLang('mr')}
        >Mr</button>
        <button 
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >En</button>
        <button 
          className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
          onClick={() => setLang('hi')}
        >Hi</button>
      </div>
    </header>
  );
};

export default Header;
