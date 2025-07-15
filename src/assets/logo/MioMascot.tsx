import React from "react";
import Mascote from "./Mascote.png";

interface MioMascotProps {
	size?: "small" | "medium" | "large";
	withAnimation?: boolean;
	className?: string;
}

const MioMascot: React.FC<MioMascotProps> = ({
	size = "medium",
	withAnimation = true,
	className = "",
}) => {
	const sizeClasses = {
		small: "w-20 h-20",
		medium: "w-32 h-32",
		large: "w-48 h-48",
	};

	return (
		<div
			className={`${sizeClasses[size]} ${
				withAnimation ? "animate-bounce-slow" : ""
			} ${className}`}
		>
			<img
				src={Mascote}
				alt="Mio - Mascote do MundoMio"
				className="w-full h-full object-contain"
			/>
		</div>
	);
};

export default MioMascot;
