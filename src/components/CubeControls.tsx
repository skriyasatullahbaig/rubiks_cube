import React from 'react';
import { CubeMove } from '../types/cube';
import { RotateCcw, RotateCw, Shuffle, Play, Pause, SkipForward } from 'lucide-react';

interface CubeControlsProps {
  onMove: (move: CubeMove) => void;
  onScramble: () => void;
  onSolve: () => void;
  onReset: () => void;
  isAnimating: boolean;
  isSolved: boolean;
}

const CubeControls: React.FC<CubeControlsProps> = ({
  onMove,
  onScramble,
  onSolve,
  onReset,
  isAnimating,
  isSolved
}) => {
  const moves = [
    { move: CubeMove.U, label: 'U' },
    { move: CubeMove.UP, label: "U'" },
    { move: CubeMove.D, label: 'D' },
    { move: CubeMove.DP, label: "D'" },
    { move: CubeMove.R, label: 'R' },
    { move: CubeMove.RP, label: "R'" },
    { move: CubeMove.L, label: 'L' },
    { move: CubeMove.LP, label: "L'" },
    { move: CubeMove.F, label: 'F' },
    { move: CubeMove.FP, label: "F'" },
    { move: CubeMove.B, label: 'B' },
    { move: CubeMove.BP, label: "B'" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onScramble}
          disabled={isAnimating}
          className="
            flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600
            text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
            transform hover:scale-105 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          "
        >
          <Shuffle className="w-5 h-5" />
          Scramble
        </button>

        <button
          onClick={onSolve}
          disabled={isAnimating || isSolved}
          className="
            flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600
            text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
            transform hover:scale-105 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          "
        >
          {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isAnimating ? 'Solving...' : 'Solve'}
        </button>

        <button
          onClick={onReset}
          disabled={isAnimating}
          className="
            flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600
            text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
            transform hover:scale-105 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          "
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Manual Move Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Manual Controls
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {moves.map(({ move, label }) => (
            <button
              key={move}
              onClick={() => onMove(move)}
              disabled={isAnimating}
              className="
                px-3 py-2 bg-white border-2 border-gray-300 rounded-lg
                font-mono font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-300
                transform hover:scale-105 transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                shadow-sm hover:shadow-md
              "
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p className="mb-1">
            <strong>Notation:</strong> U=Up, D=Down, R=Right, L=Left, F=Front, B=Back
          </p>
          <p>
            <strong>' (prime)</strong> = Counter-clockwise rotation
          </p>
        </div>
      </div>
    </div>
  );
};

export default CubeControls;