import React, { useContext } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import wContext from '../context/wContext';

const WorldMap = () => {
  const WContext = useContext(wContext);
  const { places } = WContext;

  return places.length > 0 ? (
    <YMaps>
      <div className='map'>
        <Map
          defaultState={{
            center: [35, 0],
            zoom: 2
          }}
          width='100%'
          height='100%'
        >
          {places.map(city => (
            <Placemark key={city.name} defaultGeometry={[city.lat, city.lon]} />
          ))}
        </Map>
      </div>
    </YMaps>
  ) : null;
};

export default WorldMap;
