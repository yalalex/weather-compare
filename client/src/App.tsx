import React from 'react';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import Search from './components/Search';
import Data from './components/Data';

import WState from './context/WState';

const App = () => {
  return (
    <div className='App'>
      <WState>
        <Navbar />
        <div className='container'>
          <Search />
          <Data />
        </div>
      </WState>
    </div>
  );
};

export default App;
