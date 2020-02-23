import React, { useEffect } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import WorldMap from './components/WorldMap';
import Search from './components/Search';
// import Current from './components/Current';
// import Daily from './components/Daily';
import useSwitchUnits from './hooks/useSwitchUnits';

const App = () => {
  const [units, switchUnits] = useSwitchUnits('metric');
  const { switchTemp, convertTemp } = switchUnits;

  return (
    <div className='App'>
      <Navbar units={units} switchTemp={switchTemp} />
      <Search />
      <div className='container'>
        <WorldMap />
        {/* <Current units={units} convertTemp={convertTemp} />
      <Daily units={units} convertTemp={convertTemp} /> */}
      </div>
    </div>
  );
};

export default App;
