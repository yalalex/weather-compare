import React, { useContext } from 'react';
import TheMap from './TheMap';
import wContext from '../../context/wContext';
import { Paper } from '@material-ui/core';

const MapContainer = () => {
  const WContext = useContext(wContext);
  const { places } = WContext;

  return places.length > 0 ? (
    <Paper elevation={3}>
      <TheMap places={places} />
    </Paper>
  ) : null;
};

export default MapContainer;
