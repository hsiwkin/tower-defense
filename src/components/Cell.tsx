import type { TileType } from "../types";
import { Enemy } from "./Enemy/Enemy";

export type CellProps = {
  type: TileType;
  hasTower: boolean;
  hasEnemy: boolean;
  enemyHp: number;
  enemyMaxHp: number;
  onClick: () => void;
};

export const Cell = ({
  type,
  hasTower,
  hasEnemy,
  onClick,
  enemyHp,
  enemyMaxHp,
}: CellProps) => {
  const className = ["board-cell", `board-cell--${type}`]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} onClick={onClick}>
      {hasTower && <div className="entity entity--tower" />}
      {hasEnemy && <Enemy hp={enemyHp} maxHp={enemyMaxHp} />}
    </div>
  );
};
