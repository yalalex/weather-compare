import React, { useState } from 'react';
import axios from 'axios';

import {
  Button,
  Paper,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core';

import Autocomplete from './layout/Input/Autocomplete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 15,
      marginBottom: 15
    },
    formButtons: {
      display: 'flex',
      marginTop: 10
    },
    formButton: {
      width: 150,
      marginLeft: 8,
      marginTop: 5
    }
  })
);

const Search = () => {
  const classes = useStyles();

  const [places, setPlaces] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (places.length > 0)
      // add alert on empty array
      try {
        const resCurrent = await axios.get('/api/current');
        const resDaily = await axios.get('/api/daily');
        const resCharts = await axios.get('/api/archive');
      } catch (error) {
        console.log(error);
      }
    setLoading(false);
  };

  const handleReset = () => {
    setPlaces([]);
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Autocomplete
          selectHandle={arr => {
            setPlaces(arr);
          }}
          selectedItem={places}
          placeholder='Enter up to 10 places to get weather for'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.formButton}
          disabled={loading ? true : false}
        >
          {loading ? (
            <CircularProgress size={24} color={'inherit'} />
          ) : (
            'Get weather!'
          )}
        </Button>
        <Button
          type='reset'
          variant='contained'
          color='secondary'
          className={classes.formButton}
        >
          Reset
        </Button>
      </form>
    </Paper>
  );
};

export default Search;
