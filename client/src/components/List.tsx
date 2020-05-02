import React, { useState, useEffect, useContext } from 'react';
import wContext from '../context/wContext';
import TheMap from './map/TheMap';
import { cities } from '../lists/cities';
import { City } from '../context/types';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  createStyles,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface ListProps {
  isOpen: boolean;
  places: string[];
  closeList: () => void;
  addPlace: (place: string) => void;
  reset: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    buttons: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '100%',
    },
    entry: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

const List = (props: ListProps) => {
  const classes = useStyles();
  const { isOpen, closeList, places, addPlace, reset } = props;

  const WContext = useContext(wContext);
  const { screen, getData, select } = WContext;

  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (screen === 'desktop')
      return setBlocks([
        cities.slice(0, 20),
        cities.slice(20, 40),
        cities.slice(40, 60),
      ]);
    if (screen === 'pad')
      return setBlocks([cities.slice(0, 30), cities.slice(30, 60)]);
    if (screen === 'phone') return setBlocks([cities]);
  }, [screen]);

  return (
    <Dialog
      open={isOpen}
      onClose={closeList}
      scroll='body'
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle disableTypography={true}>
        <Typography variant='h6'>List of places</Typography>
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={closeList}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <TheMap places={cities} selected={places} addPlace={addPlace} />
      <DialogContent dividers={true}>
        <div className={classes.list}>
          {blocks.map((block, i) => (
            <div key={i}>
              <Typography variant='subtitle1'>
                {block.map((city: City) => (
                  <div
                    key={city.name}
                    className={classes.entry}
                    onClick={() => {
                      addPlace(city.name);
                      select(city.name);
                    }}
                    style={{
                      color: places.includes(city.name) ? '#f50057' : '',
                    }}
                  >
                    {city.name + ', ' + city.country}
                  </div>
                ))}
              </Typography>
            </div>
          ))}
        </div>
      </DialogContent>
      <div className={classes.buttons}>
        <Button
          disabled={places.length ? false : true}
          onClick={() => {
            getData(places);
            closeList();
          }}
        >
          Get Weather!
        </Button>
        <Button disabled={places.length ? false : true} onClick={reset}>
          Reset
        </Button>
      </div>
    </Dialog>
  );
};

export default List;
