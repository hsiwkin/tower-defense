export type TileType = "grass" | "path" | "buildable";

export type GameState = {
  lives: number;
  enemyIndex: number;
  enemyHp: number;
  gold: number;
};

export type Towers = Set<string>;
