import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WContext from './wContext';
import { cities } from '../lists/cities';
import { Current, Daily, Archive, City } from './types';

interface WStateProps {
  children: React.ReactNode;
}

const WState = (props: WStateProps) => {
  const [places, setPlaces] = useState<City[]>([]);
  const [names, setNames] = useState<any[]>([]);
  const [current, setCurrent] = useState<Current[]>([]);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [archive, setArchive] = useState<Archive[]>([]);
  const [units, setUnits] = useState<string>('metric');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [names]);

  const switchUnits = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };

  const reset = () => {
    setPlaces([]);
    setCurrent([]);
    setDaily([]);
    setArchive([]);
  };

  const removePlace = (name: string) => {
    const place = name.substring(0, name.indexOf(','));
    setNames(names.filter((name) => name !== place));
    setPlaces(places.filter((city) => city.name !== place));
  };

  const setList = (names: string[]) => {
    reset();
    setNames(names);
    const a = names.map((name) => cities.filter((city) => city.name === name));
    setPlaces(a.flat());
  };

  const getData = async () => {
    setLoading(true);
    try {
      const weather = await Promise.all([
        axios.get('/api/current', { params: names }),
        axios.get('/api/daily', { params: names }),
        axios.get('/api/archive', { params: names }),
      ]);
      setCurrent(weather[0].data);
      setDaily(weather[1].data);
      setArchive(weather[2].data);
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
        setList,
        removePlace,
        reset,
      }}
    >
      {props.children}
    </WContext.Provider>
  );
};

export default WState;
