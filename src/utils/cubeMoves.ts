import { CubeState, CubeMove, Face, CubeColor } from '../types/cube';
import { rotateFaceClockwise, rotateFaceCounterClockwise, cloneCube } from './cubeState';

/**
 * Applies a single move to the cube state
 */
export function applyMove(cube: CubeState, move: CubeMove): void {
  switch (move) {
    case CubeMove.U:
      executeU(cube);
      break;
    case CubeMove.UP:
      executeU(cube);
      executeU(cube);
      executeU(cube);
      break;
    case CubeMove.D:
      executeD(cube);
      break;
    case CubeMove.DP:
      executeD(cube);
      executeD(cube);
      executeD(cube);
      break;
    case CubeMove.R:
      executeR(cube);
      break;
    case CubeMove.RP:
      executeR(cube);
      executeR(cube);
      executeR(cube);
      break;
    case CubeMove.L:
      executeL(cube);
      break;
    case CubeMove.LP:
      executeL(cube);
      executeL(cube);
      executeL(cube);
      break;
    case CubeMove.F:
      executeF(cube);
      break;
    case CubeMove.FP:
      executeF(cube);
      executeF(cube);
      executeF(cube);
      break;
    case CubeMove.B:
      executeB(cube);
      break;
    case CubeMove.BP:
      executeB(cube);
      executeB(cube);
      executeB(cube);
      break;
  }
}

/**
 * Applies a sequence of moves to the cube
 */
export function applyMoveSequence(cube: CubeState, moves: CubeMove[]): void {
  moves.forEach(move => applyMove(cube, move));
}

/**
 * Gets the inverse of a move
 */
export function getInverseMove(move: CubeMove): CubeMove {
  const inverseMap: Record<CubeMove, CubeMove> = {
    [CubeMove.U]: CubeMove.UP,
    [CubeMove.UP]: CubeMove.U,
    [CubeMove.D]: CubeMove.DP,
    [CubeMove.DP]: CubeMove.D,
    [CubeMove.R]: CubeMove.RP,
    [CubeMove.RP]: CubeMove.R,
    [CubeMove.L]: CubeMove.LP,
    [CubeMove.LP]: CubeMove.L,
    [CubeMove.F]: CubeMove.FP,
    [CubeMove.FP]: CubeMove.F,
    [CubeMove.B]: CubeMove.BP,
    [CubeMove.BP]: CubeMove.B,
  };
  
  return inverseMap[move];
}

// Individual move implementations

function executeU(cube: CubeState): void {
  rotateFaceClockwise(cube[Face.TOP]);
  
  // Rotate top row of side faces
  const temp = [cube[Face.FRONT][0][0], cube[Face.FRONT][0][1], cube[Face.FRONT][0][2]];
  
  cube[Face.FRONT][0][0] = cube[Face.RIGHT][0][0];
  cube[Face.FRONT][0][1] = cube[Face.RIGHT][0][1];
  cube[Face.FRONT][0][2] = cube[Face.RIGHT][0][2];
  
  cube[Face.RIGHT][0][0] = cube[Face.BACK][0][0];
  cube[Face.RIGHT][0][1] = cube[Face.BACK][0][1];
  cube[Face.RIGHT][0][2] = cube[Face.BACK][0][2];
  
  cube[Face.BACK][0][0] = cube[Face.LEFT][0][0];
  cube[Face.BACK][0][1] = cube[Face.LEFT][0][1];
  cube[Face.BACK][0][2] = cube[Face.LEFT][0][2];
  
  cube[Face.LEFT][0][0] = temp[0];
  cube[Face.LEFT][0][1] = temp[1];
  cube[Face.LEFT][0][2] = temp[2];
}

function executeD(cube: CubeState): void {
  rotateFaceClockwise(cube[Face.BOTTOM]);
  
  // Rotate bottom row of side faces
  const temp = [cube[Face.FRONT][2][0], cube[Face.FRONT][2][1], cube[Face.FRONT][2][2]];
  
  cube[Face.FRONT][2][0] = cube[Face.LEFT][2][0];
  cube[Face.FRONT][2][1] = cube[Face.LEFT][2][1];
  cube[Face.FRONT][2][2] = cube[Face.LEFT][2][2];
  
  cube[Face.LEFT][2][0] = cube[Face.BACK][2][0];
  cube[Face.LEFT][2][1] = cube[Face.BACK][2][1];
  cube[Face.LEFT][2][2] = cube[Face.BACK][2][2];
  
  cube[Face.BACK][2][0] = cube[Face.RIGHT][2][0];
  cube[Face.BACK][2][1] = cube[Face.RIGHT][2][1];
  cube[Face.BACK][2][2] = cube[Face.RIGHT][2][2];
  
  cube[Face.RIGHT][2][0] = temp[0];
  cube[Face.RIGHT][2][1] = temp[1];
  cube[Face.RIGHT][2][2] = temp[2];
}

