import React from 'react';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import WorldMap from './components/WorldMap';
import Search from './components/Search';
import Current from './components/Current';
// import Daily from './components/Daily';

import { Container } from '@material-ui/core';

import WState from './context/WState';

const App = () => {
  return (
    <div className='App'>
      <WState>
        <Navbar />
        <Container>
          <Search />
          <Current />
          {/* <Daily /> */}
          <WorldMap />
        </Container>
      </WState>
    </div>
  );
};

export default App;
