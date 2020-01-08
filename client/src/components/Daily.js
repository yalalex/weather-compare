import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import Moment from 'react-moment';

const Daily = ({ units, convertTemp }) => {
  return (
    <Fragment>
      <MaterialTable
        title="Current Weather"
        columns={[{ title: 'City', field: 'name' }]}
        data={daily}
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

export default Daily;
