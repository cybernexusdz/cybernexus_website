import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Grid from "../components/shipgame/Grid";
import GuideModal from "../components/shipgame/GuideModal";
import {
  placeShips,
  checkHit,
  checkShipSunk,
  calculateBotAttack,
  allShipsSunk,
} from "../components/shipgame/utils/gameLogic";
import "../components/shipgame/styles/App.css";
import "../components/shipgame/Grid.css";
import "../components/shipgame/GuideModal.css";

const ShipGame = () => {
  const navigate = useNavigate();
  const [playerShips, setPlayerShips] = useState([]);
  const [botShips, setBotShips] = useState([]);
  const [playerAttacks, setPlayerAttacks] = useState({});
  const [botAttacks, setBotAttacks] = useState({});
  const [currentTurn, setCurrentTurn] = useState("player");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [botTurnInProgress, setBotTurnInProgress] = useState(false);
  const [botTargeting, setBotTargeting] = useState({});

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Handle bot turn when it's bot's turn
  useEffect(() => {
    if (currentTurn === "bot" && !gameOver && !botTurnInProgress) {
      const timer = setTimeout(() => {
        handleBotTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn, gameOver, botTurnInProgress]);

  const initializeGame = () => {
    const newPlayerShips = placeShips();
    const newBotShips = placeShips();

    setPlayerShips(newPlayerShips);
    setBotShips(newBotShips);
    setPlayerAttacks({});
    setBotAttacks({});
    setCurrentTurn("player");
    setGameOver(false);
    setWinner(null);
    setBotTargeting({});
  };

  const handlePlayerAttack = async (row, col) => {
    if (gameOver || currentTurn !== "player" || botTurnInProgress) {
      return;
    }

    const position = `${row}-${col}`;

    // Check if already attacked
    if (playerAttacks[position]) {
      return;
    }

    // Check if hit
    const { hit, shipIndex } = checkHit(botShips, position);

    // Update attack record
    const newPlayerAttacks = {
      ...playerAttacks,
      [position]: { hit, sunk_ship: null },
    };

    let sunkShip = null;
    let updatedBotShips = botShips;

    if (hit && shipIndex !== null) {
      // Add hit to ship
      updatedBotShips = botShips.map((ship, idx) => {
        if (idx === shipIndex) {
          const newHits = [...ship.hits, position];
          const isSunk = checkShipSunk({ ...ship, hits: newHits });
          return {
            ...ship,
            hits: newHits,
            sunk: isSunk,
          };
        }
        return ship;
      });

      // Check if ship was sunk
      const hitShip = updatedBotShips[shipIndex];
      if (hitShip.sunk) {
        sunkShip = hitShip;
        newPlayerAttacks[position].sunk_ship = sunkShip;
      }
    }

    setPlayerAttacks(newPlayerAttacks);
    setBotShips(updatedBotShips);

    // Check if player won
    if (allShipsSunk(updatedBotShips)) {
      setGameOver(true);
      setWinner("player");
      setCurrentTurn(null);
      setShowGameOver(true);
      return;
    }

    // Handle turn switching
    if (hit) {
      // Player gets another turn on hit
      setCurrentTurn("player");
    } else {
      // Switch to bot's turn on miss
      setCurrentTurn("bot");
    }
  };

  const handleBotTurn = useCallback(() => {
    if (gameOver || currentTurn !== "bot" || botTurnInProgress) {
      return;
    }

    setBotTurnInProgress(true);

    setTimeout(() => {
      // Calculate bot attack
      const attack = calculateBotAttack(botAttacks, botTargeting);
      const { row, col } = attack;
      const position = `${row}-${col}`;

      // Check if hit
      const { hit, shipIndex } = checkHit(playerShips, position);

      // Update attack record
      const newBotAttacks = {
        ...botAttacks,
        [position]: { hit, sunk_ship: null },
      };

      let sunkShip = null;
      let updatedPlayerShips = playerShips;
      let newBotTargeting = { ...botTargeting };

      if (hit && shipIndex !== null) {
        // Add hit to ship
        updatedPlayerShips = playerShips.map((ship, idx) => {
          if (idx === shipIndex) {
            const newHits = [...ship.hits, position];
            const isSunk = checkShipSunk({ ...ship, hits: newHits });
            return {
              ...ship,
              hits: newHits,
              sunk: isSunk,
            };
          }
          return ship;
        });

        // Update bot targeting
        newBotTargeting = {
          huntMode: true,
          lastHit: position,
        };

        // Check if ship was sunk
        const hitShip = updatedPlayerShips[shipIndex];
        if (hitShip.sunk) {
          sunkShip = hitShip;
          newBotAttacks[position].sunk_ship = sunkShip;
          // Reset hunt mode when ship is sunk
          newBotTargeting = {};
        }
      } else {
        // Miss - keep hunt mode if we were hunting
        if (newBotTargeting.huntMode) {
          // Continue hunting around last hit
        }
      }

      setBotAttacks(newBotAttacks);
      setPlayerShips(updatedPlayerShips);
      setBotTargeting(newBotTargeting);

      // Check if bot won
      if (allShipsSunk(updatedPlayerShips)) {
        setGameOver(true);
        setWinner("bot");
        setCurrentTurn(null);
        setShowGameOver(true);
        setBotTurnInProgress(false);
        return;
      }

      // Handle turn switching
      if (hit) {
        // Bot gets another turn on hit
        setCurrentTurn("bot");
      } else {
        // Switch to player's turn on miss
        setCurrentTurn("player");
      }

      setBotTurnInProgress(false);
    }, 1000);
  }, [
    gameOver,
    currentTurn,
    botTurnInProgress,
    botAttacks,
    botTargeting,
    playerShips,
  ]);

  const resetGame = () => {
    initializeGame();
    setShowGameOver(false);
  };

  const getPlayerShipsLeft = () => {
    return playerShips.filter((ship) => !ship.sunk).length;
  };

  const getBotShipsLeft = () => {
    return botShips.filter((ship) => !ship.sunk).length;
  };

  const getStatusMessage = () => {
    if (gameOver) {
      return winner === "player" ? "You won! 🎉" : "Bot won! 😢";
    }
    if (currentTurn === "player") {
      return "Your turn! Click on the bot's grid to attack.";
    }
    return "Bot's turn...";
  };

  const getStatusClass = () => {
    if (gameOver) return "game-over";
    if (currentTurn === "player") return "your-turn";
    return "bot-turn";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-navyDark to-purpleDeep py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-accent/60 backdrop-blur-sm text-base-content hover:bg-primary/30 rounded-lg transition-all border border-primary/30 hover:border-primary/50"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => setShowGuide(true)}
            className="px-4 py-2 bg-gradient-to-r from-primary to-info text-base-100 rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold"
          >
            📖 How to Play
          </button>
        </div>

        {/* Game Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
          🚢 Battleship Game
        </h1>

        {/* Game Status */}
        <div className="text-center mb-6">
          <div
            className={`inline-block px-6 py-3 rounded-lg font-semibold text-base sm:text-lg ${
              gameOver
                ? "bg-success/20 text-success border-2 border-success"
                : currentTurn === "player"
                  ? "bg-primary/20 text-primary border-2 border-primary"
                  : "bg-warning/20 text-warning border-2 border-warning"
            }`}
          >
            {getStatusMessage()}
          </div>
        </div>

        {/* Ships Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8 max-w-md mx-auto">
          <div className="bg-accent/60 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
            <div className="text-sm text-base-content/70 mb-1">Your Ships</div>
            <div className="text-2xl font-bold text-primary">
              {getPlayerShipsLeft()}
            </div>
          </div>
          <div className="bg-accent/60 backdrop-blur-sm rounded-lg p-4 border border-primary/20 text-center">
            <div className="text-sm text-base-content/70 mb-1">Bot Ships</div>
            <div className="text-2xl font-bold text-info">
              {getBotShipsLeft()}
            </div>
          </div>
        </div>

        {/* Game Boards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Bot Grid */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-base-content">
              Enemy Fleet
            </h2>
            <div className="w-full max-w-md">
              <Grid
                grid={null}
                attacks={playerAttacks}
                ships={botShips}
                type="bot"
                onCellClick={handlePlayerAttack}
                disabled={currentTurn !== "player" || gameOver}
              />
            </div>
          </div>

          {/* Player Grid */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-base-content">
              Your Fleet
            </h2>
            <div className="w-full max-w-md">
              <Grid
                grid={null}
                attacks={botAttacks}
                ships={playerShips}
                type="player"
                disabled={true}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-primary to-info text-base-100 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            New Game
          </button>
        </div>
      </div>

      {/* Game Over Modal */}
      {showGameOver && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowGameOver(false)}
        >
          <div
            className="bg-base-100 rounded-lg p-6 sm:p-8 max-w-md w-full border-2 border-primary shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              Game Over!
            </h3>
            <p className="text-center text-lg sm:text-xl mb-6">
              {getStatusMessage()}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowGameOver(false);
                  resetGame();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-info text-base-100 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Play Again
              </button>
              <button
                onClick={() => {
                  setShowGameOver(false);
                  navigate("/");
                }}
                className="flex-1 px-6 py-3 bg-base-200 text-base-content rounded-lg font-semibold hover:bg-base-300 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      <GuideModal show={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
};

export default ShipGame;

