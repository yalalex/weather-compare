export const SET_CURRENT = 'SET_CURRENT';
export const SET_DAILY = 'SET_DAILY';
export const SET_ARCHIVE = 'SET_ARCHIVE';
export const SWITCH_UNITS = 'SWITCH_UNITS';
export const CONVERT_TEMP = 'CONVER_TEMP';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_LOADING = 'SET_LOADING';

export interface WState {
  current: any[];
  daily: any[];
  archive: any[];
  units: string;
  loading: boolean;
  switchUnits: () => void;
  getData: (places: string[]) => void;
}
