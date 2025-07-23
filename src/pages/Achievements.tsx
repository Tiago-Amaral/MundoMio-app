import React, { useState, useMemo } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import {
  Trophy,
  ArrowLeft,
  Medal,
  Star,
  Zap,
  Crown
} from 'lucide-react';

const Achievements: React.FC = () => {
  // Estado para controlar o filtro ativo
  const [filter, setFilter] = useState<'todas' | 'conquistadas' | 'pendentes'>('todas');
  
  // Dados do contexto original
  const { achievements, totalPoints } = useProgress();

  // Dados de placeholder para o layout
  const nivel = 1;
  const pontosProximoNivel = 250;
  const pontosParaNivel = pontosProximoNivel - totalPoints > 0 ? pontosProximoNivel - totalPoints : 0;
  const progressoNivelPercentual = Math.min((totalPoints / pontosProximoNivel) * 100, 100);

  // Lógica para filtrar as conquistas com base no estado do filtro
  const filteredAchievements = useMemo(() => {
    if (filter === 'conquistadas') {
      return achievements.filter(a => a.unlocked);
    }
    if (filter === 'pendentes') {
      return achievements.filter(a => !a.unlocked);
    }
    return achievements;
  }, [achievements, filter]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    // MODIFICADO: Fundo agora é branco (#ffffff)
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto p-6">
        {/* Header da Página */}
        <div className="flex items-center mb-8">
          <button className="mr-4 text-gray-700 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">Suas Conquistas</h1>
            <p className="text-xl text-gray-600">Veja todo seu progresso e medalhas conquistadas!</p>
          </div>
        </div>

        {/* Estatísticas Gerais com a paleta de cores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl shadow-lg text-center text-blue-900" style={{ backgroundColor: '#c9e0fe' }}>
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm opacity-90 font-semibold">Pontos Totais</div>
          </div>
          <div className="p-6 rounded-xl shadow-lg text-center text-green-900" style={{ backgroundColor: '#cbf9db' }}>
            <Medal className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{unlockedCount}</div>
            <div className="text-sm opacity-90 font-semibold">Conquistas</div>
          </div>
          <div className="p-6 rounded-xl shadow-lg text-center text-orange-900" style={{ backgroundColor: '#ffe1be' }}>
            <Star className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">Nível {nivel}</div>
            <div className="text-sm opacity-90 font-semibold">Atual</div>
          </div>
          <div className="p-6 rounded-xl shadow-lg text-center text-purple-900" style={{ backgroundColor: '#ecdaff' }}>
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{pontosParaNivel}</div>
            <div className="text-sm opacity-90 font-semibold">Para Nível</div>
          </div>
        </div>

        {/* Progresso do Nível */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Crown className="w-5 h-5 mr-2 text-orange-500" />
            Progresso do Nível
          </h3>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600">Nível {nivel}</span>
            <span className="font-semibold text-gray-800">{totalPoints} / {pontosProximoNivel} pontos</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gray-800 h-3 rounded-full" style={{ width: `${progressoNivelPercentual}%` }}></div>
          </div>
        </div>
        
        {/* Botões de Filtro */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setFilter('todas')}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${filter === 'todas' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Todas
          </button>
          <button 
            onClick={() => setFilter('conquistadas')}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${filter === 'conquistadas' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Conquistadas
          </button>
          <button 
            onClick={() => setFilter('pendentes')}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${filter === 'pendentes' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Pendentes
          </button>
        </div>

        {/* Grid de Conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <div
              key={achievement.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-200 ${!achievement.unlocked ? 'opacity-70' : 'hover:scale-105'}`}
            >
              <div 
                className={`h-24 flex items-center justify-center relative`}
                style={{
                  background: achievement.unlocked 
                    ? 'linear-gradient(to right, #cbf9db, #c9e0fe)' 
                    : 'linear-gradient(to right, #e2e8f0, #d1d5db)'
                }}
              >
                <div className={`text-5xl ${achievement.unlocked ? '' : 'grayscale'}`}>{achievement.icon}</div>
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2 bg-white/30 text-green-900 rounded-full h-6 w-6 flex items-center justify-center text-xs border border-white/50">
                    ✓
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mt-1 h-10">{achievement.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm font-semibold text-orange-600">
                    <Star className="w-4 h-4 mr-1"/>
                    {achievement.points} pontos
                  </div>
                  {achievement.unlocked && achievement.date && (
                    <div className="text-xs text-gray-400">
                      {new Date(achievement.date).toLocaleDateString("pt-BR")}
                    </div>
                  )}
                </div>
                {achievement.unlocked && (
                   <div className="mt-4 text-center w-full text-green-900 text-sm font-semibold py-2 rounded-md" style={{backgroundColor: '#cbf9db'}}>
                      Conquistada!
                   </div>
                )}
                 {!achievement.unlocked && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Progresso</span>
                            <span className="text-sm font-medium text-gray-800">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                           <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Achievements;