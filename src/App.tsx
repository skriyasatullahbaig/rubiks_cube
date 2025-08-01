import React, { useState, useCallback, useEffect } from 'react';
import { CubeState, CubeMove, SolverResult } from './types/cube';
import { createSolvedCube, scrambleCube, isCubeSolved, cloneCube } from './utils/cubeState';
import { applyMove, generateScramble } from './utils/cubeMoves';
import { solveCube } from './utils/cubeSolver';
import CubeVisualizer from './components/CubeVisualizer';
import CubeControls from './components/CubeControls';
import SolutionDisplay from './components/SolutionDisplay';
import { Cuboid as Cube, Brain, Zap } from 'lucide-react';

function App() {
  const [cube, setCube] = useState<CubeState>(() => createSolvedCube());
  const [solverResult, setSolverResult] = useState<SolverResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [executedMoves, setExecutedMoves] = useState<CubeMove[]>([]);

  const handleMove = useCallback((move: CubeMove) => {
    setCube(prevCube => {
      const newCube = cloneCube(prevCube);
      applyMove(newCube, move);
      return newCube;
    });
    setSolverResult(null);
  }, []);

  const handleScramble = useCallback(() => {
    if (isAnimating) return;
    
    const scrambledCube = scrambleCube(20);
    setCube(scrambledCube);
    setSolverResult(null);
    setExecutedMoves([]);
  }, [isAnimating]);

  const handleSolve = useCallback(async () => {
    if (isAnimating || isCubeSolved(cube)) return;

    setIsAnimating(true);
    setSolverResult(null);
    setCurrentMoveIndex(0);
    setExecutedMoves([]);

    // Solve the cube
    const result = await new Promise<SolverResult>((resolve) => {
      setTimeout(() => {
        resolve(solveCube(cube, 8));
      }, 100);
    });

    setSolverResult(result);

    if (result.isSolved && result.moves.length > 0) {
      // Animate the solution
      let moveIndex = 0;
      const animateMoves = () => {
        if (moveIndex < result.moves.length) {
          const move = result.moves[moveIndex];
          
          setCube(prevCube => {
            const newCube = cloneCube(prevCube);
            applyMove(newCube, move);
            return newCube;
          });
          
          setExecutedMoves(prev => [...prev, move]);
          setCurrentMoveIndex(moveIndex + 1);
          moveIndex++;
          
          setTimeout(animateMoves, 800);
        } else {
          setIsAnimating(false);
        }
      };
      
      setTimeout(animateMoves, 500);
    } else {
      setIsAnimating(false);
    }
  }, [cube, isAnimating]);

  const handleReset = useCallback(() => {
    if (isAnimating) return;
    
    setCube(createSolvedCube());
    setSolverResult(null);
    setExecutedMoves([]);
    setCurrentMoveIndex(0);
  }, [isAnimating]);

  const isSolved = isCubeSolved(cube);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/80 rounded-full shadow-lg">
              <Cube className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Rubik's Cube Solver
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced 3x3 Rubik's Cube solver using BFS algorithm with real-time visualization 
            and comprehensive performance analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Cube Visualization */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Cube State
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isSolved 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {isSolved ? '✓ Solved' : '◦ Scrambled'}
                </div>
              </div>
              
              <CubeVisualizer cube={cube} className="flex justify-center" />
            </div>

            <CubeControls
              onMove={handleMove}
              onScramble={handleScramble}
              onSolve={handleSolve}
              onReset={handleReset}
              isAnimating={isAnimating}
              isSolved={isSolved}
            />
          </div>

          {/* Right Column - Solution and Analysis */}
          <div className="space-y-6">
            {solverResult && (
              <SolutionDisplay
                result={solverResult}
                currentMoves={executedMoves}
                isPlaying={isAnimating}
              />
            )}

            {/* Algorithm Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-800">Algorithm Features</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Breadth-First Search (BFS):</strong> Guarantees optimal solution by exploring 
                    all possible states at each depth level before proceeding deeper.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>State Tracking:</strong> Efficient hash-based duplicate detection prevents 
                    exploring the same cube state multiple times.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Move Engine:</strong> Implements all 12 standard rotations (U, U', D, D', R, R', L, L', F, F', B, B') 
                    with proper face and edge piece tracking.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Performance Metrics:</strong> Real-time analysis of states explored, 
                    solution depth, and algorithm efficiency.
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Notes */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Implementation Highlights</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• <strong>Data Structure:</strong> 6-face array representation with efficient cloning</p>
                <p>• <strong>State Space:</strong> ~4.3 × 10^19 possible configurations</p>
                <p>• <strong>Search Depth:</strong> Limited to 8 moves for demonstration (God's Number is 20)</p>
                <p>• <strong>Optimization:</strong> Move sequence optimization removes redundant rotations</p>
                <p>• <strong>Scalability:</strong> Architecture supports extension to larger cubes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React, TypeScript, and Tailwind CSS • Implements computer science algorithms for puzzle solving
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;