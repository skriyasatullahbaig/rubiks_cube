// Cube color enumeration matching standard Rubik's cube colors
export enum CubeColor {
  WHITE = 'W',   // Top face
  YELLOW = 'Y',  // Bottom face
  RED = 'R',     // Right face
  ORANGE = 'O',  // Left face
  BLUE = 'B',    // Front face
  GREEN = 'G'    // Back face
}

// Standard cube moves notation
export enum CubeMove {
  U = 'U',   // Top clockwise
  UP = "U'", // Top counter-clockwise
  D = 'D',   // Bottom clockwise
  DP = "D'", // Bottom counter-clockwise
  R = 'R',   // Right clockwise
  RP = "R'", // Right counter-clockwise
  L = 'L',   // Left clockwise
  LP = "L'", // Left counter-clockwise
  F = 'F',   // Front clockwise
  FP = "F'", // Front counter-clockwise
  B = 'B',   // Back clockwise
  BP = "B'"  // Back counter-clockwise
}

// Face indices for cube representation
export enum Face {
  TOP = 0,    // White
  BOTTOM = 1, // Yellow
  FRONT = 2,  // Blue
  BACK = 3,   // Green
  LEFT = 4,   // Orange
  RIGHT = 5   // Red
}

// Cube state representation - 6 faces, each 3x3
export type CubeState = CubeColor[][][];

// Move sequence for solving
export type MoveSequence = CubeMove[];

// Solver result with metrics
export interface SolverResult {
  moves: MoveSequence;
  statesExplored: number;
  solutionDepth: number;
  timeElapsed: number;
  isSolved: boolean;
}

// Position on a cube face
export interface Position {
  face: Face;
  row: number;
  col: number;
}