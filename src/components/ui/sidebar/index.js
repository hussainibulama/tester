
import React from 'react';
import Nav from './nav';

import './styles.scss';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? '_show' : ''}`}>
      <Nav/>
    </div>
  );
};

export default Sidebar;