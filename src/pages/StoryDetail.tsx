import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import stories, { StoryScene } from '../data/stories';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';
import { HomeIcon } from 'lucide-react';

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, updateCharacterName } = useUser();
  const { storyProgress, updateStoryProgress, unlockAchievement, addPoints } = useProgress();
  
  const story = stories.find(s => s.id === id);
  
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null);
  const [characterName, setCharacterName] = useState(user.characterName);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  
  useEffect(() => {
    if (!story) {
      navigate('/historias');
      return;
    }
    
    // Se é a primeira vez que abre a história, mostra tela de personalização
    const progress = storyProgress[story.id];
    if (!progress) {
      setIsCustomizing(true);
    } else {
      setIsStoryStarted(true);
      // Carrega a última cena ou a cena inicial
      const initialSceneId = progress.choices && progress.choices.length > 0 
        ? progress.choices[progress.choices.length - 1] 
        : story.initialScene;
        
      const initialScene = story.scenes.find(s => s.id === initialSceneId);
      if (initialScene) {
        setCurrentScene(initialScene);
      }
    }
  }, [story, id, navigate, storyProgress]);
  
  if (!story) {
    return (
      <div className="text-center py-8">
        <p>História não encontrada.</p>
      </div>
    );
  }
  
  const startStory = () => {
    if (characterName.trim() === '') {
      alert('Por favor, digite um nome para o personagem.');
      return;
    }
    
    // Atualiza o nome do personagem no contexto global
    updateCharacterName(characterName);
    
    // Atualiza o progresso da história
    updateStoryProgress(story.id, {
      read: true,
      completed: false,
      choices: [story.initialScene]
    });
    
    // Desbloqueia conquista ao ler a primeira história
    if (!Object.keys(storyProgress).length) {
      unlockAchievement('first-story');
    }
    
    // Adiciona pontos por começar uma história
    addPoints(10);
    
    // Carrega a cena inicial
    const initialScene = story.scenes.find(s => s.id === story.initialScene);
    if (initialScene) {
      setCurrentScene(initialScene);
      setIsCustomizing(false);
      setIsStoryStarted(true);
    }
  };
  
  const makeChoice = (nextSceneId: string) => {
    const nextScene = story.scenes.find(s => s.id === nextSceneId);
    if (nextScene) {
      setCurrentScene(nextScene);
      
      // Atualiza as escolhas no progresso
      const progress = storyProgress[story.id];
      const newChoices = [...(progress?.choices || []), nextSceneId];
      
      updateStoryProgress(story.id, {
        choices: newChoices,
        completed: nextScene.isEnding || false
      });
      
      // Se chegou ao final da história, adiciona pontos extras
      if (nextScene.isEnding) {
        addPoints(25);
      } else {
        // Pontos por cada escolha feita
        addPoints(5);
      }
    }
  };
  
  const formatText = (text: string): string => {
    return text.replace(/{personagem}/g, characterName);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="title-large text-purple-700">{story.title}</h1>
        <button 
          onClick={() => navigate('/historias')}
          className="btn bg-gray-500 hover:bg-gray-600 flex items-center"
        >
          <HomeIcon className="w-4 h-4 mr-2" />
          Voltar para histórias
        </button>
      </div>
      
      {isCustomizing && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="title-medium mb-4">Personalize sua história!</h2>
          <div className="mb-4">
            <label htmlFor="characterName" className="block text-sm font-medium text-gray-700 mb-1">
              Como você quer chamar o personagem principal?
            </label>
            <input
              type="text"
              id="characterName"
              value={characterName}
              onChange={e => setCharacterName(e.target.value)}
              placeholder="Digite o nome do personagem"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button 
            onClick={startStory}
            className="btn btn-purple"
          >
            Começar a aventura!
          </button>
        </div>
      )}
      
      {isStoryStarted && currentScene && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <img 
            src={currentScene.image} 
            alt="Cena da história" 
            className="w-full h-48 md:h-64 object-cover"
          />
          
          <div className="p-6">
            <p className="text-lg mb-6 leading-relaxed">
              {formatText(currentScene.text)}
            </p>
            
            {currentScene.choices && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-purple-700 mb-2">O que fazer agora?</h3>
                {currentScene.choices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => makeChoice(choice.nextScene)}
                    className="block w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition"
                  >
                    {formatText(choice.text)}
                  </button>
                ))}
              </div>
            )}
            
            {currentScene.isEnding && (
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-purple-700 mb-3">Fim da história!</p>
                <button 
                  onClick={() => navigate('/historias')}
                  className="btn btn-purple"
                >
                  Voltar para histórias
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDetail;