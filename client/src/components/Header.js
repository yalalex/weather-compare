import React from 'react';

const Header = ({ units, switchTemp }) => {
  return (
    <nav id='top'>
        <ul id='nav-mobile' className='right'>
          <li>
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
          </li>
        </ul>
    </nav>
  );
};

export default Header;
