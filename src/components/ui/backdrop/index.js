import React from 'react';

const backdrop = ({ open, clicked }) => {
  return (
    <div className={`backdrop ${open ? '_show' : ''}`} onClick={clicked}></div>
  );
};

export default backdrop;