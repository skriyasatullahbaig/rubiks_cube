# 🧩 Rubik's Cube Solver Website

An interactive 3D Rubik's Cube web app that visually simulates cube moves and intelligently solves the cube using a BFS-based solver algorithm. Built with modern frontend technologies and deployed on **Vercel**.
## 🚀 Features

- 🧠 **Solving Algorithm**: Implements a Breadth-First Search (BFS) algorithm with a max depth of 12 to solve scrambled states
- 📊 **Performance Metrics**:
  - States Explored
  - Time Taken (in seconds)
  - States per Second (efficiency)
- 🎮 **3D Cube Visualization**: Fully interactive cube UI (built with React + Three.js)
- 🔁 **Move Engine**: Supports all standard moves (`U`, `D`, `L`, `R`, `F`, `B` and their primes)
- 🔄 **Scramble Generator**: Random 20-move scrambler
- ✅ **State Tracking**: Predicts and applies cube state after each move
- 🖥️ **Deployed**: Live on [Vercel](https://rubiks-cube-hazel.vercel.app/)

- ## 🧪 How It Works

1. User scrambles the cube via random moves or manually
2. Solver is triggered and searches optimal solution path using BFS
3. Moves are shown step-by-step on the cube UI with animation
4. Performance stats are displayed below the solution

   ## 🛠️ Local Development

```bash
# Clone the repo
git clone https://github.com/skriyasatullahbaig/rubiks_cube.git
cd rubiks_cube

# Install dependencies
npm install

# Run locally
npm run dev
