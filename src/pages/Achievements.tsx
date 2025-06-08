import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Trophy } from 'lucide-react';

const Achievements: React.FC = () => {
  const { achievements, totalPoints } = useProgress();
  
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="title-large text-yellow-600 mb-6">Minhas Conquistas</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
            <div>
              <h2 className="title-medium">Pontuação Total</h2>
              <p className="text-2xl font-bold text-yellow-500">{totalPoints} pontos</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">Conquistas Desbloqueadas</div>
            <div className="text-2xl font-bold text-green-500">
              {unlockedAchievements.length} / {achievements.length}
            </div>
          </div>
        </div>
      </div>
      
      {unlockedAchievements.length > 0 && (
        <div className="mb-8">
          <h2 className="title-medium text-green-600 mb-4">Conquistas Desbloqueadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map(achievement => (
              <div 
                key={achievement.id} 
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500"
              >
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        Desbloqueado em: {new Date(achievement.date).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h2 className="title-medium text-gray-600 mb-4">Próximas Conquistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lockedAchievements.map(achievement => (
            <div 
              key={achievement.id} 
              className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-300 opacity-75"
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4 grayscale">{achievement.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;