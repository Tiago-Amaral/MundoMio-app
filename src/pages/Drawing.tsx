import React, { useState, useRef, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';

const Drawing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [drawings, setDrawings] = useState<string[]>(() => {
    const saved = localStorage.getItem('@MundoMio:drawings');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { unlockAchievement } = useProgress();
  
  const colors = [
    '#000000', '#FF0000', '#FFA500', '#FFFF00', 
    '#008000', '#0000FF', '#4B0082', '#EE82EE',
    '#A52A2A', '#FFC0CB', '#808080', '#FFFFFF'
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        setCtx(context);
        
        // Fundo branco para o canvas
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);
  
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }
  }, [color, brushSize, ctx]);
  
  useEffect(() => {
    localStorage.setItem('@MundoMio:drawings', JSON.stringify(drawings));
  }, [drawings]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    if (ctx && canvasRef.current) {
      ctx.beginPath();
      
      let x, y;
      
      if ('touches' in e) {
        const rect = canvasRef.current.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.nativeEvent.offsetX;
        y = e.nativeEvent.offsetY;
      }
      
      ctx.moveTo(x, y);
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    let x, y;
    
    if ('touches' in e) {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    if (ctx) {
      ctx.closePath();
    }
  };
  
  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  
  const saveDrawing = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setDrawings(prev => [...prev, dataUrl]);
      
      // Desbloquear conquista após salvar o primeiro desenho
      if (drawings.length === 0) {
        unlockAchievement('first-drawing');
      }
      
      alert('Seu desenho foi salvo!');
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="title-large text-yellow-600 mb-6">Desenho Criativo</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4 flex flex-wrap gap-3">
          {colors.map(c => (
            <button
              key={c}
              className={`w-10 h-10 rounded-full border-2 ${color === c ? 'border-black' : 'border-gray-300'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Cor ${c}`}
            />
          ))}
          
          <div className="ml-4 flex items-center">
            <label htmlFor="brush-size" className="mr-2 text-gray-700">Tamanho:</label>
            <input
              id="brush-size"
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
        
        <div className="border-2 border-gray-300 rounded-lg mb-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-[400px] touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={clearCanvas}
            className="btn bg-gray-500 hover:bg-gray-600"
          >
            Limpar
          </button>
          
          <button
            onClick={saveDrawing}
            className="btn btn-primary"
          >
            Salvar Desenho
          </button>
        </div>
      </div>
      
      {drawings.length > 0 && (
        <div className="mt-8">
          <h2 className="title-medium text-yellow-600 mb-4">Meus Desenhos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {drawings.map((drawing, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-2">
                <img
                  src={drawing}
                  alt={`Desenho ${index + 1}`}
                  className="w-full h-auto rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawing;