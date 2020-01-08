import { useState } from 'react';

const useSwitchUnits = un => {
  const [units, setUnits] = useState(un);
  const switchTemp = () => {
    units === 'metric' ? setUnits('imperial') : setUnits('metric');
  };
  const convertTemp = temp => {
    return units === 'metric' ? temp : (temp * 9) / 5 + 32;
  };
  return [units, { switchTemp, convertTemp }];
};

export default useSwitchUnits;
