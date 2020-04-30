import React, { useState, useContext } from 'react';
import wContext from '../context/wContext';

import List from './List';

import {
  Button,
  Paper,
  makeStyles,
  createStyles,
  Typography,
} from '@material-ui/core';

import Autocomplete from './layout/Input/Autocomplete';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: 15,
      paddingTop: 8,
      marginTop: 10,
      marginBottom: 10,
    },
    formButtons: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    submitButton: {
      marginLeft: 8,
      width: 145,
    },
    clearButton: {
      marginLeft: 10,
    },
    listLink: {
      display: 'flex',
      margin: 'auto',
      marginTop: 8,
      color: '#3f51b5',
      textDecorationLine: 'underline',
      '&:hover': {
        cursor: 'pointer',
        textDecorationLine: 'none',
      },
    },
  })
);

const Search = () => {
  const classes = useStyles();

  const WContext = useContext(wContext);
  const { setList, removePlace, reset, select, screen } = WContext;

  const [places, setPlaces] = useState<string[]>([]);
  const [inputE, setInputE] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const displayError = (error: string) => {
    setInputE(error);
    setTimeout(() => setInputE(''), 3000);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInputE('');
    if (!places.length)
      return displayError(
        'Please select at least one place from the dropdown list'
      );
    const names = places.map(
      (place: string) => place && place.substring(0, place.indexOf(','))
    );
    setList(names);
  };

  const handleReset = () => {
    setInputE('');
    setPlaces([]);
    reset();
  };

  const setListState = (isOpen: boolean) => {
    setIsOpen(isOpen);
    select('');
  };

  return (
    <Paper className={classes.paper}>
      <List isOpen={isOpen} closeList={() => setListState(false)} />
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Autocomplete
          selectHandle={(arr) => {
            setPlaces(arr);
          }}
          selectedItem={places}
          placeholder='Enter places to get weather for'
          deleteItem={removePlace}
          error={!!inputE}
          helperText={inputE}
        />
        <div className={classes.formButtons}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submitButton}
          >
            Get weather!
          </Button>
          <Button
            type='reset'
            variant='contained'
            color='secondary'
            className={classes.clearButton}
          >
            Reset
          </Button>
          <div
            className={classes.listLink}
            style={{
              marginRight: screen !== 'phone' ? 8 : '',
              marginLeft: screen === 'phone' ? 8 : '',
            }}
            onClick={() => setListState(true)}
          >
            <Typography variant='body2'>List of available places</Typography>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default Search;
