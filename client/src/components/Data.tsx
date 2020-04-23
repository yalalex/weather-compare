import React, { Fragment, useContext } from 'react';

import MapContainer from './map/MapContainer';
import Current from './tables/Current';
import Daily from './tables/Daily';

import wContext from '../context/wContext';

import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 999,
    display: 'flex',
  },
  loadingSpinner: {
    margin: 'auto',
  },
}));

const Data = () => {
  const WContext = useContext(wContext);
  const { loading } = WContext;

  const classes = useStyles();

  return loading ? (
    <div className={classes.loading}>
      <CircularProgress className={classes.loadingSpinner} size={75} />
    </div>
  ) : (
    <Fragment>
      <Current />
      <Daily />
      <MapContainer />
    </Fragment>
  );
};

export default Data;
