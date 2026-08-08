import type { TileType } from "./Board/mapData";

export type CellProps = {
  type: TileType;
  hasTower: boolean;
  hasEnemy: boolean;
  onClick: () => void;
};

export const Cell = ({ type, hasTower, hasEnemy, onClick }: CellProps) => {
  const className = [
    "board-cell",
    `board-cell--${type}`,
    hasTower ? "board-cell--tower" : "",
    hasEnemy ? "board-cell--enemy" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={className} onClick={onClick}></div>;
};
