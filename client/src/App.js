import React, { useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import WorldMap from './components/WorldMap';
// import Current from './components/Current';
// import Daily from './components/Daily';
import useSwitchUnits from './hooks/useSwitchUnits';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });

  const [units, switchUnits] = useSwitchUnits('metric');
  const { switchTemp, convertTemp } = switchUnits;

  return (
    <div className='App'>
      <Header units={units} switchTemp={switchTemp} />
      <WorldMap />
      {/* <Current units={units} convertTemp={convertTemp} />
      <Daily units={units} convertTemp={convertTemp} /> */}
    </div>
  );
};

export default App;
