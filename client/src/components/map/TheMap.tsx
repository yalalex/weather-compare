import React, { useContext } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { City } from '../../context/types';
import wContext from '../../context/wContext';
import Mark from './Mark';

interface TheMapProps {
  places: City[];
  selected?: string[];
  addPlace?: (place: string) => void;
}

const TheMap = (props: TheMapProps) => {
  const { places, selected, addPlace } = props;
  const WContext = useContext(wContext);
  const { center, screen } = WContext;

  return (
    <YMaps>
      <div style={{ height: screen === 'desktop' ? 350 : 300 }}>
        <Map
          state={{
            center: [35, center],
            zoom: 2,
          }}
          width='100%'
          height='100%'
        >
          {places.map((city) => (
            <Mark
              key={city.name}
              city={city}
              selected={selected}
              addPlace={addPlace}
            />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default TheMap;
