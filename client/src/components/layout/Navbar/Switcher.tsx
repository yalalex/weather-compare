import React, { useContext } from 'react';

import wContext from '../../../context/wContext';

import { Switch, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  switch: {
    margin: 5,
    width: 40
  }
}));

const Switcher = () => {
  const WContext = useContext(wContext);
  const { switchUnits } = WContext;

  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();

  const toggleChecked = () => {
    setChecked(prev => !prev);
    switchUnits();
  };

  return (
    <Typography component='div'>
      <Grid component='label' container alignItems='center' spacing={1}>
        <Grid item>°C</Grid>
        <Grid item className={classes.switch}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={toggleChecked}
                color='default'
              />
            }
            label={null}
          />
        </Grid>
        <Grid item>°F</Grid>
      </Grid>
    </Typography>
  );
};

export default Switcher;
