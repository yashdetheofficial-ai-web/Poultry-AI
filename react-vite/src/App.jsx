import React, { useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatBox from './components/ChatBox';
import SchemeList from './components/SchemeList';
import { useLanguage } from './context/LanguageContext';

const App = () => {
  const { lang } = useLanguage();

  return (
    <>
      <div className="bg"></div>
      <div className="wrap">
        <Header />
        
        <ChatBox />
        
        <Dashboard />
        
        <SchemeList />
        
        <div style={{textAlign:'center', marginTop:'24px', opacity:0.6, fontSize:'0.7rem', paddingBottom:'20px'}}>
          Poultry AI &copy; 2025 Dethe Patil Farming
        </div>
      </div>
    </>
  );
};

export default App;