function executeR(cube: CubeState): void {
  rotateFaceClockwise(cube[Face.RIGHT]);
  
  // Rotate right column
  const temp = [cube[Face.TOP][0][2], cube[Face.TOP][1][2], cube[Face.TOP][2][2]];
  
  cube[Face.TOP][0][2] = cube[Face.FRONT][0][2];
  cube[Face.TOP][1][2] = cube[Face.FRONT][1][2];
  cube[Face.TOP][2][2] = cube[Face.FRONT][2][2];
  
  cube[Face.FRONT][0][2] = cube[Face.BOTTOM][0][2];
  cube[Face.FRONT][1][2] = cube[Face.BOTTOM][1][2];
  cube[Face.FRONT][2][2] = cube[Face.BOTTOM][2][2];
  
  cube[Face.BOTTOM][0][2] = cube[Face.BACK][2][0];
  cube[Face.BOTTOM][1][2] = cube[Face.BACK][1][0];
  cube[Face.BOTTOM][2][2] = cube[Face.BACK][0][0];
  
  cube[Face.BACK][0][0] = temp[2];
  cube[Face.BACK][1][0] = temp[1];
  cube[Face.BACK][2][0] = temp[0];
}

function executeL(cube: CubeState): void {
  rotateFaceClockwise(cube[Face.LEFT]);
  
  // Rotate left column
  const temp = [cube[Face.TOP][0][0], cube[Face.TOP][1][0], cube[Face.TOP][2][0]];
  
  cube[Face.TOP][0][0] = cube[Face.BACK][2][2];
  cube[Face.TOP][1][0] = cube[Face.BACK][1][2];
  cube[Face.TOP][2][0] = cube[Face.BACK][0][2];
  
  cube[Face.BACK][0][2] = cube[Face.BOTTOM][2][0];
  cube[Face.BACK][1][2] = cube[Face.BOTTOM][1][0];
  cube[Face.BACK][2][2] = cube[Face.BOTTOM][0][0];
  
  cube[Face.BOTTOM][0][0] = cube[Face.FRONT][0][0];
  cube[Face.BOTTOM][1][0] = cube[Face.FRONT][1][0];
  cube[Face.BOTTOM][2][0] = cube[Face.FRONT][2][0];
  
  cube[Face.FRONT][0][0] = temp[0];
  cube[Face.FRONT][1][0] = temp[1];
  cube[Face.FRONT][2][0] = temp[2];
}

function executeF(cube: CubeState): void {
  rotateFaceClockwise(cube[Face.FRONT]);
  
  // Rotate adjacent edges
  const temp = [cube[Face.TOP][2][0], cube[Face.TOP][2][1], cube[Face.TOP][2][2]];
  
  cube[Face.TOP][2][0] = cube[Face.LEFT][2][2];
  cube[Face.TOP][2][1] = cube[Face.LEFT][1][2];
  cube[Face.TOP][2][2] = cube[Face.LEFT][0][2];
  
  cube[Face.LEFT][0][2] = cube[Face.BOTTOM][0][0];
  cube[Face.LEFT][1][2] = cube[Face.BOTTOM][0][1];
  cube[Face.LEFT][2][2] = cube[Face.BOTTOM][0][2];
  
  cube[Face.BOTTOM][0][0] = cube[Face.RIGHT][0][0];
  cube[Face.BOTTOM][0][1] = cube[Face.RIGHT][1][0];
  cube[Face.BOTTOM][0][2] = cube[Face.RIGHT][2][0];
  
  cube[Face.RIGHT][0][0] = temp[2];
  cube[Face.RIGHT][1][0] = temp[1];
  cube[Face.RIGHT][2][0] = temp[0];
}

function executeB(cube: CubeState): void {
  rotateFaceClockwise(cube[Face.BACK]);
  
  // Rotate adjacent edges
  const temp = [cube[Face.TOP][0][0], cube[Face.TOP][0][1], cube[Face.TOP][0][2]];
  
  cube[Face.TOP][0][0] = cube[Face.RIGHT][0][2];
  cube[Face.TOP][0][1] = cube[Face.RIGHT][1][2];
  cube[Face.TOP][0][2] = cube[Face.RIGHT][2][2];
  
  cube[Face.RIGHT][0][2] = cube[Face.BOTTOM][2][2];
  cube[Face.RIGHT][1][2] = cube[Face.BOTTOM][2][1];
  cube[Face.RIGHT][2][2] = cube[Face.BOTTOM][2][0];
  
  cube[Face.BOTTOM][2][0] = cube[Face.LEFT][2][0];
  cube[Face.BOTTOM][2][1] = cube[Face.LEFT][1][0];
  cube[Face.BOTTOM][2][2] = cube[Face.LEFT][0][0];
  
  cube[Face.LEFT][0][0] = temp[2];
  cube[Face.LEFT][1][0] = temp[1];
  cube[Face.LEFT][2][0] = temp[0];
}