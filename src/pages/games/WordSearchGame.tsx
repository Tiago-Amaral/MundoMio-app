import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wordSearchWords } from '../../data/games';
import { useProgress } from '../../contexts/ProgressContext';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface Position {
  row: number;
  col: number;
}

interface WordPlacement {
  word: string;
  hint: string;
  found: boolean;
  positions: Position[];
}

const GRID_SIZE = 8;

const WordSearchGame: React.FC = () => {
  const { width, height } = useWindowSize();
  const { gameProgress, updateGameProgress, unlockAchievement, addPoints } = useProgress();
  
  const [grid, setGrid] = useState<string[][]>([]);
  const [placedWords, setPlacedWords] = useState<WordPlacement[]>([]);
  const [selection, setSelection] = useState<Position[]>([]);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // Inicializa o jogo
  useEffect(() => {
    initializeGame();
  }, []);
  
  const initializeGame = () => {
    // Cria uma grade vazia
    const emptyGrid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(''));
    
    // Seleciona palavras aleatórias
    const selectedWords = [...wordSearchWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
      
    const placements: WordPlacement[] = [];
    const filledGrid = [...emptyGrid];
    
    // Tenta colocar cada palavra na grade
    selectedWords.forEach(({ word, hint }) => {
      const placement = placeWord(word, filledGrid);
      if (placement) {
        // Adiciona a palavra colocada à lista
        placements.push({
          word,
          hint,
          found: false,
          positions: placement
        });
        
        // Preenche a grade com a palavra
        placement.forEach(({ row, col }, index) => {
          filledGrid[row][col] = word[index];
        });
      }
    });
    
    // Preenche os espaços vazios com letras aleatórias
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (filledGrid[row][col] === '') {
          filledGrid[row][col] = getRandomLetter();
        }
      }
    }
    
    setGrid(filledGrid);
    setPlacedWords(placements);
    setSelection([]);
    setGameComplete(false);
    setShowConfetti(false);
  };
  
  // Verifica se o jogo está completo
  useEffect(() => {
    if (placedWords.length > 0 && placedWords.every(word => word.found)) {
      setGameComplete(true);
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      // Atualiza progresso
      const newCompleted = gameProgress.wordSearchGame.completed + 1;
      const score = placedWords.length * 20;
      const highScore = Math.max(gameProgress.wordSearchGame.highScore, score);
      
      updateGameProgress('wordSearchGame', {
        completed: newCompleted,
        highScore
      });
      
      // Adiciona pontos ao progresso global
      addPoints(score);
      
      // Verifica conquistas
      if (newCompleted === 1) {
        unlockAchievement('first-game');
      }
    }
  }, [placedWords, gameProgress, updateGameProgress, unlockAchievement, addPoints]);
  
  // Tenta colocar uma palavra na grade
  const placeWord = (word: string, grid: string[][]): Position[] | null => {
    const directions = [
      { dx: 1, dy: 0 },   // horizontal
      { dx: 0, dy: 1 },   // vertical
      { dx: 1, dy: 1 },   // diagonal para baixo
      { dx: 1, dy: -1 },  // diagonal para cima
    ];
    
    // Tenta várias vezes colocar a palavra
    for (let attempt = 0; attempt < 20; attempt++) {
      // Escolhe uma direção aleatória
      const direction = directions[Math.floor(Math.random() * directions.length)];
      
      // Calcula os limites para a posição inicial
      const maxStartRow = direction.dy >= 0 
        ? GRID_SIZE - word.length * Math.abs(direction.dy)
        : GRID_SIZE - 1;
      const maxStartCol = direction.dx >= 0 
        ? GRID_SIZE - word.length * Math.abs(direction.dx)
        : GRID_SIZE - 1;
      
      const minStartRow = direction.dy < 0 ? word.length - 1 : 0;
      const minStartCol = direction.dx < 0 ? word.length - 1 : 0;
      
      // Escolhe uma posição inicial aleatória
      const startRow = minStartRow + Math.floor(Math.random() * (maxStartRow - minStartRow + 1));
      const startCol = minStartCol + Math.floor(Math.random() * (maxStartCol - minStartCol + 1));
      
      // Verifica se a palavra cabe na posição e direção escolhidas
      let canPlace = true;
      const positions: Position[] = [];
      
      for (let i = 0; i < word.length; i++) {
        const row = startRow + i * direction.dy;
        const col = startCol + i * direction.dx;
        
        if (
          grid[row][col] !== '' && 
          grid[row][col] !== word[i]
        ) {
          canPlace = false;
          break;
        }
        
        positions.push({ row, col });
      }
      
      if (canPlace) {
        return positions;
      }
    }
    
    // Não foi possível colocar a palavra
    return null;
  };
  
  const getRandomLetter = (): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };
  
  const handleCellClick = (row: number, col: number) => {
    if (gameComplete) return;
    
    // Se não há seleção, inicia uma nova
    if (selection.length === 0) {
      setSelection([{ row, col }]);
      return;
    }
    
    // Se já clicou nesta célula, desseleciona
    if (selection.some(pos => pos.row === row && pos.col === col)) {
      setSelection([]);
      return;
    }
    
    // Verifica se a célula é adjacente à primeira célula selecionada
    const firstCell = selection[0];
    
    // Calcula a direção da seleção
    const dx = col - firstCell.col;
    const dy = row - firstCell.row;
    
    // Verifica se a seleção é em linha reta
    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) {
      // Não é uma linha reta
      setSelection([{ row, col }]);
      return;
    }
    
    // Calcula a direção normalizada
    const ndx = dx === 0 ? 0 : dx / Math.abs(dx);
    const ndy = dy === 0 ? 0 : dy / Math.abs(dy);
    
    // Calcula a distância
    const distance = Math.max(Math.abs(dx), Math.abs(dy));
    
    // Cria uma nova seleção em linha reta
    const newSelection: Position[] = [];
    for (let i = 0; i <= distance; i++) {
      newSelection.push({
        row: firstCell.row + i * ndy,
        col: firstCell.col + i * ndx
      });
    }
    
    setSelection(newSelection);
    
    // Verifica se a seleção corresponde a uma palavra
    const selectedWord = newSelection.map(pos => grid[pos.row][pos.col]).join('');
    
    const wordMatch = placedWords.findIndex(
      word => !word.found && (
        word.word === selectedWord || 
        word.word === selectedWord.split('').reverse().join('')
      )
    );
    
    if (wordMatch !== -1) {
      // Marca a palavra como encontrada
      setPlacedWords(prev => prev.map((word, index) => 
        index === wordMatch 
          ? { ...word, found: true } 
          : word
      ));
      
      // Limpa a seleção
      setTimeout(() => {
        setSelection([]);
      }, 500);
    }
  };
  
  const isSelected = (row: number, col: number): boolean => {
    return selection.some(pos => pos.row === row && pos.col === col);
  };
  
  const isFoundWord = (row: number, col: number): boolean => {
    return placedWords.some(word => 
      word.found && word.positions.some(pos => 
        pos.row === row && pos.col === col
      )
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="title-large text-yellow-600 mb-2">Caça-palavras</h1>
          <p className="text-gray-600 mb-4">
            Encontre as palavras escondidas no quadro!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            onClick={initializeGame}
            className="btn bg-yellow-500 hover:bg-yellow-600"
          >
            Novo Jogo
          </button>
          <Link to="/jogos" className="btn bg-gray-500 hover:bg-gray-600">
            Voltar
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="grid grid-cols-8 gap-1 aspect-square">
              {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      flex items-center justify-center aspect-square rounded 
                      text-xl md:text-2xl font-bold border-2 transition-colors
                      ${isSelected(rowIndex, colIndex) 
                        ? 'bg-yellow-300 border-yellow-500' 
                        : isFoundWord(rowIndex, colIndex)
                          ? 'bg-green-200 border-green-500 text-green-700' 
                          : 'bg-white border-gray-200 hover:bg-yellow-100'}
                    `}
                  >
                    {cell}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-bold text-yellow-600 mb-3">Palavras</h2>
            <div className="space-y-3">
              {placedWords.map((word, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${
                    word.found 
                      ? 'bg-green-100 border-green-300 text-green-800' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <p className={`font-bold ${word.found ? 'line-through' : ''}`}>
                    {word.hint}
                  </p>
                  {word.found && (
                    <p className="text-sm text-green-700 mt-1">
                      Palavra: {word.word}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {gameComplete && (
        <div className="mt-6 text-center bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-600 mb-3">
            Parabéns! Você encontrou todas as palavras!
          </h2>
          <button 
            onClick={initializeGame}
            className="btn bg-yellow-500 hover:bg-yellow-600"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default WordSearchGame;