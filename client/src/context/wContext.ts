import { createContext } from 'react';
import { WState } from './types';

const state = {
  places: [],
  current: [],
  daily: [],
  archive: [],
  units: 'metric',
  loading: false,
  active: '',
  center: 0,
  screen: 'desktop',
  switchUnits: () => {},
  setList: () => {},
  getData: () => {},
  select: () => {},
  reset: () => {},
  removePlace: () => {},
};

const wContext = createContext<WState>(state);

export default wContext;
