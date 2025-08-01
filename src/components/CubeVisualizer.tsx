import React from 'react';
import { CubeState, CubeColor, Face } from '../types/cube';

interface CubeVisualizerProps {
  cube: CubeState;
  className?: string;
}

const CubeVisualizer: React.FC<CubeVisualizerProps> = ({ cube, className = '' }) => {
  const getColorStyle = (color: CubeColor): string => {
    const colorMap: Record<CubeColor, string> = {
      [CubeColor.WHITE]: 'bg-white border-gray-300',
      [CubeColor.YELLOW]: 'bg-yellow-400 border-yellow-500',
      [CubeColor.RED]: 'bg-red-500 border-red-600',
      [CubeColor.ORANGE]: 'bg-orange-500 border-orange-600',
      [CubeColor.BLUE]: 'bg-blue-500 border-blue-600',
      [CubeColor.GREEN]: 'bg-green-500 border-green-600',
    };
    
    return colorMap[color] || 'bg-gray-400 border-gray-500';
  };

  const renderFace = (face: CubeColor[][], facePosition: string) => (
    <div className={`grid grid-cols-3 gap-1 ${facePosition}`}>
      {face.flat().map((color, index) => (
        <div
          key={index}
          className={`
            w-8 h-8 border-2 rounded-sm transition-all duration-300
            ${getColorStyle(color)}
            shadow-inner hover:scale-105
          `}
        />
      ))}
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Cube Net Layout */}
      <div className="grid grid-cols-4 grid-rows-3 gap-2 p-4">
        {/* Top Row - Back Face */}
        <div className="col-start-2">
          {renderFace(cube[Face.BACK], '')}
        </div>

        {/* Middle Row - Left, Top, Right, Bottom */}
        <div className="col-start-1">
          {renderFace(cube[Face.LEFT], '')}
        </div>
        <div className="col-start-2">
          {renderFace(cube[Face.TOP], '')}
        </div>
        <div className="col-start-3">
          {renderFace(cube[Face.RIGHT], '')}
        </div>
        <div className="col-start-4">
          {renderFace(cube[Face.BOTTOM], '')}
        </div>

        {/* Bottom Row - Front Face */}
        <div className="col-start-2">
          {renderFace(cube[Face.FRONT], '')}
        </div>
      </div>

      {/* Face Labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid grid-cols-4 grid-rows-3 gap-2 p-4 h-full">
          <div className="col-start-2 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 bg-white/80 px-2 py-1 rounded">B</span>
          </div>
          <div className="col-start-1 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 bg-white/80 px-2 py-1 rounded">L</span>
          </div>
          <div className="col-start-2 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 bg-white/80 px-2 py-1 rounded">U</span>
          </div>
          <div className="col-start-3 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 bg-white/80 px-2 py-1 rounded">R</span>
          </div>
          <div className="col-start-4 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 bg-white/80 px-2 py-1 rounded">D</span>
          </div>
          <div className="col-start-2 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 bg-white/80 px-2 py-1 rounded">F</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeVisualizer;