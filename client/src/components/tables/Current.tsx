import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import wContext from '../../context/wContext';
import Moment from 'react-moment';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    hover: {
      '&:hover': { cursor: 'pointer' },
    },
  })
);

const Current = () => {
  const classes = useStyles();

  const WContext = useContext(wContext);
  const { current, units, select } = WContext;

  const windDir = (deg: number) => {
    if (deg === undefined) return '';
    if (deg >= 348.75 || deg <= 11.25) return '`N';
    if (deg > 11.25 && deg < 33.75) return '`NNE';
    if (deg >= 33.75 && deg <= 56.25) return '`NE';
    if (deg > 56.25 && deg < 78.75) return '`ENE';
    if (deg >= 78.75 && deg <= 101.25) return '`E';
    if (deg > 101.25 && deg < 123.75) return '`ESE';
    if (deg >= 123.75 && deg <= 146.25) return '`SE';
    if (deg > 146.25 && deg < 168.75) return '`SSE';
    if (deg >= 168.75 && deg <= 191.25) return '`S';
    if (deg > 191.25 && deg < 213.75) return '`SSW';
    if (deg >= 213.75 && deg <= 236.25) return '`SW';
    if (deg > 236.25 && deg < 258.75) return '`WSW';
    if (deg >= 258.75 && deg <= 281.25) return '`W';
    if (deg > 281.25 && deg < 303.75) return '`WNW';
    if (deg >= 303.75 && deg <= 326.25) return '`NW';
    if (deg > 326.25 && deg < 348.75) return '`NNW';
  };

  const offset = new Date().getTimezoneOffset() * 60;

  return current.length ? (
    <MaterialTable
      title='Current Weather'
      columns={[
        {
          title: 'City',
          field: 'name',
          render: (props) => (
            <div onClick={() => select(props.name)} className={classes.hover}>
              {props.name}
            </div>
          ),
        },
        {
          title: 'Local Time',
          field: 'time',
          render: (props) => (
            <Moment unix format={units === 'metric' ? 'HH:mm' : 'hh:mm a'}>
              {offset + props.timezone + props.time / 1000}
            </Moment>
          ),
        },
        {
          title: 'Conditions',
          field: 'conditions',
          render: (props) => (
            <img
              alt='conditions'
              src={`https://openweathermap.org/img/wn/${props.icon}.png`}
              style={{ width: 50 }}
            />
          ),
        },
        {
          title: units === 'metric' ? 'Temp, °C' : 'Temp, °F',
          field: 'temp',
          render: (props) =>
            units === 'metric'
              ? props.temp.toFixed()
              : ((props.temp * 9) / 5 + 32).toFixed(),
        },
        { title: 'Humidity, %', field: 'humidity' },
        {
          title: units === 'metric' ? 'Wind, m/s' : 'Wind, mph',
          field: 'wind.speed',
          render: (props) =>
            units === 'metric'
              ? props.wind.speed.toFixed(1) + windDir(props.wind.deg)
              : (props.wind.speed * 2.23694).toFixed(1) +
                windDir(props.wind.deg),
        },
        {
          title: 'Sunrise',
          field: 'sunrise',
          render: (props) => (
            <Moment unix format={units === 'metric' ? 'HH:mm' : 'hh:mm a'}>
              {offset + props.timezone + props.sunrise}
            </Moment>
          ),
        },
        {
          title: 'Sunset',
          field: 'sunset',
          render: (props) => (
            <Moment unix format={units === 'metric' ? 'HH:mm' : 'hh:mm a'}>
              {offset + props.timezone + props.sunset}
            </Moment>
          ),
        },
      ]}
      data={current}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        paging: false,
        pageSize: current.length,
      }}
    />
  ) : null;
};

export default Current;
