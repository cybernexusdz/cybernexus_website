import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "./Grid";
import GuideModal from "./GuideModal";
import Navbar from "../navbar/Navbar";
import {
  createEmptyGrid,
  placeShips,
  checkHit,
  checkShipSunk,
  calculateBotAttack,
  allShipsSunk,
} from "./utils/gameLogic";
import { Home, BookOpen, RotateCcw } from "lucide-react";

function ShipGame() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "boyLight",
  );
  const botAttackingRef = useRef(false);
  const botTargetingRef = useRef({ huntMode: false, lastHit: null });
  const botAttacksRef = useRef({});
  const botAttackTimeoutRef = useRef(null);
  
  const handleScrollComponent = (id) => {
    if (id === "Hero" || id === "Blog" || id === "Projects" || id === "Contact") {
      navigate("/");
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const [playerGrid, setPlayerGrid] = useState(createEmptyGrid());
  const [botGrid, setBotGrid] = useState(createEmptyGrid());
  const [playerShips, setPlayerShips] = useState([]);
  const [botShips, setBotShips] = useState([]);
  const [playerAttacks, setPlayerAttacks] = useState({});
  const [botAttacks, setBotAttacks] = useState({});
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [botTargeting, setBotTargeting] = useState({ huntMode: false, lastHit: null });

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Sync botAttacksRef with botAttacks state
  useEffect(() => {
    botAttacksRef.current = botAttacks;
  }, [botAttacks]);

  // Trigger bot attack when it's bot's turn
  useEffect(() => {
    if (!isPlayerTurn && !gameOver && !botAttackingRef.current) {
      const timer = setTimeout(() => {
        botAttack();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver]);

  const resetGame = () => {
    const newPlayerShips = placeShips();
    const newBotShips = placeShips();
    setPlayerShips(newPlayerShips);
    setBotShips(newBotShips);
    setPlayerGrid(createEmptyGrid());
    setBotGrid(createEmptyGrid());
    setPlayerAttacks({});
    setBotAttacks({});
    botAttacksRef.current = {};
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
    setBotTargeting({ huntMode: false, lastHit: null });
    botTargetingRef.current = { huntMode: false, lastHit: null };
    botAttackingRef.current = false;
  };

  const handlePlayerAttack = (row, col) => {
    if (!isPlayerTurn || gameOver) return;

    const position = `${row}-${col}`;
    if (playerAttacks[position]) return; // Already attacked

    const { hit, shipIndex } = checkHit(botShips, position);
    const newAttacks = { ...playerAttacks, [position]: { hit } };
    setPlayerAttacks(newAttacks);

    if (hit) {
      const updatedBotShips = [...botShips];
      // Only add hit if not already in hits array
      if (!updatedBotShips[shipIndex].hits.includes(position)) {
        updatedBotShips[shipIndex].hits.push(position);
      }
      updatedBotShips[shipIndex].sunk = checkShipSunk(updatedBotShips[shipIndex]);
      setBotShips(updatedBotShips);

      if (allShipsSunk(updatedBotShips)) {
        setGameOver(true);
        setWinner("player");
        return;
      }
      // Player gets another turn when they hit
      // Don't change isPlayerTurn, let them continue
    } else {
      // Player missed, switch to bot's turn
      setIsPlayerTurn(false);
      // useEffect will trigger botAttack
    }
  };

  const botAttack = () => {
    // Clear any pending timeout
    if (botAttackTimeoutRef.current) {
      clearTimeout(botAttackTimeoutRef.current);
      botAttackTimeoutRef.current = null;
    }
    
    if (gameOver || isPlayerTurn || botAttackingRef.current) return;
    
    botAttackingRef.current = true;

    // Use ref to get latest attacks (always up to date)
    const currentBotAttacks = botAttacksRef.current;
    
    setPlayerShips((currentPlayerShips) => {
      const attack = calculateBotAttack(currentBotAttacks, botTargetingRef.current);
      const position = `${attack.row}-${attack.col}`;

      // Check if already attacked
      if (currentBotAttacks[position]) {
        botAttackingRef.current = false;
        setIsPlayerTurn(true);
        return currentPlayerShips;
      }

      const { hit, shipIndex } = checkHit(currentPlayerShips, position);
      const newAttacks = { ...currentBotAttacks, [position]: { hit } };
      
      // Update attacks and ref immediately
      botAttacksRef.current = newAttacks;
      setBotAttacks(newAttacks);

      if (hit) {
        const updatedPlayerShips = [...currentPlayerShips];
        if (!updatedPlayerShips[shipIndex].hits.includes(position)) {
          updatedPlayerShips[shipIndex].hits.push(position);
        }
        updatedPlayerShips[shipIndex].sunk = checkShipSunk(updatedPlayerShips[shipIndex]);
        
        setPlayerShips(updatedPlayerShips);

        if (allShipsSunk(updatedPlayerShips)) {
          botAttackingRef.current = false;
          setGameOver(true);
          setWinner("bot");
          return currentPlayerShips;
        }

        // Update bot targeting
        const updatedShip = updatedPlayerShips[shipIndex];
        if (updatedShip.sunk) {
          // Ship is sunk, exit hunt mode but continue attacking (bot gets another turn)
          const newTargeting = { huntMode: false, lastHit: null };
          setBotTargeting(newTargeting);
          botTargetingRef.current = newTargeting;
          botAttackingRef.current = false;
          // Clear any existing timeout
          if (botAttackTimeoutRef.current) {
            clearTimeout(botAttackTimeoutRef.current);
          }
          botAttackTimeoutRef.current = setTimeout(() => {
            if (!isPlayerTurn && !gameOver) {
              botAttack();
            }
          }, 1000);
        } else {
          // Ship not sunk yet, stay in hunt mode and continue attacking (bot gets another turn)
          const newTargeting = {
            huntMode: true,
            lastHit: position,
          };
          setBotTargeting(newTargeting);
          botTargetingRef.current = newTargeting;
          botAttackingRef.current = false;
          // Clear any existing timeout
          if (botAttackTimeoutRef.current) {
            clearTimeout(botAttackTimeoutRef.current);
          }
          botAttackTimeoutRef.current = setTimeout(() => {
            if (!isPlayerTurn && !gameOver) {
              botAttack();
            }
          }, 1000);
        }
      } else {
        // Bot missed - stop completely, exit hunt mode, and give turn to player
        // Clear any pending attack timeouts
        if (botAttackTimeoutRef.current) {
          clearTimeout(botAttackTimeoutRef.current);
          botAttackTimeoutRef.current = null;
        }
        const newTargeting = { huntMode: false, lastHit: null };
        setBotTargeting(newTargeting);
        botTargetingRef.current = newTargeting;
        botAttackingRef.current = false;
        setIsPlayerTurn(true);
      }
      
      return currentPlayerShips;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
      <Navbar
        theme={theme}
        setTheme={setTheme}
        handleScrollComponent={handleScrollComponent}
      />
      <div className="py-8 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-base-100 rounded-[15px] p-6 md:p-8 shadow-lg relative overflow-hidden">
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent opacity-60"></div>
          
          <h1 className="text-center text-base-content mb-5 text-[clamp(1.8em,4vw,2.5em)] font-bold">Battleship Game</h1>
          
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 border-none rounded-lg text-lg cursor-pointer transition-all font-bold bg-secondary text-secondary-content hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_hsl(var(--nf)/0.3)]"
            >
              Back to Home
            </button>
            <button
              onClick={() => setShowGuide(true)}
              className="px-6 py-3 border-none rounded-lg text-lg cursor-pointer transition-all font-bold bg-info text-info-content hover:bg-info/90 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_hsl(var(--nf)/0.3)]"
            >
              How to Play
            </button>
          </div>

          <div
            className={`text-center py-4 px-4 rounded-lg mb-5 text-[clamp(1em,2vw,1.2em)] font-normal ${
              gameOver
                ? "bg-error/20 text-error-content"
                : isPlayerTurn
                ? "bg-success/20 text-success-content"
                : "bg-warning/20 text-warning-content"
            }`}
          >
            {gameOver
              ? winner === "player"
                ? "🎉 You Won! Congratulations!"
                : "😔 Bot Won! Better luck next time!"
              : isPlayerTurn
              ? "Your turn! Click on the bot's grid to attack."
              : "🤖 Bot's Turn - Please wait..."}
          </div>

          <div className="flex gap-6 md:gap-8 justify-center items-start flex-wrap mb-5">
            <div className="flex-1 min-w-[300px] max-w-[500px] p-5 bg-base-200/30 rounded-xl border-l-2 border-error/50 shadow-md transition-all relative overflow-hidden hover:border-error/70 hover:shadow-lg">
              {/* Grid pattern background */}
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30 pointer-events-none z-0" style={{
                backgroundImage: `linear-gradient(hsl(var(--bc)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bc)/0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
              
              <div className="relative z-10">
                <div className="mb-4 text-[clamp(1em,2vw,1.1em)] text-base-content text-center">
                  <strong>Your Ships {playerShips.filter((s) => !s.sunk).length}</strong>
                </div>
                <h2 className="text-center mb-4 text-base-content text-[clamp(1.2em,2.5vw,1.5em)] py-2 px-4 rounded-lg bg-error/10 inline-block w-full">Enemy Fleet</h2>
                <Grid
                  grid={botGrid}
                  attacks={playerAttacks}
                  ships={botShips}
                  type="bot"
                  onCellClick={handlePlayerAttack}
                  disabled={!isPlayerTurn || gameOver}
                />
              </div>
            </div>

            <div className="flex-1 min-w-[300px] max-w-[500px] p-5 bg-base-200/30 rounded-xl border-l-2 border-success/50 shadow-md transition-all relative overflow-hidden hover:border-success/70 hover:shadow-lg">
              {/* Grid pattern background */}
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30 pointer-events-none z-0" style={{
                backgroundImage: `linear-gradient(hsl(var(--bc)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bc)/0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
              
              <div className="relative z-10">
                <div className="mb-4 text-[clamp(1em,2vw,1.1em)] text-base-content text-center">
                  <strong>Bot Ships {botShips.filter((s) => !s.sunk).length}</strong>
                </div>
                <h2 className="text-center mb-4 text-base-content text-[clamp(1.2em,2.5vw,1.5em)] py-2 px-4 rounded-lg bg-success/10 inline-block w-full">Your Fleet</h2>
                <Grid
                  grid={playerGrid}
                  attacks={botAttacks}
                  ships={playerShips}
                  type="player"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <GuideModal show={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}

export default ShipGame;

