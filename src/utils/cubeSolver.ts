import { CubeState, CubeMove, SolverResult } from '../types/cube';
import { cloneCube, isCubeSolved, getCubeHash } from './cubeState';
import { applyMove } from './cubeMoves';

/**
 * Breadth-First Search solver for Rubik's Cube
 * Uses BFS to find optimal solution with state tracking
 */
export function solveCube(initialState: CubeState, maxDepth: number = 8): SolverResult {
  const startTime = Date.now();
  
  if (isCubeSolved(initialState)) {
    return {
      moves: [],
      statesExplored: 0,
      solutionDepth: 0,
      timeElapsed: Date.now() - startTime,
      isSolved: true
    };
  }
  
  const queue: Array<{ state: CubeState; moves: CubeMove[]; depth: number }> = [];
  const visited = new Set<string>();
  const allMoves = Object.values(CubeMove);
  
  queue.push({ state: cloneCube(initialState), moves: [], depth: 0 });
  visited.add(getCubeHash(initialState));
  
  let statesExplored = 0;
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    statesExplored++;
    
    if (current.depth >= maxDepth) {
      continue;
    }
    
    for (const move of allMoves) {
      const newState = cloneCube(current.state);
      applyMove(newState, move);
      
      const stateHash = getCubeHash(newState);
      
      if (visited.has(stateHash)) {
        continue;
      }
      
      visited.add(stateHash);
      const newMoves = [...current.moves, move];
      
      if (isCubeSolved(newState)) {
        return {
          moves: newMoves,
          statesExplored,
          solutionDepth: newMoves.length,
          timeElapsed: Date.now() - startTime,
          isSolved: true
        };
      }
      
      queue.push({
        state: newState,
        moves: newMoves,
        depth: current.depth + 1
      });
    }
  }
  
  return {
    moves: [],
    statesExplored,
    solutionDepth: 0,
    timeElapsed: Date.now() - startTime,
    isSolved: false
  };
}

/**
 * Layer-by-Layer solver (simplified approach for demonstration)
 * More practical for complex scrambles
 */
export function layerByLayerSolve(cube: CubeState): SolverResult {
  const startTime = Date.now();
  const allMoves: CubeMove[] = [];
  let statesExplored = 0;
  
  // This is a simplified implementation
  // In a real solver, this would implement the full layer-by-layer algorithm
  // For now, we'll use the BFS solver with increased depth
  const result = solveCube(cube, 12);
  
  return {
    ...result,
    timeElapsed: Date.now() - startTime
  };
}

/**
 * Generates a sequence of random moves for scrambling
 */
export function generateScramble(length: number = 20): CubeMove[] {
  const moves: CubeMove[] = [];
  const allMoves = Object.values(CubeMove);
  let lastMove: CubeMove | null = null;
  
  for (let i = 0; i < length; i++) {
    let move: CubeMove;
    
    // Avoid consecutive moves on the same face
    do {
      move = allMoves[Math.floor(Math.random() * allMoves.length)];
    } while (lastMove && areSameFace(move, lastMove));
    
    moves.push(move);
    lastMove = move;
  }
  
  return moves;
}

/**
 * Checks if two moves affect the same face
 */
function areSameFace(move1: CubeMove, move2: CubeMove): boolean {
  const face1 = move1.charAt(0);
  const face2 = move2.charAt(0);
  return face1 === face2;
}

/**
 * Optimizes a move sequence by removing redundant moves
 */
export function optimizeMoveSequence(moves: CubeMove[]): CubeMove[] {
  const optimized: CubeMove[] = [];
  
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const lastMove = optimized[optimized.length - 1];
    
    if (lastMove && areSameFace(move, lastMove)) {
      // Combine consecutive moves on the same face
      const combined = combineMoves(lastMove, move);
      if (combined === null) {
        optimized.pop(); // Moves cancel out
      } else {
        optimized[optimized.length - 1] = combined;
      }
    } else {
      optimized.push(move);
    }
  }
  
  return optimized;
}

/**
 * Combines two moves on the same face
 */
function combineMoves(move1: CubeMove, move2: CubeMove): CubeMove | null {
  const face = move1.charAt(0);
  const isPrime1 = move1.includes("'");
  const isPrime2 = move2.includes("'");
  
  let total = (isPrime1 ? 3 : 1) + (isPrime2 ? 3 : 1);
  total = total % 4;
  
  switch (total) {
    case 0:
      return null; // No move needed
    case 1:
      return face as CubeMove;
    case 2:
      return `${face}2` as CubeMove; // This would need to be handled separately
    case 3:
      return `${face}'` as CubeMove;
    default:
      return null;
  }
}