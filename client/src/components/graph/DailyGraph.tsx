import React, { useState, useContext, useEffect } from 'react';
import wContext from '../../context/wContext';
import moment from 'moment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      height: 300,
      padding: 16,
      marginTop: 7,
      marginBottom: 7,
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    // title: {
    //   marginLeft: window.innerWidth >= 600 ? 8 : 0,
    // },
    graph: {
      height: 300,
      minWidth: 350,
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
  const { daily, units, screen } = WContext;

  const [forecast, setForecast] = useState<Data[]>([]);

  useEffect(() => {
    if (daily.length) {
      const data = daily.map((place) => {
        let day = daily[0].date;
        let dataItem: Data = { id: place.name, data: [] };
        for (let i = 0; i < 7; i++) {
          const item = {
            x:
              units === 'metric'
                ? moment(day).format('DD/MM')
                : moment(day).format('MM/DD'),
            y:
              units === 'metric'
                ? place.data[i].temp
                : (place.data[i].temp * 9) / 5 + 32,
          };
          dataItem.data.push(item);
          day = day + 86400000;
        }
        return dataItem;
      });
      setForecast(data);
    }
    // eslint-disable-next-line
  }, [daily, units]);

  return daily.length ? (
    <Paper className={classes.paper}>
      <Typography
        variant='h6'
        style={{ marginLeft: screen === 'desktop' ? 8 : 0 }}
      >
        Weekly Forecast Graph
      </Typography>
      <div className={classes.graph}>
        <ResponsiveLine
          data={forecast}
          margin={{ top: 30, right: 100, bottom: 80, left: 50 }}
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
            legendOffset: -40,
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
    </Paper>
  ) : null;
};

export default DailyGraph;
