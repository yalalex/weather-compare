import React from 'react';
import './App.css';

import Header from './components/Header';
import CurrentTable from './components/CurrentTable';
import DailyTable from './components/DailyTable';

import UnitsContext from './context/units';
import useSwitchUnits from './hooks/useSwitchUnits';

const App = () => {
  const [units, switchUnits] = useSwitchUnits('metric');
  return (
    <div className="App">
      <UnitsContext.Provider value={{ units, switchUnits }}>
        <Header />
        <CurrentTable />
        <DailyTable />
      </UnitsContext.Provider>
    </div>
  );
};

export default App;
