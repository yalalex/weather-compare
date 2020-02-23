import React from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  switch: {
    margin: 5,
    width: 40
  }
}));

const Switcher = ({ units, switchTemp }) => {
  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();

  const toggleChecked = () => {
    setChecked(prev => !prev);
    switchTemp();
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
          />
        </Grid>
        <Grid item>°F</Grid>
      </Grid>
    </Typography>
  );
};

export default Switcher;
