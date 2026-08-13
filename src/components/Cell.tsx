import type { TileType } from "../types";

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
      {hasEnemy && <div className="entity entity--enemy" />}
    </div>
  );
};
