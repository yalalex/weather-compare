import React, { useContext } from 'react';
import TheMap from './TheMap';
import wContext from '../../context/wContext';

const MapContainer = () => {
  const WContext = useContext(wContext);
  const { places } = WContext;

  return places.length > 0 ? <TheMap places={places} /> : null;
};

export default MapContainer;
