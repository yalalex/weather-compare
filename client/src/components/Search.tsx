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

interface SearchProps {
  getCurrent: (data: any) => void;
  getDaily: (data: any) => void;
  getArchive: (data: any) => void;
}

const Search = (props: SearchProps) => {
  const classes = useStyles();
  const { getCurrent, getDaily, getArchive } = props;
  const [places, setPlaces] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const names = places.map((place: string) =>
      place.substring(0, place.indexOf(','))
    );
    setLoading(true);
    try {
      const resCurrent = await axios.get('/api/current', { params: names });
      getCurrent(resCurrent.data);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const resDaily = await axios.get('/api/daily', { data });
    //   getDaily(resDaily);
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   const resArchive = await axios.get('/api/archive', { data });
    //   getArchive(resArchive);
    // } catch (error) {
    //   console.log(error);
    // }
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
