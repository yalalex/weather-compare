import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import Moment from 'react-moment';

const Current = ({ units, convertTemp, current }) => {
  return (
    <MaterialTable
      title='Current Weather'
      columns={[
        { title: 'City', field: 'name' },
        { title: 'Local Time', field: 'time' },
        { title: 'Conditions', field: 'conditions' },
        { title: 'Temperature', field: 'temp' },
        { title: 'Humidity', field: 'humidity' },
        { title: 'Wind', field: 'wind.speed' }
      ]}
      data={current}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 10
      }}
      detailPanel={rowData => {
        return <iframe width='100%' height='315' src='' frameborder='0' />;
      }}
    />
  );
};

export default Current;
