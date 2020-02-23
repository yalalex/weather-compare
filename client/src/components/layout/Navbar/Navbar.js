import React, { useContext } from 'react';

import wContext from '../../../context/wContext';
import Switcher from './Switcher';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar() {
  const WContext = useContext(wContext);
  const { units, switchUnits } = WContext;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Weather compare
          </Typography>
          <Switcher units={units} switchUnits={switchUnits} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
