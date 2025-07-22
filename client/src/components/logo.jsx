import React from 'react';
import logo from '/assets/react.svg'; // correct import

function Logo() {
  return (
    <div className="flex flex-col items-center w-[537px]">
      <img src={logo} className="logo internsync-logo" alt="Internsync logo" />
      <img src={logo} className="logo react-logo" alt="React logo" />
    </div>
  );
}

export default Logo;
