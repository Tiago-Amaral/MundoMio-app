import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Importação do CSS

interface ActivityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  id: string; // Alterando para 'id'
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, icon, to, id }) => {
  return (
    <Link to={to}>
      <div id={id} className="card card-interactive h-full ">
        <div className="flex items-start">
          <div className="mr-4 bg-white bg-opacity-30 p-4 h-20 rounded-xl">
            {icon}
          </div>
          <div>
            <h3 className="title-medium">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
