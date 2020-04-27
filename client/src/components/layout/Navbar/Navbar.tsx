import React from 'react';

import Switcher from './Switcher';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Weather compare
        </Typography>
        <Switcher />
      </Toolbar>
    </AppBar>
  );
}
