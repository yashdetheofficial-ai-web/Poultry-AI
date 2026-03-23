import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatBox from './components/ChatBox';
import SchemeList from './components/SchemeList';
import Cursor from './components/Cursor';
import { useLanguage } from './context/LanguageContext';

const App = () => {
  const { lang } = useLanguage();

  return (
    <>
      <Cursor />
      <div className="bg"></div>
      <div className="dot-grid"></div>
      <div className="wrap">
        <Header />
        <ChatBox />
        <Dashboard />
        <SchemeList />
        <div className="footer">
          <span>🐔 Poultry AI &copy; 2025 </span>
          <a href="https://yashdetheofficial-ai-web.github.io/Poultry-AI/" target="_blank" rel="noopener">Dethe Patil Farming</a>
          <span> — {lang === 'mr' ? 'कुक्कुटपालन AI' : lang === 'hi' ? 'मुर्गी पालन AI' : 'Poultry Intelligence'}</span>
        </div>
      </div>
    </>
  );
};

export default App;
