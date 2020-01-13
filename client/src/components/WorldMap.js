import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { cities } from '../lists/cities';

const WorldMap = () => {
  return (
    <YMaps>
      <div className='map'>
        <Map
          defaultState={{
            center: [40, -45],
            zoom: 1
          }}
          width='100%'
          height='100%'
        >
          {cities.map((city, i) => (
            <Placemark key={i} defaultGeometry={[city.lat, city.lon]} />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default WorldMap;
