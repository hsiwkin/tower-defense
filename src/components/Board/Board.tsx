import { useEffect, useState } from "react";
import { Cell } from "../Cell";
import type { TileType } from "../../types";
import { boardData, PATH } from "./mapData";
import "./Board.css";
import { countTowersInRangeCount } from "./combat";

const TOWER_PRICE = 20;

type GameState = {
  lives: number;
  enemyIndex: number;
  enemyHp: number;
};

export const Board = () => {
  const [game, setGame] = useState<GameState>({
    lives: 3,
    enemyIndex: 0,
    enemyHp: 3,
  });
  const [towers, setTowers] = useState<Set<string>>(new Set());
  const [gold, setGold] = useState(100);

  useEffect(() => {
    if (game.lives <= 0) return;

    const id = setInterval(() => {
      setGame((g) => {
        // enemy hp
        const damage = countTowersInRangeCount(g.enemyIndex, towers);
        const hp = g.enemyHp - damage;

        if (hp <= 0) {
          setGold((prevGold) => prevGold + 10);
          return {
            ...g,
            enemyIndex: 0,
            enemyHp: 3,
          };
        }

        // enemy movement
        if (g.enemyIndex + 1 >= PATH.length) {
          return {
            ...g,
            enemyIndex: 0,
            lives: Math.max(0, g.lives - 1),
          };
        }

        return {
          ...g,
          enemyIndex: g.enemyIndex + 1,
          enemyHp: g.enemyHp - damage,
        };
      });
    }, 500);

    return () => clearInterval(id);
  }, [game.lives, towers]);

  const plantTower = (type: TileType, row: number, col: number) => {
    if (type !== "buildable") return;
    if (towers.has(`${row}-${col}`)) return;
    if (gold < TOWER_PRICE) return;

    setGold((prev) => prev - TOWER_PRICE);
    setTowers((prev) => new Set(prev).add(`${row}-${col}`));
  };

  return (
    <>
      <div className="hud">
        <span>Gold: {gold}</span>
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
                hasTower={towers.has(`${rowIndex}-${colIndex}`)}
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
