// export const SET_CURRENT = 'SET_CURRENT';
// export const SET_DAILY = 'SET_DAILY';
// export const SET_ARCHIVE = 'SET_ARCHIVE';
// export const SWITCH_UNITS = 'SWITCH_UNITS';
// export const CONVERT_TEMP = 'CONVER_TEMP';
// export const CLEAR_SEARCH = 'CLEAR_SEARCH';
// export const SET_LOADING = 'SET_LOADING';

export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface Current {
  name: string;
  time: number;
  timezone: number;
  icon: string;
  temp: number;
  humidity: number;
  wind: { speed: number; deg: number };
  sunrise: number;
  sunset: number;
}

export interface Daily {
  name: string;
  data: DailyData[];
  date: number;
}

export interface Archive {
  name: string;
  data: ArchiveData[];
}

export interface DailyData {
  icon: string;
  temp: number;
  max: number;
  min: number;
}

export interface ArchiveData {
  temp: string;
  max: string;
  min: string;
  date: number;
}

export interface WState {
  places: City[];
  current: Current[];
  daily: Daily[];
  archive: Archive[];
  units: string;
  loading: boolean;
  active: string;
  center: number;
  screen: string;
  switchUnits: () => void;
  getData: (names: string[]) => void;
  select: (name: string) => void;
  reset: () => void;
  removePlace: (name: string) => void;
}
