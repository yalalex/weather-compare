import React, { useEffect, useState, useContext } from 'react';
import TheMap from './TheMap';
import wContext from '../../context/wContext';

const MapContainer = () => {
  const WContext = useContext(wContext);
  const { places } = WContext;

  const [center, setCenter] = useState<number>(0);

  useEffect(() => {
    if (places.length)
      setCenter(
        places.length > 1 ? (places[0].lon + places[1].lon) / 2 : places[0].lon
      );
  }, [places]);

  return places.length > 0 ? <TheMap places={places} center={center} /> : null;
};

export default MapContainer;
