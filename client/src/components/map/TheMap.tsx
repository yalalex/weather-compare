import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { City } from '../../context/types';
import Mark from './Mark';

interface TheMapProps {
  places: City[];
  center: number;
  active?: string;
  onFocus?: (name: string) => void;
}

const TheMap = (props: TheMapProps) => {
  const { places, center, onFocus, active } = props;

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
            <Mark
              key={city.name}
              city={city}
              onFocus={onFocus}
              active={active}
            />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default TheMap;
