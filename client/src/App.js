import React from 'react';
import './App.css';

import UnitsContext from './context/units';
import useSwitchUnits from './hooks/useSwitchUnits';

const App = () => {
  const [units, switchUnits] = useSwitchUnits('metric');
  return (
    <div className="App">
      <UnitsContext.Provider value={{ units, switchUnits }}>
        My app
      </UnitsContext.Provider>
    </div>
  );
};

export default App;
