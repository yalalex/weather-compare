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
  const [active, setActive] = useState<string>('');
  const [center, setCenter] = useState<number>(0);
  const [screen, setScreen] = useState<string>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 900) return setScreen('desktop');
      if (width < 900 && width >= 600) return setScreen('pad');
      if (width < 600) return setScreen('phone');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getData();
    names.length &&
      screen !== 'desktop' &&
      setCenter(cities.filter((city) => city.name === names[0])[0].lon);
    // eslint-disable-next-line
  }, [names]);

  const switchUnits = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };

  const setList = (names: string[]) => {
    reset();
    setNames(names);
    const list = names.map((name) =>
      cities.filter((city) => city.name === name)
    );
    setPlaces(list.flat());
  };

  const getData = async () => {
    setLoading(true);
    try {
      const weather = await Promise.all([
        axios.get('/api/current', { params: names }),
        axios.get('/api/daily', { params: names }),
        axios.get('/api/archive', { params: names }),
      ]);
      const c = names.map((name) =>
        weather[0].data.filter((city: City) => city.name === name)
      );
      const d = names.map((name) =>
        weather[1].data.filter((city: City) => city.name === name)
      );
      const a = names.map((name) =>
        weather[2].data.filter((city: City) => city.name === name)
      );
      setCurrent(c.flat());
      setDaily(d.flat());
      setArchive(a.flat());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const select = (name: string) => {
    setActive(name);
    name &&
      screen !== 'desktop' &&
      setCenter(cities.filter((city) => city.name === name)[0].lon);
  };

  const reset = () => {
    setPlaces([]);
    setCurrent([]);
    setDaily([]);
    setArchive([]);
    setActive('');
    setCenter(0);
  };

  const removePlace = (name: string) => {
    const place = name.substring(0, name.indexOf(','));
    setNames(names.filter((name) => name !== place));
    setPlaces(places.filter((city) => city.name !== place));
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
        active,
        center,
        screen,
        switchUnits,
        setList,
        getData,
        select,
        reset,
        removePlace,
      }}
    >
      {props.children}
    </WContext.Provider>
  );
};

export default WState;
