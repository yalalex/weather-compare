import React, { useContext } from 'react';
import wContext from '../context/wContext';
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
    active: { color: '#f50057', '&:hover': { cursor: 'pointer' } },
    unactive: { '&:hover': { cursor: 'pointer' } },
  })
);

const List = (props: ListProps) => {
  const classes = useStyles();
  const { isOpen, closeList } = props;

  const WContext = useContext(wContext);
  const { select, active } = WContext;

  // const [blocks, setBlocks] = useState<any[]>([]);

  // useEffect(() => {
  //   console.log(window.innerWidth);
  //   if (window.innerWidth >= 800)
  //     setBlocks([
  //       cities.slice(0, 20),
  //       cities.slice(20, 40),
  //       cities.slice(40, 60),
  //     ]);
  //   if (window.innerWidth < 800 && window.innerWidth >= 600)
  //     setBlocks([cities.slice(0, 30), cities.slice(30, 60)]);
  //   if (window.innerWidth < 600) setBlocks(cities);
  // }, [window.innerWidth]);

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
      <TheMap places={cities} />
      <DialogContent dividers={true}>
        <div className={classes.list}>
          {blocks.map((block, i) => (
            <div key={i}>
              <Typography variant='subtitle1'>
                {block.map((city) => (
                  <div
                    key={city.name}
                    className={
                      city.name === active ? classes.active : classes.unactive
                    }
                    onClick={() => select(city.name)}
                  >
                    {city.name + ', ' + city.country}
                  </div>
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
