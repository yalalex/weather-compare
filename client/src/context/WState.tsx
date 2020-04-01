import React, { useState } from 'react';
import axios from 'axios';
import WContext from './wContext';
import { cities } from '../lists/cities';
import { Current, Daily, Archive, City } from './types';
// import {
//   SET_CURRENT,
//   SET_DAILY,
//   SET_ARCHIVE,
//   SWITCH_UNITS,
//   CLEAR_SEARCH,
//   SET_LOADING
// } from './types';

interface WStateProps {
  children: React.ReactNode;
}

const WState = (props: WStateProps) => {
  const [places, setPlaces] = useState<City[]>([]);
  const [current, setCurrent] = useState<Current[]>([]);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [archive, setArchive] = useState<Archive[]>([]);
  const [units, setUnits] = useState<string>('metric');
  const [loading, setLoading] = useState<boolean>(false);

  const switchUnits = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };

  // const convertTemp = (temp: number) => (temp * 9) / 5 + 32;

  const reset = () => {
    setPlaces([]);
    setCurrent([]);
    setDaily([]);
    setArchive([]);
  };

  const getData = async (names: string[]) => {
    reset();
    const a = names.map(name => cities.filter(city => city.name === name));
    setPlaces(a.flat());
    setLoading(true);
    try {
      const res = await axios.get('/api/current', { params: names });
      setCurrent(res.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get('/api/daily', { params: names });
      setDaily(res.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get('/api/archive', { params: names });
      setArchive(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <WContext.Provider
      value={{
        places,
        current,
        daily,
        archive,
        units,
        loading,
        switchUnits,
        getData,
        reset
      }}
    >
      {props.children}
    </WContext.Provider>
  );
};

export default WState;
