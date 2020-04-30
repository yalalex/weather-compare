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
  const [names, setNames] = useState<string[]>([]);
  const [current, setCurrent] = useState<Current[]>([]);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [archive, setArchive] = useState<Archive[]>([]);
  const [units, setUnits] = useState<string>('metric');
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');
  const [center, setCenter] = useState<number>(0);
  const [screen, setScreen] = useState<string>(changeScreen());

  function changeScreen() {
    const width = window.innerWidth;
    if (width >= 900) return 'desktop';
    if (width < 900 && width >= 600) return 'pad';
    if (width < 600) return 'phone';
    return 'phone';
  }

  useEffect(() => {
    const handleResize = () => {
      setScreen(changeScreen());
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
    const list = names
      .map((name) => cities.filter((city) => city.name === name))
      .flat();
    setPlaces(list);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const weather = await Promise.all([
        axios.get('/api/current', { params: names }),
        axios.get('/api/daily', { params: names }),
        axios.get('/api/archive', { params: names }),
      ]);
      const [c, d, a] = weather.map((data) =>
        names
          .map((name) => data.data.filter((city: City) => city.name === name))
          .flat(1)
      );
      setCurrent(c);
      setDaily(d);
      setArchive(a);
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

  const removePlace = (place: string) => {
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
