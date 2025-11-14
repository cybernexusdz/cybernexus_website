// Game constants
export const GRID_SIZE = 10;
export const SHIPS = [
  { size: 5, name: "Carrier", color: "#FF6B6B" }, // Red
  { size: 4, name: "Battleship", color: "#4ECDC4" }, // Teal
  { size: 4, name: "Destroyer", color: "#45B7D1" }, // Blue
  { size: 3, name: "Submarine", color: "#96CEB4" }, // Green
  { size: 3, name: "Cruiser", color: "#FFEAA7" }, // Yellow
  { size: 2, name: "Patrol Boat", color: "#DDA0DD" }, // Plum
];

// Create an empty grid
export function createEmptyGrid() {
  const grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = Array(GRID_SIZE).fill("empty");
  }
  return grid;
}

// Place ships randomly on the grid
export function placeShips() {
  const ships = [];
  const occupiedPositions = new Set();

  for (const shipConfig of SHIPS) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      const isHorizontal = Math.random() < 0.5;
      const size = shipConfig.size;

      let row, col;
      if (isHorizontal) {
        row = Math.floor(Math.random() * GRID_SIZE);
        col = Math.floor(Math.random() * (GRID_SIZE - size + 1));
      } else {
        row = Math.floor(Math.random() * (GRID_SIZE - size + 1));
        col = Math.floor(Math.random() * GRID_SIZE);
      }

      const positions = [];
      let canPlace = true;

      for (let i = 0; i < size; i++) {
        const r = isHorizontal ? row : row + i;
        const c = isHorizontal ? col + i : col;
        const pos = `${r}-${c}`;

        if (occupiedPositions.has(pos)) {
          canPlace = false;
          break;
        }

        positions.push(pos);
      }

      if (canPlace) {
        positions.forEach((pos) => occupiedPositions.add(pos));
        ships.push({
          name: shipConfig.name,
          size: size,
          positions: positions,
          hits: [],
          sunk: false,
          color: shipConfig.color,
        });
        placed = true;
      }

      attempts++;
    }
  }

  return ships;
}

// Check if a position hits a ship
export function checkHit(ships, position) {
  for (let i = 0; i < ships.length; i++) {
    if (ships[i].positions.includes(position)) {
      return { hit: true, shipIndex: i };
    }
  }
  return { hit: false, shipIndex: null };
}

// Check if a ship is sunk
export function checkShipSunk(ship) {
  return ship.hits.length === ship.size;
}

// Calculate bot's next attack (AI logic)
export function calculateBotAttack(botAttacks, botTargeting) {
  const attackedPositions = new Set(Object.keys(botAttacks));

  // Hunt mode: if we have a hit, target adjacent cells
  if (botTargeting?.huntMode && botTargeting?.lastHit) {
    const [lastRow, lastCol] = botTargeting.lastHit.split("-").map(Number);

    // Try adjacent cells
    const adjacent = [
      [lastRow - 1, lastCol],
      [lastRow + 1, lastCol],
      [lastRow, lastCol - 1],
      [lastRow, lastCol + 1],
    ];

    // Shuffle for randomness
    for (let i = adjacent.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [adjacent[i], adjacent[j]] = [adjacent[j], adjacent[i]];
    }

    for (const [r, c] of adjacent) {
      if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
        const pos = `${r}-${c}`;
        if (!attackedPositions.has(pos)) {
          return { row: r, col: c };
        }
      }
    }
  }

  // Random attack on un-attacked cells
  const availableCells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const pos = `${r}-${c}`;
      if (!attackedPositions.has(pos)) {
        availableCells.push({ row: r, col: c });
      }
    }
  }

  if (availableCells.length === 0) {
    // Fallback (shouldn't happen)
    return {
      row: Math.floor(Math.random() * GRID_SIZE),
      col: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  return availableCells[Math.floor(Math.random() * availableCells.length)];
}

// Check if all ships are sunk
export function allShipsSunk(ships) {
  return ships.every((ship) => ship.sunk);
}
