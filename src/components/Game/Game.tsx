import { Board } from "../Board/Board";
import { useEffect, useState } from "react";
import type { GameState } from "../../types";
import { tick } from "../../methods/tick.method";
import "./Game.css";
import { GameOver } from "../GameOver/GameOver";
import { plantTowerAt } from "../../methods/plant-tower.method";

const createInitialGame = (): GameState => ({
  lives: 3,
  enemies: [
    { id: "a", pathIndex: 0, hp: 3, maxHp: 3 },
    { id: "b", pathIndex: 8, hp: 3, maxHp: 3 },
  ],
  gold: 100,
  towers: new Set(),
});

export const Game = () => {
  const [game, setGame] = useState<GameState>(createInitialGame);
  const isFinished = game.lives <= 0;

  useEffect(() => {
    if (isFinished) return;

    const id = setInterval(() => {
      setGame((g) => tick(g));
    }, 500);

    return () => clearInterval(id);
  }, [isFinished]);

  const plantTower = (row: number, col: number) => {
    setGame((prev) => plantTowerAt(prev, row, col));
  };

  if (isFinished)
    return <GameOver onRestart={() => setGame(createInitialGame())} />;

  return (
    <>
      <div className="hud">
        <span>Gold: {game.gold}</span>
        <span>Lives: {game.lives}</span>
      </div>
      <Board game={game} plantTower={plantTower} />
    </>
  );
};
