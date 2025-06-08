import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';
import { Lock } from 'lucide-react';

const ParentsArea: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { user, updateUser } = useUser();
  const { 
    totalPoints, 
    achievements, 
    gameProgress, 
    storyProgress,
    addPoints
  } = useProgress();
  
  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Senha simples para demonstração
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Por favor, tente novamente.');
    }
  };
  
  const resetProgress = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      window.location.reload();
    }
  };
  
  const updateChildName = (name: string) => {
    updateUser({ name });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Lock className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h1 className="title-large text-gray-700 mb-6">Área dos Responsáveis</h1>
          <p className="text-gray-600 mb-6">
            Esta área é exclusiva para os pais ou responsáveis. Por favor, digite a senha para acessar.
          </p>
          
          <form onSubmit={handleAuthentication}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha (dica: 1234)"
                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>
            <button type="submit" className="btn bg-gray-600 hover:bg-gray-700 w-full">
              Acessar
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="title-large text-gray-700 mb-6">Área dos Responsáveis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="title-medium mb-4">Informações da Criança</h2>
          
          <div className="mb-4">
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Criança
            </label>
            <div className="flex">
              <input
                type="text"
                id="childName"
                value={user.name}
                onChange={(e) => updateChildName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Pontuação Total
            </p>
            <p className="text-2xl font-bold text-blue-600">{totalPoints} pontos</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Conquistas Desbloqueadas
            </p>
            <p className="text-2xl font-bold text-green-600">
              {achievements.filter(a => a.unlocked).length} / {achievements.length}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="title-medium mb-4">Relatório de Atividades</h2>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Histórias Lidas
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {Object.keys(storyProgress).length}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Jogos Completados
            </p>
            <p className="text-2xl font-bold text-green-600">
              {gameProgress.alphabetGame.completed + 
               gameProgress.memoryGame.completed + 
               gameProgress.wordSearchGame.completed + 
               gameProgress.quizGame.completed}
            </p>
          </div>
          
          <div>
            <button 
              onClick={resetProgress}
              className="btn bg-red-500 hover:bg-red-600"
            >
              Resetar Todo o Progresso
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="title-medium mb-4">Desempenho nos Jogos</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-700 mb-1">Jogo do Alfabeto</h3>
            <p className="text-sm text-gray-600 mb-2">Completados: {gameProgress.alphabetGame.completed}</p>
            <p className="text-sm text-gray-600">Maior pontuação: {gameProgress.alphabetGame.highScore}</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-1">Jogo da Memória</h3>
            <p className="text-sm text-gray-600 mb-2">Completados: {gameProgress.memoryGame.completed}</p>
            <p className="text-sm text-gray-600">Maior pontuação: {gameProgress.memoryGame.highScore}</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-700 mb-1">Caça-palavras</h3>
            <p className="text-sm text-gray-600 mb-2">Completados: {gameProgress.wordSearchGame.completed}</p>
            <p className="text-sm text-gray-600">Maior pontuação: {gameProgress.wordSearchGame.highScore}</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-1">Quiz das Histórias</h3>
            <p className="text-sm text-gray-600 mb-2">Completados: {gameProgress.quizGame.completed}</p>
            <p className="text-sm text-gray-600">Maior pontuação: {gameProgress.quizGame.highScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsArea;