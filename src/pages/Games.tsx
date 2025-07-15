import React from "react";
import games from "../data/games";
import MioMascot from "../assets/logo/MioMascot";

const Games: React.FC = () => {
	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex flex-col md:flex-row items-center justify-between mb-8">
				<div>
					<h1 className="title-large text-green-600 mb-2">
						Jogos Divertidos
					</h1>
					<p className="text-lg mb-4">
						Divirta-se e aprenda com nossos jogos educativos!
					</p>
				</div>
				<MioMascot size="medium" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{games.map((game) => (
					<a
						key={game.id}
						href={game.path}
						className={`card card-interactive ${game.color} h-full`}
					>
						<div className="flex items-center">
							<div className="text-4xl mr-4">{game.icon}</div>
							<div>
								<h3 className="title-medium">{game.title}</h3>
								<p className="text-gray-700">
									{game.description}
								</p>
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default Games;
