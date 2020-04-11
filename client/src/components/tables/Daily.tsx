import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import wContext from '../../context/wContext';
import moment from 'moment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Daily as Forecast } from '../../context/types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 7,
      marginBottom: 7,
    },
    cell: {
      height: 55,
      display: 'flex',
      alignItems: 'center',
    },
  })
);

const Daily = () => {
  const WContext = useContext(wContext);
  const { daily, units } = WContext;

  const classes = useStyles();

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (daily.length) {
      let day = daily[0].date;
      let arr: any = [{ title: 'City', field: 'name' }];
      for (let i = 0; i < 7; i++) {
        const item = {
          title:
            units === 'metric'
              ? moment(day).format('DD/MM')
              : moment(day).format('MM/DD'),
          field: 'data[i].temp',
          render: (props: Forecast) => (
            <div style={{ height: 55, display: 'flex', alignItems: 'center' }}>
              <img
                alt='conditions'
                src={`https://www.weatherbit.io/static/img/icons/${props.data[i].icon}.png`}
                style={{ width: '40px' }}
              />
              {units === 'metric'
                ? props.data[i].max.toFixed() +
                  '°/' +
                  props.data[i].min.toFixed() +
                  '°'
                : ((props.data[i].max * 9) / 5 + 32).toFixed() +
                  '°/' +
                  ((props.data[i].min * 9) / 5 + 32).toFixed() +
                  '°'}
            </div>
          ),
        };
        arr.push(item);
        day = day + 86400000;
      }
      setForecast(arr);
    }
  }, [daily, units]);

  return daily.length ? (
    <div className={classes.root}>
      <MaterialTable
        title='Weekly Forecast'
        columns={forecast}
        data={daily}
        options={{
          search: false,
          sorting: false,
          draggable: false,
          paging: false,
          pageSize: daily.length,
        }}
      />
    </div>
  ) : null;
};

export default Daily;
