import React, { useContext } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { City } from '../../context/types';
import wContext from '../../context/wContext';
import Mark from './Mark';

interface TheMapProps {
  places: City[];
}

const TheMap = (props: TheMapProps) => {
  const { places } = props;
  const WContext = useContext(wContext);
  const { center } = WContext;

  return (
    <YMaps>
      <div style={{ height: 300 }}>
        <Map
          state={{
            center: [35, center],
            zoom: 2,
          }}
          width='100%'
          height='100%'
        >
          {places.map((city) => (
            <Mark key={city.name} city={city} />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default TheMap;
