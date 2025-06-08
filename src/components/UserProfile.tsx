import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const { totalPoints } = useProgress();
  
  return (
    <div className="flex items-center bg-white rounded-full shadow-md py-1 px-3">
      <div className="mr-3 text-right hidden md:block">
        <div className="font-bold text-gray-800">{user.name}</div>
        <div className="text-sm text-gray-600">Nível {user.level} • {totalPoints} Pontos</div>
      </div>
      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default UserProfile;