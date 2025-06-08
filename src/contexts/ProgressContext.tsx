import React, { createContext, useState, useContext, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface GameProgress {
  alphabetGame: {
    completed: number;
    highScore: number;
  };
  memoryGame: {
    completed: number;
    highScore: number;
  };
  wordSearchGame: {
    completed: number;
    highScore: number;
  };
  quizGame: {
    completed: number;
    highScore: number;
  };
}

interface StoryProgress {
  [storyId: string]: {
    read: boolean;
    completed: boolean;
    choices: string[];
    lastReadDate?: string;
  };
}

interface ProgressContextData {
  achievements: Achievement[];
  gameProgress: GameProgress;
  storyProgress: StoryProgress;
  totalPoints: number;
  unlockAchievement: (id: string) => void;
  updateGameProgress: (game: keyof GameProgress, data: Partial<GameProgress[keyof GameProgress]>) => void;
  updateStoryProgress: (storyId: string, data: Partial<StoryProgress[string]>) => void;
  addPoints: (points: number) => void;
}

const ProgressContext = createContext<ProgressContextData>({} as ProgressContextData);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem('@MundoMio:achievements');
    if (savedAchievements) {
      return JSON.parse(savedAchievements);
    }
    
    return [
      {
        id: 'first-story',
        title: 'Primeira História',
        description: 'Leu sua primeira história mágica',
        icon: '📖',
        unlocked: false
      },
      {
        id: 'first-game',
        title: 'Primeiro Jogo',
        description: 'Completou seu primeiro jogo educativo',
        icon: '🎮',
        unlocked: false
      },
      {
        id: 'first-drawing',
        title: 'Primeiro Desenho',
        description: 'Criou seu primeiro desenho',
        icon: '🎨',
        unlocked: false
      },
      {
        id: 'master-alphabet',
        title: 'Mestre do Alfabeto',
        description: 'Completou 5 rodadas do jogo do alfabeto',
        icon: '🔤',
        unlocked: false
      },
      {
        id: 'memory-champion',
        title: 'Campeão da Memória',
        description: 'Completou o jogo da memória sem erros',
        icon: '🧠',
        unlocked: false
      }
    ];
  });
  
  const [gameProgress, setGameProgress] = useState<GameProgress>(() => {
    const savedGameProgress = localStorage.getItem('@MundoMio:gameProgress');
    if (savedGameProgress) {
      return JSON.parse(savedGameProgress);
    }
    
    return {
      alphabetGame: {
        completed: 0,
        highScore: 0
      },
      memoryGame: {
        completed: 0,
        highScore: 0
      },
      wordSearchGame: {
        completed: 0,
        highScore: 0
      },
      quizGame: {
        completed: 0,
        highScore: 0
      }
    };
  });
  
  const [storyProgress, setStoryProgress] = useState<StoryProgress>(() => {
    const savedStoryProgress = localStorage.getItem('@MundoMio:storyProgress');
    if (savedStoryProgress) {
      return JSON.parse(savedStoryProgress);
    }
    
    return {};
  });
  
  const [totalPoints, setTotalPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('@MundoMio:totalPoints');
    if (savedPoints) {
      return JSON.parse(savedPoints);
    }
    
    return 0;
  });
  
  useEffect(() => {
    localStorage.setItem('@MundoMio:achievements', JSON.stringify(achievements));
  }, [achievements]);
  
  useEffect(() => {
    localStorage.setItem('@MundoMio:gameProgress', JSON.stringify(gameProgress));
  }, [gameProgress]);
  
  useEffect(() => {
    localStorage.setItem('@MundoMio:storyProgress', JSON.stringify(storyProgress));
  }, [storyProgress]);
  
  useEffect(() => {
    localStorage.setItem('@MundoMio:totalPoints', JSON.stringify(totalPoints));
  }, [totalPoints]);
  
  const unlockAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id && !achievement.unlocked 
          ? { ...achievement, unlocked: true, date: new Date().toISOString() } 
          : achievement
      )
    );
    
    // Adiciona pontos quando desbloqueia conquista
    addPoints(25);
  };
  
  const updateGameProgress = (
    game: keyof GameProgress, 
    data: Partial<GameProgress[keyof GameProgress]>
  ) => {
    setGameProgress(prev => ({
      ...prev,
      [game]: {
        ...prev[game],
        ...data
      }
    }));
  };
  
  const updateStoryProgress = (
    storyId: string, 
    data: Partial<StoryProgress[string]>
  ) => {
    setStoryProgress(prev => ({
      ...prev,
      [storyId]: {
        ...prev[storyId],
        ...data
      }
    }));
  };
  
  const addPoints = (points: number) => {
    setTotalPoints(prev => prev + points);
  };
  
  return (
    <ProgressContext.Provider 
      value={{ 
        achievements, 
        gameProgress, 
        storyProgress, 
        totalPoints,
        unlockAchievement, 
        updateGameProgress, 
        updateStoryProgress,
        addPoints
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);