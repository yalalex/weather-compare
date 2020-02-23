import { createContext } from 'react';
import { WState } from './types';

const state = {
  current: [],
  daily: [],
  archive: [],
  units: 'metric',
  loading: false,
  switchUnits: () => {},
  getData: () => {}
};

const wContext = createContext<WState>(state);

export default wContext;
