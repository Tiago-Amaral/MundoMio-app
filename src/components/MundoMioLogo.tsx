import React from 'react';
import Logo from './Globe.png';


const MundoMioLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img className="w-8 h-8 text-blue-500" src={Logo}/>
      <span className="ml-2 text-xl font-bold text-gray-800 hidden md:block">MundoMio</span>
    </div>
  );
};

export default MundoMioLogo;