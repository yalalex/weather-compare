import React, { useState, useContext, useEffect } from 'react';
import wContext from '../../context/wContext';
import DailyGraph from '../graph/DailyGraph';
import MaterialTable from 'material-table';
import moment from 'moment';
import { Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Daily as Forecast } from '../../context/types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 10,
    },
    cell: {
      height: 55,
      display: 'flex',
      alignItems: 'center',
    },
    hover: {
      '&:hover': { cursor: 'pointer' },
    },
    graph: {
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: 16,
      marginBottom: 7,
    },
  })
);

const Daily = () => {
  const classes = useStyles();

  const WContext = useContext(wContext);
  const { daily, units } = WContext;

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (daily.length) {
      let day = daily[0].date;
      let arr: any = [
        {
          title: 'City',
          field: 'name',
        },
      ];
      for (let i = 0; i < 7; i++) {
        const item = {
          title:
            units === 'metric'
              ? moment(day).format('DD/MM')
              : moment(day).format('MM/DD'),
          field: 'data[i].temp',
          render: (props: Forecast) => (
            <div className={classes.cell}>
              <img
                alt='conditions'
                src={`https://www.weatherbit.io/static/img/icons/${props.data[i].icon}.png`}
                style={{ width: 40 }}
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
    // eslint-disable-next-line
  }, [daily, units]);

  return daily.length ? (
    <Paper className={classes.root}>
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
          padding: 'dense',
        }}
      />
      <Paper
        className={classes.graph}
        style={{ height: 265 + daily.length * 10 }}
        elevation={3}
      >
        <DailyGraph />
      </Paper>
    </Paper>
  ) : null;
};

export default Daily;
