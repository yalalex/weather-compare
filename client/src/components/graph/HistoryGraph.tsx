import React, { useState, useContext, useEffect } from 'react';
import wContext from '../../context/wContext';
import moment from 'moment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Menu, MenuItem, Button } from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: 16,
      marginTop: 10,
      marginBottom: 10,
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    graph: {
      height: '100%',
      minWidth: 500,
    },
    title: {
      display: 'flex',
      minWidth: 500,
    },
    select: {
      display: 'flex',
      margin: 'auto',
      marginRight: 100,
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

const HistoryGraph = () => {
  const classes = useStyles();

  const WContext = useContext(wContext);
  const { archive, units, screen, select } = WContext;

  const [forecast, setForecast] = useState<Data[]>([]);
  const [period, setPeriod] = useState<number>(14);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectPeriod = (period: number) => {
    setPeriod(period);
    handleClose();
  };

  useEffect(() => {
    if (archive.length) {
      const data = archive.map((place) => {
        const data = place.data.slice(
          place.data.length - period,
          place.data.length
        );
        let dataItem: Data = { id: place.name, data: [] };
        for (let i = 0; i < data.length; i++) {
          const item: DataItem = {
            x: moment(data[i].date).format('YYYY-MM-DD'),
            y:
              units === 'metric'
                ? Number(data[i].temp)
                : (Number(data[i].temp) * 9) / 5 + 32,
          };
          dataItem.data.push(item);
        }
        return dataItem;
      });
      setForecast(data);
    }
    // eslint-disable-next-line
  }, [archive, units, period]);

  const tickValue = () => {
    switch (period) {
      case 7:
        return 1;
      case 30:
        return 2;
      case 60:
        return 3;
      case 90:
        return 4;
      default:
        return 1;
    }
  };

  const periods = [7, 14, 30, 60, 90];

  return archive.length ? (
    <Paper
      className={classes.paper}
      style={{ height: 340 + archive.length * 10 }}
    >
      <div className={classes.title}>
        <Typography
          variant='h6'
          style={{ marginLeft: screen !== 'phone' ? 8 : 0 }}
        >
          Historical Data
        </Typography>
        <div className={classes.select}>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            variant='contained'
            size='small'
            onClick={handleClick}
          >
            {`Last ${period} days`}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {periods.map((period) => (
              <MenuItem
                key={period}
                onClick={() => selectPeriod(period)}
              >{`Last ${period} days`}</MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div className={classes.graph}>
        <ResponsiveLine
          data={forecast}
          curve='monotoneX'
          margin={{ top: 30, right: 100, bottom: 95, left: 55 }}
          xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
          xFormat='time:%Y-%m-%d'
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
            format: '%b %d',
            tickValues: `every ${tickValue()} days`,
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Date',
            legendOffset: 50,
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
          pointSize={10 / (tickValue() === 1 ? 1 : tickValue() / 1.5)}
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
    </Paper>
  ) : null;
};

export default HistoryGraph;