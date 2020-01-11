import React from 'react';

const Header = ({ units, switchTemp }) => {
  return (
    <nav className='blue darken-4'>
      <div className='right'>
        <div
          className='switch'
          style={{ marginLeft: '1rem', marginRight: '1rem' }}
        >
          <span className={units === 'metric' ? 'white-text' : 'grey-text'}>
            °C
          </span>
          <label style={{ cursor: 'default' }}>
            <input type='checkbox' />
            <span
              onClick={switchTemp}
              className='lever'
              style={{ cursor: 'pointer' }}
            ></span>
          </label>
          <span className={units === 'imperial' ? 'white-text' : 'grey-text'}>
            °F
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
