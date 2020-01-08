import React, { Fragment } from 'react';
import MaterialTable from 'material-table';

const Current = ({ units, convertTemp }) => {
  return (
    <Fragment>
      <MaterialTable
        title="Current Weather"
        columns={[
          { title: 'City', field: 'name' },
          { title: 'Local Time', field: 'time' },
          { title: 'Conditions', field: 'conditions' },
          { title: 'Temperature', field: 'temp' },
          { title: 'Humidity', field: 'humidity' },
          { title: 'Wind', field: 'wind' }
        ]}
        data={current}
        options={{
          search: false,
          sorting: false,
          draggable: false,
          pageSize: rows
        }}
        detailPanel={rowData => {
          return <iframe width="100%" height="315" src="" frameborder="0" />;
        }}
      />
    </Fragment>
  );
};

export default Current;
