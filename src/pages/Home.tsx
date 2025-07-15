import React from "react";

import Pintar from "./../assets/images/home-images/pintar.png";
import Game from "./../assets/images/home-images/game.png";
import MioMascot from "../assets/logo/MioMascot";
import ActivityCard from "../components/ui/ActivityCard";
import Livro from "./../assets/images/home-images/livro.png";
import Conquistas from "./../assets/images/home-images/conquistas.png";

import { useUser } from "../contexts/UserContext";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

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
				<Link to={"/historias"}>
					<Card className="group hover:scale-105 transition-transform duration-300 cursor-pointer bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300">
						<CardContent className="p-8">
							<div className="flex items-center space-x-4">
								<div className="p-4 bg-purple-300 rounded-2xl">
									<img src={Livro} width={64} />
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">
										Histórias Mágicas
									</h3>
									<p className="text-gray-600">
										Leia e interaja com histórias incríveis
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link to="/jogos">
					<Card className="group hover:scale-105 transition-transform duration-300 cursor-pointer bg-gradient-to-br from-green-100 to-green-200 border-green-300">
						<CardContent className="p-8">
							<div className="flex items-center space-x-4">
								<div className="p-4 bg-green-300 rounded-2xl">
									<img src={Game} width={80}></img>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">
										Games
									</h3>
									<p className="text-gray-600">
										Aprenda brincando com desafios
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link to="/desenho">
					<Card className="group hover:scale-105 transition-transform duration-300 cursor-pointer bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300">
						<CardContent className="p-8">
							<div className="flex items-center space-x-4">
								<div className="p-4 bg-orange-300 rounded-2xl">
									<img src={Pintar} width={64}></img>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">
										Desenho Criativo
									</h3>
									<p className="text-gray-600">
										Deixe sua imaginação fluir com cores
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link to="/conquistas">
					<Card className="group hover:scale-105 transition-transform duration-300 cursor-pointer bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300">
						<CardContent className="p-8">
							<div className="flex items-center space-x-4">
								<div className="p-4 bg-blue-300 rounded-2xl">
									<img src={Conquistas} width={48}></img>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">
										Conquistas
									</h3>
									<p className="text-gray-600">
										Veja suas medalhas e progresso
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</Link>
			</div>
		</div>
	);
};

export default Home;
