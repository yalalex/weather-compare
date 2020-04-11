import React from 'react';
import TheMap from './map/TheMap';
import { cities } from '../lists/cities';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  createStyles,
  IconButton,
  Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface ListProps {
  isOpen: boolean;
  closeList: () => void;
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
  })
);

const List = (props: ListProps) => {
  const classes = useStyles();
  const { isOpen, closeList } = props;

  const blocks =
    window.innerWidth > 800
      ? [cities.slice(0, 20), cities.slice(20, 40), cities.slice(40, 60)]
      : [cities.slice(0, 30), cities.slice(30, 60)];

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
      <TheMap places={cities} center={0} />
      <DialogContent dividers={true}>
        <div className={classes.list}>
          {blocks.map((block, i) => (
            <div key={i}>
              <Typography variant='subtitle1'>
                {block.map((city) => (
                  <div key={city.name}>{city.name + ', ' + city.country}</div>
                ))}
              </Typography>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default List;
