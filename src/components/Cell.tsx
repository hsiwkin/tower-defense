import type { TileType } from "../types";
import { Enemy } from "./Enemy/Enemy";

export type CellProps = {
  type: TileType;
  hasTower: boolean;
  hasEnemy: boolean;
  onClick: () => void;
};

export const Cell = ({ type, hasTower, hasEnemy, onClick }: CellProps) => {
  const className = ["board-cell", `board-cell--${type}`]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} onClick={onClick}>
      {hasTower && <div className="entity entity--tower" />}
      {hasEnemy && <Enemy hp={3} maxHp={3} />}
    </div>
  );
};
