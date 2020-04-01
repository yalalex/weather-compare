import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import wContext from '../../context/wContext';
import Moment from 'react-moment';

const Current = () => {
  const WContext = useContext(wContext);
  const { current, units } = WContext;
  const offset = new Date().getTimezoneOffset() * 60;

  return current.length ? (
    <MaterialTable
      title='Current Weather'
      columns={[
        { title: 'City', field: 'name' },
        {
          title: 'Local Time',
          field: 'time',
          render: props => (
            <Moment unix format='HH:mm'>
              {offset + props.timezone + props.time / 1000}
            </Moment>
          )
        },
        {
          title: 'Conditions',
          field: 'conditions',
          render: props => (
            <img
              alt='conditions'
              src={`https://openweathermap.org/img/wn/${props.icon}.png`}
              style={{ width: '50px' }}
            />
          )
        },
        {
          title: units === 'metric' ? 'Temp, °C' : 'Temp, °F',
          field: 'temp',
          render: props =>
            units === 'metric'
              ? props.temp.toFixed()
              : ((props.temp * 9) / 5 + 32).toFixed()
        },
        { title: 'Humidity, %', field: 'humidity' },
        { title: 'Wind, m/s', field: 'wind.speed' },
        {
          title: 'Sunrise',
          field: 'sunrise',
          render: props => (
            <Moment unix format='HH:mm'>
              {offset + props.timezone + props.sunrise}
            </Moment>
          )
        },
        {
          title: 'Sunset',
          field: 'sunset',
          render: props => (
            <Moment unix format='HH:mm'>
              {offset + props.timezone + props.sunset}
            </Moment>
          )
        }
      ]}
      data={current}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        paging: false,
        pageSize: current.length
      }}
    />
  ) : null;
};

export default Current;
