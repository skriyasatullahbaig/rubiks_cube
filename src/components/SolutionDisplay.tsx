import React from 'react';
import { SolverResult, CubeMove } from '../types/cube';
import { Clock, Target, Activity, CheckCircle, XCircle } from 'lucide-react';

interface SolutionDisplayProps {
  result: SolverResult | null;
  currentMoves: CubeMove[];
  isPlaying: boolean;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({
  result,
  currentMoves,
  isPlaying
}) => {
  if (!result) return null;

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {result.isSolved ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
        <h3 className="text-xl font-bold text-gray-800">
          {result.isSolved ? 'Solution Found!' : 'No Solution Found'}
        </h3>
      </div>

      {result.isSolved && (
        <>
          {/* Solution Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Target className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-blue-700">{result.solutionDepth}</div>
              <div className="text-sm text-blue-600">Moves</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-700">
                {formatTime(result.timeElapsed)}
              </div>
              <div className="text-sm text-green-600">Time</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <Activity className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-purple-700">
                {result.statesExplored.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">States</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <Target className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-orange-700">
                {Math.round(result.statesExplored / (result.timeElapsed / 1000)).toLocaleString()}
              </div>
              <div className="text-sm text-orange-600">States/s</div>
            </div>
          </div>

          {/* Solution Sequence */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Solution Sequence:</h4>
            <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {result.moves.map((move, index) => (
                  <span
                    key={index}
                    className={`
                      px-2 py-1 rounded font-mono text-sm border-2 transition-all duration-200
                      ${index < currentMoves.length
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : index === currentMoves.length && isPlaying
                        ? 'bg-blue-100 border-blue-300 text-blue-700 animate-pulse'
                        : 'bg-white border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Algorithm Complexity Analysis */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">Algorithm Analysis:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Algorithm:</strong> Breadth-First Search (BFS)</p>
              <p><strong>Time Complexity:</strong> O(b^d) where b=12 moves, d=depth</p>
              <p><strong>Space Complexity:</strong> O(b^d) for state storage</p>
              <p><strong>Optimality:</strong> Guaranteed optimal solution</p>
              <p><strong>Efficiency:</strong> {result.statesExplored < 1000 ? 'Excellent' : result.statesExplored < 10000 ? 'Good' : 'Fair'} - {result.statesExplored} states explored</p>
            </div>
          </div>
        </>
      )}

      {!result.isSolved && (
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-red-700">
            Could not find a solution within the search depth limit. 
            Try increasing the maximum depth or using a different algorithm.
          </p>
        </div>
      )}
    </div>
  );
};

export default SolutionDisplay;