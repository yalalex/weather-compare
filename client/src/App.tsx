import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import WorldMap from './components/WorldMap';
import Search from './components/Search';
import Current from './components/Current';
// import Daily from './components/Daily';
// import useSwitchUnits from './hooks/useSwitchUnits';

const App = () => {
  // const [units, switchUnits] = useSwitchUnits('metric');
  // const { switchUnits, convertTemp } = switchUnits;

  const [current, setCurrent] = useState<any[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [archive, setArchive] = useState<any[]>([]);
  const [units, setUnits] = useState<string>('metric');

  const switchUnits = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };

  const convertTemp = (temp: number) => {
    return units === 'metric' ? temp : (temp * 9) / 5 + 32;
  };

  const getCurrent = (data: any[]) => {
    setCurrent(data);
  };

  const getDaily = (data: any[]) => {
    setDaily(data);
  };

  const getArchive = (data: any[]) => {
    setArchive(data);
  };

  return (
    <div className='App'>
      <Navbar units={units} switchUnits={switchUnits} />
      <Search
        getCurrent={getCurrent}
        getDaily={getDaily}
        getArchive={getArchive}
      />
      <div className='container'>
        <WorldMap />
        <Current units={units} convertTemp={convertTemp} current={current} />
        {/* <Daily units={units} convertTemp={convertTemp} /> */}
      </div>
    </div>
  );
};

export default App;
