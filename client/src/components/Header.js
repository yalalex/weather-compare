import React from 'react';
import { AppBar } from '@material-ui/core';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Weather Compare
        </Typography>
        <Button color="inherit">Imperial</Button>
      </Toolbar>
    </AppBar>
  );
};
