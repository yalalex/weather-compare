import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { City } from '../../context/types';

interface TheMapProps {
  places: City[];
  center: number;
}

const TheMap = (props: TheMapProps) => {
  const { places, center } = props;

  return (
    <YMaps>
      <div style={{ height: 400 }}>
        <Map
          defaultState={{
            center: [35, center],
            zoom: 2,
          }}
          width='100%'
          height='100%'
        >
          {places.map((city) => (
            <Placemark key={city.name} defaultGeometry={[city.lat, city.lon]} />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default TheMap;
