import { useEffect, useState } from "react";
import { Cell } from "../Cell";
import type { TileType, GameState } from "../../types";
import { boardData, PATH } from "./mapData";
import "./Board.css";
import { tick } from "./methods/tick.method";

const TOWER_PRICE = 20;

export const Board = () => {
  const [game, setGame] = useState<GameState>({
    lives: 3,
    enemyIndex: 0,
    enemyHp: 3,
    gold: 100,
    towers: new Set(),
  });

  useEffect(() => {
    if (game.lives <= 0) return;

    const id = setInterval(() => {
      setGame((g) => tick(g));
    }, 500);

    return () => clearInterval(id);
  }, [game.lives, game.towers]);

  const plantTower = (type: TileType, row: number, col: number) => {
    const towerKey = `${row}-${col}`;
    if (type !== "buildable") return;
    if (game.towers.has(towerKey)) return;
    if (game.gold < TOWER_PRICE) return;

    setGame((prev) => {
      if (prev.gold < TOWER_PRICE) return prev;
      if (prev.towers.has(towerKey)) return prev;

      return {
        ...prev,
        gold: prev.gold - TOWER_PRICE,
        towers: new Set(prev.towers).add(towerKey),
      };
    });
  };

  return (
    <>
      <div className="hud">
        <span>Gold: {game.gold}</span>
        <span>Lives: {game.lives}</span>
        <span>Enemy HP: {game.enemyHp}</span>
        {game.lives === 0 && <span>Game Over!</span>}
      </div>
      <div className="board">
        {boardData.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((type, colIndex) => (
              <Cell
                type={type}
                key={`${rowIndex}-${colIndex}`}
                onClick={() => plantTower(type, rowIndex, colIndex)}
                hasTower={game.towers.has(`${rowIndex}-${colIndex}`)}
                hasEnemy={
                  game.lives > 0 &&
                  rowIndex === PATH[game.enemyIndex].row &&
                  colIndex === PATH[game.enemyIndex].col
                }
                enemyHp={game.enemyHp}
                enemyMaxHp={3}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
