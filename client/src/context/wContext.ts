import { createContext } from 'react';
import { WState } from './types';

const state = {
  places: [],
  current: [],
  daily: [],
  archive: [],
  units: 'metric',
  loading: false,
  switchUnits: () => {},
  getData: () => {},
  setList: () => {},
  removePlace: () => {},
  reset: () => {}
};

const wContext = createContext<WState>(state);

export default wContext;
