import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alphabetLevelWords } from '../../data/games';
import { useProgress } from '../../contexts/ProgressContext';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const AlphabetGame: React.FC = () => {
  const { width, height } = useWindowSize();
  const { gameProgress, updateGameProgress, unlockAchievement, addPoints } = useProgress();
  
  const [currentWord, setCurrentWord] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  
  // Inicializa o jogo com uma palavra
  useEffect(() => {
    loadNewWord();
  }, [currentLevel]);
  
  const loadNewWord = () => {
    // Seleciona palavras com comprimento apropriado para o nível
    const levelWords = alphabetLevelWords.filter(w => {
      if (currentLevel === 1) return w.word.length <= 3;
      if (currentLevel === 2) return w.word.length === 4;
      return w.word.length >= 5;
    });
    
    // Seleciona uma palavra aleatória
    const randomIndex = Math.floor(Math.random() * levelWords.length);
    const wordData = levelWords[randomIndex];
    
    const word = wordData.word;
    setCurrentWord(word);
    setCurrentImage(wordData.image);
    
    // Embaralha as letras
    const letters = word.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
    setSelectedLetters([]);
    setIsCorrect(false);
  };
  
  const handleLetterClick = (letter: string, index: number) => {
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    
    // Remove a letra selecionada do array de letras disponíveis
    const newShuffled = [...shuffledLetters];
    newShuffled.splice(index, 1);
    setShuffledLetters(newShuffled);
    
    // Verifica se a palavra está completa e correta
    if (newSelected.length === currentWord.length) {
      const selectedWord = newSelected.join('');
      const isWordCorrect = selectedWord === currentWord;
      
      setIsCorrect(isWordCorrect);
      
      if (isWordCorrect) {
        // Mostra confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        
        // Atualiza a pontuação
        const newScore = score + currentLevel * 10;
        setScore(newScore);
        
        // Adiciona pontos ao progresso global
        addPoints(currentLevel * 5);
        
        // Atualiza o progresso do jogo
        const newCompleted = gameProgress.alphabetGame.completed + 1;
        const highScore = Math.max(gameProgress.alphabetGame.highScore, newScore);
        
        updateGameProgress('alphabetGame', {
          completed: newCompleted,
          highScore
        });
        
        // Verifica conquistas
        if (newCompleted === 1) {
          unlockAchievement('first-game');
        }
        
        if (newCompleted >= 5) {
          unlockAchievement('master-alphabet');
        }
        
        // Prepara nova palavra após 2 segundos
        setTimeout(() => {
          loadNewWord();
        }, 2000);
      } else {
        // Se estiver errado, aguarda 1 segundo e redefine
        setTimeout(() => {
          const originalLetters = currentWord.split('');
          setShuffledLetters([...originalLetters].sort(() => Math.random() - 0.5));
          setSelectedLetters([]);
        }, 1000);
      }
    }
  };
  
  const handleClearSelection = () => {
    // Devolve as letras selecionadas para o conjunto de letras disponíveis
    const allLetters = [...shuffledLetters, ...selectedLetters];
    setShuffledLetters(allLetters.sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
  };
  
  const handleChangeLevel = (level: number) => {
    setCurrentLevel(level);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="title-large text-blue-600 mb-2">Jogo do Alfabeto</h1>
          <p className="text-gray-600 mb-4">
            Arraste as letras para formar a palavra correta!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <Link to="/jogos" className="btn bg-gray-500 hover:bg-gray-600">
            Voltar
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-bold text-gray-700">Nível:</span>
            <div className="flex space-x-2 mt-1">
              {[1, 2, 3].map(level => (
                <button
                  key={level}
                  onClick={() => handleChangeLevel(level)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentLevel === level 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <span className="font-bold text-gray-700">Pontuação:</span>
            <div className="text-2xl font-bold text-blue-600">{score}</div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center mb-6">
          <img 
            src={currentImage} 
            alt={currentWord} 
            className="w-40 h-40 object-contain mb-4"
          />
          
          <div className="flex justify-center space-x-2 h-16">
            {currentWord.split('').map((_, index) => (
              <div 
                key={index} 
                className={`w-12 h-12 border-2 ${
                  selectedLetters[index] 
                    ? (isCorrect ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100') 
                    : 'border-gray-300'
                } rounded-lg flex items-center justify-center text-2xl font-bold`}
              >
                {selectedLetters[index] || ''}
              </div>
            ))}
          </div>
        </div>
        
        {selectedLetters.length > 0 && !isCorrect && (
          <div className="flex justify-center mb-6">
            <button 
              onClick={handleClearSelection}
              className="btn bg-yellow-500 hover:bg-yellow-600"
            >
              Limpar e tentar novamente
            </button>
          </div>
        )}
        
        <div className="flex justify-center flex-wrap gap-2">
          {shuffledLetters.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(letter, index)}
              className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center text-2xl font-bold hover:bg-blue-600 transition"
              disabled={isCorrect}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabetGame;