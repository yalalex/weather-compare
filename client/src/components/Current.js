import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import wContext from '../context/wContext';
// import Moment from 'react-moment';

const Current = () => {
  const WContext = useContext(wContext);
  const { current } = WContext;

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
        paging: false,
        pageSize: 10
      }}
    />
  );
};

export default Current;
