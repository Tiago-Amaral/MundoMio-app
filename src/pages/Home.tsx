import React from 'react';
import Pintar from'../components/pintar.png'
import Game from "../components/game.png"
import MioMascot from '../components/MioMascot';
import ActivityCard from '../components/ActivityCard';
import Livro from '../components/livro.png';
import Conquistas from "../components/conquistas.png"
import { useUser } from '../contexts/UserContext';

const Home: React.FC = () => {
  const { user } = useUser();
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Olá, pequeno explorador!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Vamos começar a nossa aventura?
          </h2>
          <p className="text-xl text-gray-600">
            O que você gostaria de fazer hoje?
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <MioMascot size="large" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityCard
          title="Histórias Mágicas"
          description="Leia e interaja com histórias incríveis"
          icon={<img src={Livro} className="w-10 h-10 text-yellow-500"></img>}
          to="/historias"
           id="historias" /* Usando o id para Histórias */
        />
        
        <ActivityCard
          title="Jogos Divertidos"
          description="Aprenda brincando com desafios"
          icon={<img src={Game} className="w-10 h-10 text-yellow-500"></img>}
          to="/jogos"
          id="games" /* Usando o id para Jogos */
        />
        
        <ActivityCard
          title="Desenho Criativo"
          description="Deixe sua imaginação fluir com cores"
          icon={<img src={Pintar} className="w-10 h-10 text-yellow-500"></img>}
          to="/desenho"
          id="desenhos" /* Usando o id para Desenhos */

        />
        
        <ActivityCard
          title="Conquistas"
          description="Veja suas medalhas e progresso"
          icon={<img src={Conquistas} className="w-10 h-10 text-yellow-500"></img>}
          to="/conquistas"
         id="conquistas" /* Usando o id para Conquistas */
        />
      </div>
    </div>
  );
};

export default Home;
