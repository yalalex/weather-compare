import React, { useState, useContext } from 'react';
import wContext from '../context/wContext';

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
      marginTop: 7,
      marginBottom: 7
    },
    formButtons: {
      display: 'flex',
      marginTop: 10
    },
    submitButton: {
      marginLeft: 8,
      width: 145
    },
    clearButton: {
      marginLeft: 10
    }
  })
);

const Search = () => {
  const WContext = useContext(wContext);
  const { getData, reset, loading } = WContext;

  const classes = useStyles();
  const [places, setPlaces] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const names = places.map((place: string) =>
      place.substring(0, place.indexOf(','))
    );
    getData(names);
  };

  const handleReset = () => {
    setPlaces([]);
    reset();
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Autocomplete
          selectHandle={arr => {
            setPlaces(arr);
          }}
          selectedItem={places}
          placeholder='Enter places to get weather for'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.submitButton}
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
          className={classes.clearButton}
        >
          Reset
        </Button>
      </form>
    </Paper>
  );
};

export default Search;
