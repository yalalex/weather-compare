import { useState } from 'react';

const useSwitchUnits = un => {
  const [units, setUnits] = useState(un);
  const switchUnits = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };
  return [units, switchUnits];
};

export default useSwitchUnits;
