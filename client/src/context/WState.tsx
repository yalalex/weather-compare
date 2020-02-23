import React, { useState } from 'react';
import axios from 'axios';
import WContext from './wContext';
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
  const [current, setCurrent] = useState<any[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [archive, setArchive] = useState<any[]>([]);
  const [units, setUnits] = useState<string>('metric');
  const [loading, setLoading] = useState<boolean>(false);

  const switchUnits = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };

  // const convertTemp = (temp: number) => (temp * 9) / 5 + 32;

  const getData = async (places: string[]) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/current', { params: places });
      setCurrent(res.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get('/api/daily', { params: places });
      setDaily(res.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get('/api/archive', { params: places });
      setArchive(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <WContext.Provider
      value={{
        current,
        daily,
        archive,
        units,
        loading,
        switchUnits,
        getData
      }}
    >
      {props.children}
    </WContext.Provider>
  );
};

export default WState;
