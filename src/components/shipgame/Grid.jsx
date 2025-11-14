import React from "react";

const GRID_SIZE = 10;

function Grid({ grid, attacks, ships, type, onCellClick, disabled }) {
  const getShipAtPosition = (position) => {
    if (!ships) return null;
    return ships.find(
      (ship) => ship.positions && ship.positions.includes(position),
    );
  };

  const getCellContent = (row, col) => {
    const position = `${row}-${col}`;
    const attack = attacks[position];
    const ship = getShipAtPosition(position);

    // If there's an attack, show hit/miss indicator
    if (attack) {
      if (attack.hit) {
        // For player grid: if ship is sunk, don't show fire (color will show instead)
        if (type === "player" && ship && ship.sunk) {
          return "";
        }
        // For bot grid: if ship is sunk, don't show fire (color will show instead)
        if (type === "bot" && ship && ship.sunk) {
          return "";
        }
        // Show fire when hit but not sunk (for both grids)
        return "🔥"; // Fire when hit
      }
      return "💧"; // Miss
    }

    // For player grid, show ships (but they'll be black until hit)
    if (type === "player" && ship) {
      // Ships are shown via background color, not emoji
      return "";
    }

    return "";
  };

  const getCellStyle = (row, col) => {
    const position = `${row}-${col}`;
    const attack = attacks[position];
    const ship = getShipAtPosition(position);
    const style = {};

    // For player grid: show ships
    if (type === "player" && ship) {
      // Check if this position has been hit
      const isHit = attack && attack.hit;
      const isSunk = ship.sunk;

      if (isSunk) {
        // Ship is fully sunk - show ship's color
        style.backgroundColor = ship.color || "#8B0000";
      } else if (isHit) {
        // Ship is hit but not sunk - show fire background (red/orange gradient)
        style.backgroundColor = "#FF4500"; // Orange-red fire color
        style.background = "linear-gradient(135deg, #FF4500 0%, #FF6347 50%, #FF8C00 100%)";
      } else {
        // Ship not hit yet - show black
        style.backgroundColor = "#000000";
      }
    }

    // For bot grid: show ship color only when fully sunk
    if (type === "bot" && ship) {
      const isSunk = ship.sunk;

      if (isSunk) {
        // Ship is fully sunk - show ship's color
        style.backgroundColor = ship.color || "#8B0000";
      }
      // Otherwise, ships remain hidden (no background color change)
    }

    return style;
  };

  const getCellClass = (row, col) => {
    const position = `${row}-${col}`;
    const attack = attacks[position];
    const ship = getShipAtPosition(position);
    
    let baseClasses = "aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg transition-all min-w-0 select-none rounded-sm box-border m-0 border border-base-content/30";
    
    // Base cell styling
    if (type === "player" && ship) {
      // Don't add background class if ship is hit (we use inline style for fire effect)
      if (!attack?.hit) {
        baseClasses += " bg-base-content/80";
      }
    } else if (attack?.hit) {
      baseClasses += " bg-error/50";
    } else if (attack && !attack.hit) {
      baseClasses += " bg-base-content/15";
    } else {
      baseClasses += " bg-primary/15";
    }
    
    // Hover state (only for bot grid, not disabled, not hit, not miss)
    if (type === "bot" && !disabled && !attack) {
      baseClasses += " hover:bg-primary/30 hover:border-primary/50 hover:scale-105 hover:z-10 hover:relative cursor-pointer";
    } else if (disabled && type === "bot") {
      baseClasses += " cursor-not-allowed opacity-70";
    } else if (type === "player") {
      baseClasses += " cursor-default";
    } else {
      baseClasses += " cursor-pointer";
    }

    return baseClasses;
  };

  return (
    <div className="grid grid-cols-10 gap-0 w-full max-w-[400px] mx-auto p-2 bg-base-200/30 backdrop-blur-sm rounded-xl shadow-lg aspect-square transition-all">
      {Array.from({ length: GRID_SIZE }, (_, row) =>
        Array.from({ length: GRID_SIZE }, (_, col) => {
          const cellStyle = getCellStyle(row, col);
          return (
            <div
              key={`${row}-${col}`}
              className={getCellClass(row, col)}
              data-row={row}
              data-col={col}
              onClick={() =>
                !disabled && type === "bot" && onCellClick?.(row, col)
              }
              style={cellStyle}
            >
              {getCellContent(row, col)}
            </div>
          );
        }),
      )}
    </div>
  );
}

export default Grid;

