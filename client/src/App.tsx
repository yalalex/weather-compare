import React from 'react';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import WorldMap from './components/WorldMap';
import Search from './components/Search';
import Current from './components/tables/Current';
import Daily from './components/tables/Daily';

import WState from './context/WState';

const App = () => {
  return (
    <div className='App'>
      <WState>
        <Navbar />
        <div className='container'>
          <Search />
          <Current />
          <Daily />
          <WorldMap />
        </div>
      </WState>
    </div>
  );
};

export default App;
