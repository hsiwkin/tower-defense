import type { EnemyState, TileType } from "../types";
import { Enemy } from "./Enemy/Enemy";

export type CellProps = {
  type: TileType;
  hasTower: boolean;
  enemies: EnemyState[];
  onClick: () => void;
};

export const Cell = ({ type, hasTower, onClick, enemies }: CellProps) => {
  const className = ["board-cell", `board-cell--${type}`]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} onClick={onClick}>
      {hasTower && <div className="entity entity--tower" />}
      {enemies.map((e) => (
        <Enemy hp={e.hp} maxHp={e.maxHp} key={e.id} />
      ))}
    </div>
  );
};
