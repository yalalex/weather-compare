import React, { Fragment, useState, useContext, useEffect } from 'react';
import wContext from '../../context/wContext';
import moment from 'moment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';

import {
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    graph: {
      height: '100%',
      minWidth: 450,
    },
    select: {
      minWidth: 350,
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: 100,
    },
    formControl: {
      minWidth: 100,
    },
  })
);

interface DataItem {
  x: string;
  y: number;
}

interface Data {
  id: string;
  data: DataItem[];
}

const DailyGraph = () => {
  const classes = useStyles();

  const WContext = useContext(wContext);
  const { daily, units } = WContext;

  const [forecast, setForecast] = useState<Data[]>([]);
  const [selected, setSelected] = useState<Data[]>([]);
  const [temp, setTemp] = useState<string>('Maximum');

  useEffect(() => {
    if (daily.length) {
      const data = daily.map((place) => {
        let day = daily[0].date;
        let dataItem: Data = { id: place.name, data: [] };
        for (let i = 0; i < 7; i++) {
          const item = {
            x: moment(day).format('MMM DD'),
            y:
              units === 'metric'
                ? place.data[i][selectTemp()]
                : (place.data[i][selectTemp()] * 9) / 5 + 32,
          };
          dataItem.data.push(item);
          day = day + 86400000;
        }
        return dataItem;
      });
      setForecast(data);
    }
    // eslint-disable-next-line
  }, [daily, units, temp]);

  const select = (id: string) => {
    setForecast(
      forecast.map((place) => {
        if (place.id === id && place.data.length > 0) {
          const placeClone = { ...place };
          setSelected([...selected, placeClone]);
          place.data = [];
        }

        else if (
          place.id === id &&
          place.data &&
          place.data.length === 0 &&
          selected.length > 0
        ) {
          place.data = selected.filter((place) => place.id === id)[0].data;
          setSelected(selected.filter((place) => place.id !== id));
        }
        return place;
      })
    );
  };

  const selectTemp = () => {
    switch (temp) {
      case 'Maximum':
        return 'max';
      case 'Average':
        return 'temp';
      case 'Minimum':
        return 'min';
      default:
        return 'max';
    }
  };

  const temps = ['Maximum', 'Average', 'Minimum'];

  return (
    <Fragment>
      <div className={classes.select}>
        <FormControl className={classes.formControl} size='small'>
          <Select
            value={temp}
            onChange={(e: any) => setTemp(e.target.value)}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {temps.map((temp) => (
              <MenuItem key={temp} value={temp}>{`${temp}`}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Max/Avg/Min T</FormHelperText>
        </FormControl>
      </div>
      <div className={classes.graph}>
        <ResponsiveLine
          data={forecast}
          curve='monotoneX'
          margin={{ top: 30, right: 100, bottom: 90, left: 55 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Temperature',
            legendOffset: -45,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel='y'
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              onClick: (data) => select(data.label),
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Fragment>
  );
};

export default DailyGraph;
