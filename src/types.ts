export type TileType = "grass" | "path" | "buildable";

export type GameState = {
  lives: number;
  enemies: EnemyState[];
  gold: number;
  towers: Towers;
};

export type EnemyState = {
  id: string;
  hp: number;
  maxHp: number;
  pathIndex: number;
};

export type Towers = Set<string>;
