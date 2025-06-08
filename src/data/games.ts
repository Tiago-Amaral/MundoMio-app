import bola from '../components/bola.png'
import casa from '../components/casa2.png'
import arvore from '../components/arvore.png'
import flor from '../components/flor.png'
import cachorro from '../components/cachorro.png'
import peixe from '../components/peixe.png'
import sol from '../components/sol.png'
import gato from '../components/gato2.png'
import lua from '../components/lua.png'
import rato from '../components/rato.png'
import sapo from '../components/sapo.png'
import pe from '../components/pé.png'
import mao from '../components/mão.png'
import pato from '../components/pato.png'

export interface GameData {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export interface WordPair {
  word: string;
  image: string;
}

export interface AlphabetLevelWord {
  word: string;
  image: string;
  audio?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

export interface WordSearchWord {
  word: string;
  hint: string;
}

const games: GameData[] = [
  {
    id: 'alfabeto',
    title: 'Jogo do Alfabeto',
    description: 'Aprenda a formar palavras arrastando as letras',
    icon: '🔤',
    path: '/jogos/alfabeto',
    color: 'bg-blue-100'
  },
  {
    id: 'memoria',
    title: 'Jogo da Memória',
    description: 'Combine as figuras com as palavras corretas',
    icon: '🧠',
    path: '/jogos/memoria',
    color: 'bg-purple-100'
  },
  {
    id: 'caca-palavras',
    title: 'Caça-palavras',
    description: 'Encontre palavras escondidas no quadro de letras',
    icon: '🔍',
    path: '/jogos/caca-palavras',
    color: 'bg-yellow-100'
  },
  {
    id: 'quiz',
    title: 'Quiz das Histórias',
    description: 'Teste seus conhecimentos sobre as histórias que você leu',
    icon: '❓',
    path: '/jogos/quiz',
    color: 'bg-green-100'
  }
];

export const memoryGamePairs: WordPair[] = [
  { word: 'GATO', image:(gato)},
  { word: 'CACHORRO', image: (cachorro) },
  { word: 'CASA', image: (casa) },
  { word: 'BOLA', image: (bola) },
  { word: 'ÁRVORE', image: (arvore) },
  { word: 'FLOR', image: (flor) },
  { word: 'PEIXE', image: (peixe) },
  { word: 'SOL', image: (sol) }
];

export const alphabetLevelWords: AlphabetLevelWord[] = [
  { word: 'BOLA', image: (bola) },
  { word: 'CASA', image: (casa) },
  { word: 'GATO', image: (gato) },
  { word: 'PATO', image: (pato) },
  { word: 'SOL', image: (sol) },
  { word: 'LUA', image: (lua) },
  { word: 'PÉ', image: (pe) },
  { word: 'MÃO', image: (mao) },
  { word: 'RATO', image: rato },
  { word: 'SAPO', image: (sapo) }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'Na história "A Floresta Encantada", quem ajuda o personagem principal?',
    options: ['Uma bruxinha', 'Uma fadinha chamada Lila', 'Um coelho falante', 'Um duende verde'],
    correctAnswer: 1,
    image: 'https://i.ibb.co/MZV4GDH/fada-floresta.jpg'
  },
  {
    question: 'Na história "O Mar de Estrelas", o que o personagem encontrou na praia?',
    options: ['Uma concha mágica', 'Uma garrafa com mensagem', 'Uma estrela-do-mar brilhante', 'Um barquinho pequeno'],
    correctAnswer: 2,
    image: 'https://i.ibb.co/kxfRLs1/praia-estrela.jpg'
  },
  {
    question: 'Na história "A Floresta Encantada", o que a fada perdeu?',
    options: ['Seu chapéu', 'Sua varinha mágica', 'Seu livro de feitiços', 'Seu gato de estimação'],
    correctAnswer: 1,
    image: 'https://i.ibb.co/1RX37z9/varinha-magica.jpg'
  },
  {
    question: 'Como se chama a rainha no fundo do mar?',
    options: ['Rainha das Conchas', 'Rainha dos Peixes', 'Rainha das Estrelas', 'Rainha das Algas'],
    correctAnswer: 2,
    image: 'https://i.ibb.co/Tbv4jDQ/cidade-estrelas.jpg'
  },
  {
    question: 'Qual é o nome da estrela-do-mar que fala com o personagem?',
    options: ['Marina', 'Coral', 'Pérola', 'Concha'],
    correctAnswer: 1,
    image: 'https://i.ibb.co/v4Bd59q/mergulho-estrela.jpg'
  }
];

export const wordSearchWords: WordSearchWord[] = [
  { word: 'SOL', hint: 'Brilha no céu durante o dia' },
  { word: 'GATO', hint: 'Animal de estimação que mia' },
  { word: 'BOLA', hint: 'Brinquedo redondo' },
  { word: 'CASA', hint: 'Onde moramos' },
  { word: 'FLOR', hint: 'Nasce das plantas e tem pétalas' },
  { word: 'MAR', hint: 'Água salgada, tem ondas' },
  { word: 'CÉU', hint: 'Está acima de nossas cabeças' },
  { word: 'PÉ', hint: 'Parte do corpo que usamos para andar' }
];

export default games;