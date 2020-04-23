import React from 'react';
import { Placemark } from 'react-yandex-maps';
import { City } from '../../context/types';

interface MarkProps {
  city: City;
  active?: string;
  onFocus?: (name: string) => void;
}

const Mark = (props: MarkProps) => {
  const { city, onFocus, active } = props;

  const select = (name: string) => {
    if (onFocus) return onFocus(name);
    else return null;
  };

  return (
    <Placemark
      defaultGeometry={[city.lat, city.lon]}
      onClick={() => select(city.name)}
      options={
        city.name === active
          ? { iconColor: 'red', zIndex: 999 }
          : { iconColor: '#1e9aff', zIndex: 1 }
      }
    />
  );
};

export default Mark;
