
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Drawing from './pages/Drawing';
import Games from './pages/Games';
import Achievements from './pages/Achievements';
import StoryDetail from './pages/StoryDetail';
import AlphabetGame from './pages/games/AlphabetGame';
import MemoryGame from './pages/games/MemoryGame';
import WordSearchGame from './pages/games/WordSearchGame';
import QuizGame from './pages/games/QuizGame';
import ParentsArea from './pages/ParentsArea';
import { UserProvider } from './contexts/UserContext';
import { ProgressProvider } from './contexts/ProgressContext';

function App() {
  return (
    <UserProvider>
      <ProgressProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="historias" element={<Stories />} />
              <Route path="historias/:id" element={<StoryDetail />} />
              <Route path="desenho" element={<Drawing />} />
              <Route path="jogos" element={<Games />} />
              <Route path="jogos/alfabeto" element={<AlphabetGame />} />
              <Route path="jogos/memoria" element={<MemoryGame />} />
              <Route path="jogos/caca-palavras" element={<WordSearchGame />} />
              <Route path="jogos/quiz" element={<QuizGame />} />
              <Route path="conquistas" element={<Achievements />} />
              <Route path="responsaveis" element={<ParentsArea />} />
            </Route>
          </Routes>
        </Router>
      </ProgressProvider>
    </UserProvider>
  );
}

export default App;