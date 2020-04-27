import React, { useContext } from 'react';
import { Placemark } from 'react-yandex-maps';
import wContext from '../../context/wContext';
import { City } from '../../context/types';

interface MarkProps {
  city: City;
}

const Mark = (props: MarkProps) => {
  const { city } = props;
  const WContext = useContext(wContext);
  const { active, select } = WContext;

  return (
    <Placemark
      defaultGeometry={[city.lat, city.lon]}
      onClick={() => select(city.name)}
      options={
        city.name === active
          ? { iconColor: '#f50057', zIndex: 2 }
          : { iconColor: '#1e9aff', zIndex: 1 }
      }
    />
  );
};

export default Mark;
