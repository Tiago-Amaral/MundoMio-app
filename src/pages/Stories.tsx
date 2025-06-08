import React from 'react';
import { Link } from 'react-router-dom';
import stories from '../data/stories';
import { useProgress } from '../contexts/ProgressContext';

const Stories: React.FC = () => {
  const { storyProgress } = useProgress();
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="title-large text-purple-700 mb-6">Histórias Mágicas</h1>
      <p className="text-lg mb-8">
        Embarque em aventuras incríveis e faça escolhas que mudam o destino da história!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map(story => {
          const progress = storyProgress[story.id];
          const isRead = progress?.read;
          const isCompleted = progress?.completed;
          
          return (
            <Link 
              key={story.id} 
              to={`/historias/${story.id}`}
              className="relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={story.coverImage} 
                  alt={story.title} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-xl font-bold mb-1">{story.title}</h2>
                <p className="text-sm text-white/90 mb-2">{story.description}</p>
                
                {isCompleted && (
                  <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full mr-2">
                    Completada
                  </span>
                )}
                
                {isRead && !isCompleted && (
                  <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    Lida parcialmente
                  </span>
                )}
                
                {!isRead && (
                  <span className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    Nova
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;