"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import {
	ArrowLeft,
	Palette,
	Eraser,
	Download,
	Trash2,
	Undo,
	Sparkles,
} from "lucide-react";

const cores = [
	"#FF6B6B",
	"#4ECDC4",
	"#45B7D1",
	"#96CEB4",
	"#FFEAA7",
	"#DDA0DD",
	"#98D8C8",
	"#F7DC6F",
	"#BB8FCE",
	"#85C1E9",
	"#F8C471",
	"#82E0AA",
	"#F1948A",
	"#85C1E9",
	"#D7BDE2",
];

export default function DesenhoPage() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [corAtual, setCorAtual] = useState("#FF6B6B");
	const [tamanho, setTamanho] = useState([5]);
	const [ferramenta, setFerramenta] = useState<"pincel" | "borracha">(
		"pincel"
	);
	const [historico, setHistorico] = useState<ImageData[]>([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				salvarEstado();
			}
		}
	}, []);

	const salvarEstado = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const imageData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				);
				setHistorico((prev) => [...prev.slice(-9), imageData]);
			}
		}
	};

	const iniciarDesenho = (e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const x = (e.clientX - rect.left) * scaleX;
				const y = (e.clientY - rect.top) * scaleY;

				ctx.lineWidth = tamanho[0];
				ctx.lineCap = "round";

				if (ferramenta === "pincel") {
					ctx.globalCompositeOperation = "source-over";
					ctx.strokeStyle = corAtual;
				} else {
					ctx.globalCompositeOperation = "destination-out";
				}

				ctx.beginPath();
				ctx.moveTo(x, y);
			}
		}
	};

	const desenhar = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const x = (e.clientX - rect.left) * scaleX;
				const y = (e.clientY - rect.top) * scaleY;

				ctx.lineWidth = tamanho[0];
				ctx.lineCap = "round";

				if (ferramenta === "pincel") {
					ctx.globalCompositeOperation = "source-over";
					ctx.strokeStyle = corAtual;
				} else {
					ctx.globalCompositeOperation = "destination-out";
				}

				ctx.lineTo(x, y);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(x, y);
			}
		}
	};

	const pararDesenho = () => {
		if (isDrawing) {
			setIsDrawing(false);
			const canvas = canvasRef.current;
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (ctx) {
					ctx.beginPath();
					salvarEstado();
				}
			}
		}
	};

	const limparCanvas = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				salvarEstado();
			}
		}
	};

	const desfazer = () => {
		if (historico.length > 1) {
			const canvas = canvasRef.current;
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (ctx) {
					const estadoAnterior = historico[historico.length - 2];
					ctx.putImageData(estadoAnterior, 0, 0);
					setHistorico((prev) => prev.slice(0, -1));
				}
			}
		}
	};

	const salvarDesenho = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const link = document.createElement("a");
			link.download = "meu-desenho.png";
			link.href = canvas.toDataURL();
			link.click();
		}
	};

	const integrarComIA = () => {
		// Aqui seria implementada a integração com IA
		alert("Seu desenho será integrado à história! 🎨✨");
	};

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<div>
						<h1 className="text-4xl font-bold text-gray-800 mb-2">
							Desenho Criativo
						</h1>
						<p className="text-xl text-gray-600">
							Solte sua imaginação e crie arte incrível!
						</p>
					</div>
				</div>

				<Button
					onClick={integrarComIA}
					className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
				>
					<Sparkles className="w-4 h-4 mr-2" />
					Integrar com História
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Ferramentas */}
				<Card className="lg:col-span-1">
					<CardHeader>
						<CardTitle className="flex items-center">
							<Palette className="w-5 h-5 mr-2" />
							Ferramentas
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Seletor de Ferramenta */}
						<div>
							<h3 className="font-medium mb-3">Ferramenta</h3>
							<div className="grid grid-cols-2 gap-2">
								<Button
									variant={
										ferramenta === "pincel"
											? "default"
											: "outline"
									}
									onClick={() => setFerramenta("pincel")}
									className="h-12"
								>
									<Palette className="w-4 h-4" />
								</Button>
								<Button
									variant={
										ferramenta === "borracha"
											? "default"
											: "outline"
									}
									onClick={() => setFerramenta("borracha")}
									className="h-12"
								>
									<Eraser className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{/* Tamanho do Pincel */}
						<div>
							<h3 className="font-medium mb-3">
								Tamanho: {tamanho[0]}px
							</h3>
							<Slider
								value={tamanho}
								onValueChange={setTamanho}
								max={50}
								min={1}
								step={1}
							/>
						</div>

						{/* Paleta de Cores */}
						<div>
							<h3 className="font-medium mb-3">Cores</h3>
							<div className="grid grid-cols-5 gap-2">
								{cores.map((cor) => (
									<button
										key={cor}
										className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
											corAtual === cor
												? "border-gray-800 scale-110"
												: "border-gray-300"
										}`}
										style={{ backgroundColor: cor }}
										onClick={() => setCorAtual(cor)}
									/>
								))}
							</div>
						</div>

						{/* Ações */}
						<div className="space-y-2">
							<Button
								onClick={desfazer}
								variant="outline"
								className="w-full"
							>
								<Undo className="w-4 h-4 mr-2" />
								Desfazer
							</Button>
							<Button
								onClick={limparCanvas}
								variant="outline"
								className="w-full"
							>
								<Trash2 className="w-4 h-4 mr-2" />
								Limpar
							</Button>
							<Button
								onClick={salvarDesenho}
								variant="outline"
								className="w-full"
							>
								<Download className="w-4 h-4 mr-2" />
								Salvar
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Canvas */}
				<Card className="lg:col-span-3">
					<CardContent className="p-6">
						<div className="bg-white rounded-lg shadow-inner p-4">
							<canvas
								ref={canvasRef}
								width={800}
								height={400}
								className="border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair w-full"
								onMouseDown={iniciarDesenho}
								onMouseMove={desenhar}
								onMouseUp={pararDesenho}
								onMouseLeave={pararDesenho}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
