import type { GameState } from "../../types";
import { Cell } from "../Cell";
import "./Board.css";
import { boardData, PATH } from "../Game/mapData";

export type BoardProps = {
  game: GameState;
  plantTower: (row: number, col: number) => void;
};

export const Board = ({ game, plantTower }: BoardProps) => {
  return (
    <div className="board">
      {boardData.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((type, colIndex) => {
            const enemiesHere = game.enemies.filter((enemy) => {
              const pos = PATH[enemy.pathIndex];
              return pos.row === rowIndex && pos.col === colIndex;
            });

            return (
              <Cell
                type={type}
                key={`${rowIndex}-${colIndex}`}
                onClick={
                  type === "buildable"
                    ? () => plantTower(rowIndex, colIndex)
                    : () => {}
                }
                hasTower={game.towers.has(`${rowIndex}-${colIndex}`)}
                enemies={enemiesHere}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
