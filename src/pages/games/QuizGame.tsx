import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizQuestions } from '../../data/games';
import { useProgress } from '../../contexts/ProgressContext';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const QuizGame: React.FC = () => {
  const { width, height } = useWindowSize();
  const { gameProgress, updateGameProgress, unlockAchievement, addPoints } = useProgress();
  
  const [questions, setQuestions] = useState(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    // Embaralha as perguntas
    setQuestions([...quizQuestions].sort(() => Math.random() - 0.5));
  }, []);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Já selecionou uma opção
    
    setSelectedOption(optionIndex);
    
    const isAnswerCorrect = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      // Adiciona pontos
      setScore(prev => prev + 20);
    }
    
    // Avança para a próxima pergunta após um breve tempo
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        // Fim do jogo
        setGameOver(true);
        setShowConfetti(true);
        
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
        
        // Atualiza progresso
        const newCompleted = gameProgress.quizGame.completed + 1;
        const newHighScore = Math.max(gameProgress.quizGame.highScore, score + (isAnswerCorrect ? 20 : 0));
        
        updateGameProgress('quizGame', {
          completed: newCompleted,
          highScore: newHighScore
        });
        
        // Adiciona pontos ao progresso global
        addPoints(Math.floor((score + (isAnswerCorrect ? 20 : 0)) / 2));
        
        // Verifica conquistas
        if (newCompleted === 1) {
          unlockAchievement('first-game');
        }
      } else {
        // Próxima pergunta
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      }
    }, 1500);
  };
  
  const resetGame = () => {
    setQuestions([...quizQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setGameOver(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="title-large text-green-600 mb-2">Quiz das Histórias</h1>
          <p className="text-gray-600 mb-4">
            Teste seus conhecimentos sobre as histórias que você leu!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          {gameOver && (
            <button 
              onClick={resetGame}
              className="btn btn-primary"
            >
              Jogar Novamente
            </button>
          )}
          <Link to="/jogos" className="btn bg-gray-500 hover:bg-gray-600">
            Voltar
          </Link>
        </div>
      </div>
      
      {!gameOver ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between p-4 bg-green-500 text-white">
            <div>
              <span className="font-bold">Pergunta:</span> {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div>
              <span className="font-bold">Pontuação:</span> {score}
            </div>
          </div>
          
          {currentQuestion.image && (
            <div className="p-4 flex justify-center">
              <img 
                src={currentQuestion.image} 
                alt="Imagem da pergunta" 
                className="max-h-64 rounded-lg"
              />
            </div>
          )}
          
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  className={`
                    w-full text-left p-3 rounded-lg transition duration-300
                    ${selectedOption === index 
                      ? (isCorrect 
                          ? 'bg-green-100 border-green-500 border-2' 
                          : 'bg-red-100 border-red-500 border-2')
                      : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300'}
                    ${index === currentQuestion.correctAnswer && selectedOption !== null
                      ? 'bg-green-100 border-green-500 border-2'
                      : ''}
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-6 h-6 rounded-full mr-3 flex items-center justify-center
                      ${selectedOption === index 
                        ? (isCorrect 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white')
                        : 'bg-gray-300 text-white'}
                      ${index === currentQuestion.correctAnswer && selectedOption !== null
                        ? 'bg-green-500 text-white'
                        : ''}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Quiz Completo!
          </h2>
          <p className="text-lg mb-6">
            Sua pontuação final: <span className="font-bold text-green-500">{score}</span> pontos
          </p>
          <button 
            onClick={resetGame}
            className="btn btn-primary"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;