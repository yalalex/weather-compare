import React from 'react';
import './App.css';

import Header from './components/Header';
// import CurrentWeather from './components/CurrentWeather';
// import DailyWeather from './components/DailyWeather';

// import UnitsContext from './context/units';
import useSwitchUnits from './hooks/useSwitchUnits';

const App = () => {
  const [units, switchUnits] = useSwitchUnits('metric');
  const { switchTemp, convertTemp } = switchUnits;
  return (
    <div className="App">
      {/* <UnitsContext.Provider value={{ units, switchUnits }}> */}
      <Header units={units} switchTemp={switchTemp} />
      {/* <Map /> */}
      <CurrentWeather units={units} convertTemp={convertTemp} />
      <DailyWeather units={units} convertTemp={convertTemp} />
      {/* </UnitsContext.Provider> */}
    </div>
  );
};

export default App;
