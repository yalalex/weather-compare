import React from 'react';
import './App.css';

import Header from './components/Header';
import Map from './components/Map';
import Current from './components/Current';
import Daily from './components/Daily';
import useSwitchUnits from './hooks/useSwitchUnits';

const App = () => {
  const [units, switchUnits] = useSwitchUnits('metric');
  const { switchTemp, convertTemp } = switchUnits;
  return (
    <div className="App">
      <Header units={units} switchTemp={switchTemp} />
      <Map />
      <Current units={units} convertTemp={convertTemp} />
      <Daily units={units} convertTemp={convertTemp} />
    </div>
  );
};

export default App;
