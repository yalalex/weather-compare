import React, { useState, useContext, useEffect } from 'react';
import wContext from '../../context/wContext';
import moment from 'moment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';

const useStyles = makeStyles((theme) =>
  createStyles({
    graph: {
      height: '100%',
      minWidth: 500,
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
  const { daily, units, select } = WContext;

  const [forecast, setForecast] = useState<Data[]>([]);

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

  return (
    <div className={classes.graph}>
      <ResponsiveLine
        data={forecast}
        curve='monotoneX'
        margin={{ top: 30, right: 100, bottom: 50, left: 55 }}
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
  );
};

export default DailyGraph;
