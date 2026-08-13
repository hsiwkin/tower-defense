import "./Enemy.css";

type EnemyViewProps = {
  hp: number;
  maxHp: number;
};

export const Enemy = ({ hp, maxHp }: EnemyViewProps) => {
  return (
    <div className="enemy">
      <div className="health-bar">
        <div
          className="health-bar__fill"
          style={{ width: `${(hp / maxHp) * 100}%` }}
        ></div>
      </div>
      <div className="entity--enemy" />
    </div>
  );
};
