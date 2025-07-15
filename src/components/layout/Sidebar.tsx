import React from "react";

import { NavLink } from "react-router-dom";

import casa from "../../assets/images/sidebar-images/casa.png";
import livro2 from "../../assets/images/sidebar-images/livro.png";
import paleta from "../../assets/images/sidebar-images/paleta.png";
import controle from "../../assets/images/sidebar-images/controle.png";
import trofeu from "../../assets/images/sidebar-images/trofeu.png";
import engrenagem from "../../assets/images/sidebar-images/engrenagem.png";

import MundoMioLogo from "../../assets/logo/MundoMioLogo";

const Sidebar: React.FC = () => {
	const isMobile = window.innerWidth < 768;

	return (
		<div
			className={`${
				isMobile ? "w-full" : "w-16 md:w-48 h-full"
			} bg-white shadow-md py-2 md:py-6 flex flex-col items-center md:items-start`}
		>
			<div className="mb-8 px-4 hidden md:block">
				<MundoMioLogo />
			</div>

			<nav className={`w-full ${isMobile ? "flex justify-around" : ""}`}>
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex items-center p-3 md:pl-6 ${
							isMobile ? "" : "mb-2"
						} ${
							isActive
								? "text-blue-600 bg-blue-50"
								: "text-gray-700 hover:bg-blue-50"
						}`
					}
				>
					<img src={casa} className="w-7 h-7 text-purple-600" />
					<span className="hidden md:block ml-3 ">Início</span>
				</NavLink>

				<NavLink
					to="/historias"
					className={({ isActive }) =>
						`flex items-center p-3 md:pl-6 ${
							isMobile ? "" : "mb-2"
						} ${
							isActive
								? "text-purple-600 bg-purple-50"
								: "text-gray-700 hover:bg-purple-50"
						}`
					}
				>
					<img src={paleta} className="w-7 h-7 text-purple-600" />
					<span className="hidden md:block ml-3">
						Histórias
						<br />
						Mágicas
					</span>
				</NavLink>

				<NavLink
					to="/desenho"
					className={({ isActive }) =>
						`flex items-center p-3 md:pl-6 ${
							isMobile ? "" : "mb-2"
						} ${
							isActive
								? "text-yellow-600 bg-yellow-50"
								: "text-gray-700 hover:bg-yellow-50"
						}`
					}
				>
					<img src={livro2} className="w-7 h-7 text-purple-600" />
					<span className="hidden md:block ml-3">
						Desenho
						<br />
						Criativo
					</span>
				</NavLink>

				<NavLink
					to="/jogos"
					className={({ isActive }) =>
						`flex items-center p-3 md:pl-6 ${
							isMobile ? "" : "mb-2"
						} ${
							isActive
								? "text-green-600 bg-green-50"
								: "text-gray-700 hover:bg-green-50"
						}`
					}
				>
					<img src={controle} className="w-8 h-6 text-purple-600" />
					<span className="hidden md:block ml-3">
						Jogos
						<br />
						Divertidos
					</span>
				</NavLink>

				<NavLink
					to="/conquistas"
					className={({ isActive }) =>
						`flex items-center p-3 md:pl-6 ${
							isMobile ? "" : "mb-2"
						} ${
							isActive
								? "text-yellow-600 bg-yellow-50"
								: "text-gray-700 hover:bg-yellow-50"
						}`
					}
				>
					<img src={trofeu} className="w-7 h-7 text-purple-600" />
					<span className="hidden md:block ml-3">Conquistas</span>
				</NavLink>

				<NavLink
					to="/responsaveis"
					className={({ isActive }) =>
						`flex items-center p-3 md:pl-6 ${
							isMobile ? "" : "mb-2"
						} ${
							isActive
								? "text-gray-600 bg-gray-50"
								: "text-gray-700 hover:bg-gray-50"
						}`
					}
				>
					<img src={engrenagem} className="w-7 h-7 text-purple-600" />
					<span className="hidden md:block ml-3">
						Espaço
						<br />
						dos responsáveis
					</span>
				</NavLink>
			</nav>
		</div>
	);
};

export default Sidebar;
