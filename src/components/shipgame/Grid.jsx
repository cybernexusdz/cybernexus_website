import React from "react";
import "./Grid.css";

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
        // Ship is hit but not sunk - show fire (handled by emoji)
        style.backgroundColor = "#000000"; // Black background
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
    const classes = ["grid-cell"];

    if (attack) {
      classes.push(attack.hit ? "hit" : "miss");
    }

    // For player grid, mark ship positions
    if (type === "player" && ship) {
      classes.push("ship");
      if (ship.sunk) {
        classes.push("sunk");
      }
      // Add class for hit but not sunk
      if (attack && attack.hit && !ship.sunk) {
        classes.push("ship-hit");
      }
    }

    // For bot grid: mark ship positions only when fully sunk
    if (type === "bot" && ship) {
      if (ship.sunk) {
        classes.push("ship");
        classes.push("sunk");
      }
      // Ships remain hidden until fully sunk
    }

    if (disabled && type === "bot") {
      classes.push("disabled");
    }

    return classes.join(" ");
  };

  return (
    <div className="grid-container">
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
              style={{
                ...cellStyle,
                cursor: disabled || type === "player" ? "default" : "pointer",
                opacity: disabled && type === "bot" ? 0.7 : 1,
              }}
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
