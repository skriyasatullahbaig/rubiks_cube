import { CubeColor, CubeState, Face, CubeMove } from '../types/cube';

/**
 * Creates a solved cube state with standard color arrangement
 */
export function createSolvedCube(): CubeState {
  const cube: CubeState = [];
  
  // Initialize each face with its color
  const faceColors = [
    CubeColor.WHITE,  // TOP
    CubeColor.YELLOW, // BOTTOM
    CubeColor.BLUE,   // FRONT
    CubeColor.GREEN,  // BACK
    CubeColor.ORANGE, // LEFT
    CubeColor.RED     // RIGHT
  ];
  
  for (let face = 0; face < 6; face++) {
    cube[face] = [];
    for (let row = 0; row < 3; row++) {
      cube[face][row] = [];
      for (let col = 0; col < 3; col++) {
        cube[face][row][col] = faceColors[face];
      }
    }
  }
  
  return cube;
}

/**
 * Deep clones a cube state
 */
export function cloneCube(cube: CubeState): CubeState {
  return cube.map(face => 
    face.map(row => [...row])
  );
}

/**
 * Checks if the cube is in solved state
 */
export function isCubeSolved(cube: CubeState): boolean {
  const solvedCube = createSolvedCube();
  
  for (let face = 0; face < 6; face++) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (cube[face][row][col] !== solvedCube[face][row][col]) {
          return false;
        }
      }
    }
  }
  
  return true;
}

/**
 * Rotates a face 90 degrees clockwise
 */
export function rotateFaceClockwise(face: CubeColor[][]): void {
  const temp = face[0][0];
  face[0][0] = face[2][0];
  face[2][0] = face[2][2];
  face[2][2] = face[0][2];
  face[0][2] = temp;
  
  const temp2 = face[0][1];
  face[0][1] = face[1][0];
  face[1][0] = face[2][1];
  face[2][1] = face[1][2];
  face[1][2] = temp2;
}

/**
 * Rotates a face 90 degrees counter-clockwise
 */
export function rotateFaceCounterClockwise(face: CubeColor[][]): void {
  rotateFaceClockwise(face);
  rotateFaceClockwise(face);
  rotateFaceClockwise(face);
}

/**
 * Generates a hash string for the cube state for efficient comparison
 */
export function getCubeHash(cube: CubeState): string {
  return cube.flat().flat().join('');
}

/**
 * Creates a scrambled cube by applying random moves
 */
export function scrambleCube(moves: number = 20): CubeState {
  const cube = createSolvedCube();
  const allMoves = Object.values(CubeMove);
  
  for (let i = 0; i < moves; i++) {
    const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
    applyMove(cube, randomMove);
  }
  
  return cube;
}

/**
 * Applies a single move to the cube state
 * This is imported from cubeMoves.ts to avoid circular dependency
 */
export function applyMove(cube: CubeState, move: CubeMove): void {
  // This will be implemented in cubeMoves.ts and imported here
  // For now, this is a placeholder
}