import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { memoryGamePairs } from '../../data/games';
import { useProgress } from '../../contexts/ProgressContext';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface Card {
  id: number;
  type: 'word' | 'image';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const { width, height } = useWindowSize();
  const { gameProgress, updateGameProgress, unlockAchievement, addPoints } = useProgress();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // Inicializa o jogo
  useEffect(() => {
    initializeGame();
  }, []);
  
  const initializeGame = () => {
    // Cria pares de cartas (imagem e palavra)
    const gamePairs = memoryGamePairs.slice(0, 6); // Limita a 6 pares para não ficar muito difícil
    
    const cardPairs: Card[] = [];
    
    gamePairs.forEach((pair, index) => {
      // Carta com imagem
      cardPairs.push({
        id: index * 2,
        type: 'image',
        content: pair.image,
        isFlipped: false,
        isMatched: false
      });
      
      // Carta com palavra
      cardPairs.push({
        id: index * 2 + 1,
        type: 'word',
        content: pair.word,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Embaralha as cartas
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
    setShowConfetti(false);
  };
  
  // Verifica se há cartas correspondentes quando há duas viradas
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      // Incrementa o contador de movimentos
      setMoves(prev => prev + 1);
      
      // Verifica se as cartas formam um par
      if (isPair(firstCard, secondCard)) {
        // Marca as cartas como correspondentes
        const updatedCards = cards.map((card, index) => {
          if (index === firstIndex || index === secondIndex) {
            return { ...card, isMatched: true };
          }
          return card;
        });
        
        setCards(updatedCards);
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        // Desvira as cartas após um tempo
        setTimeout(() => {
          const updatedCards = cards.map((card, index) => {
            if (index === firstIndex || index === secondIndex) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          
          setCards(updatedCards);
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards, cards]);
  
  // Verifica se o jogo está completo
  useEffect(() => {
    const totalPairs = cards.length / 2;
    
    if (matchedPairs > 0 && matchedPairs === totalPairs) {
      setGameComplete(true);
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      // Atualiza progresso
      const newCompleted = gameProgress.memoryGame.completed + 1;
      // Pontuação baseada em movimentos (menos movimentos = mais pontos)
      const score = Math.max(100 - (moves - totalPairs) * 5, 10);
      const highScore = Math.max(gameProgress.memoryGame.highScore, score);
      
      updateGameProgress('memoryGame', {
        completed: newCompleted,
        highScore
      });
      
      // Adiciona pontos ao progresso global
      addPoints(Math.round(score / 2));
      
      // Verifica conquistas
      if (newCompleted === 1) {
        unlockAchievement('first-game');
      }
      
      if (moves === totalPairs) {
        unlockAchievement('memory-champion');
      }
    }
  }, [matchedPairs, cards.length, moves, gameProgress, updateGameProgress, unlockAchievement, addPoints]);
  
  const isPair = (card1: Card, card2: Card): boolean => {
    // Uma carta deve ser palavra e outra imagem
    if (card1.type === card2.type) return false;
    
    // Para um par válido, a imagem deve corresponder à palavra
    const pair = memoryGamePairs.find(pair => {
      if (card1.type === 'word') {
        return card1.content === pair.word && card2.content === pair.image;
      } else {
        return card1.content === pair.image && card2.content === pair.word;
      }
    });
    
    return !!pair;
  };
  
  const handleCardClick = (index: number) => {
    // Ignora cliques se já houver duas cartas viradas ou se a carta já estiver virada ou correspondida
    if (
      flippedCards.length === 2 || 
      cards[index].isFlipped || 
      cards[index].isMatched
    ) {
      return;
    }
    
    // Atualiza o estado da carta clicada
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    
    setCards(updatedCards);
    setFlippedCards([...flippedCards, index]);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="title-large text-purple-600 mb-2">Jogo da Memória</h1>
          <p className="text-gray-600 mb-4">
            Encontre os pares de imagens e palavras!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={initializeGame}
            className="btn btn-purple"
          >
            Novo Jogo
          </button>
          <Link to="/jogos" className="btn bg-gray-500 hover:bg-gray-600">
            Voltar
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-bold text-gray-700">Pares encontrados:</span>
            <div className="text-2xl font-bold text-purple-600">{matchedPairs} / {cards.length / 2}</div>
          </div>
          
          <div className="text-right">
            <span className="font-bold text-gray-700">Movimentos:</span>
            <div className="text-2xl font-bold text-purple-600">{moves}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(index)}
              className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 ${
                card.isFlipped || card.isMatched ? '' : 'hover:scale-105'
              }`}
            >
              <div className={`w-full h-full flip-card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}>
                {/* Costas da carta */}
                <div className={`flip-card-back rounded-lg flex items-center justify-center bg-purple-500 text-white text-2xl font-bold ${
                  card.isFlipped || card.isMatched ? 'hidden' : ''
                }`}>
                  ?
                </div>
                
                {/* Frente da carta */}
                <div className={`flip-card-front rounded-lg flex items-center justify-center p-2 bg-white border-2 ${
                  card.isMatched ? 'border-green-500' : 'border-purple-300'
                } ${card.isFlipped || card.isMatched ? '' : 'hidden'}`}>
                  {card.type === 'image' ? (
                    <img src={card.content} alt="Imagem do jogo" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-center text-lg md:text-xl font-bold text-purple-700">
                      {card.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {gameComplete && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-3">
              Parabéns! Você completou o jogo!
            </h2>
            <p className="text-gray-600 mb-4">
              Você encontrou todos os pares em {moves} movimentos.
            </p>
            <button 
              onClick={initializeGame}
              className="btn btn-purple"
            >
              Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;