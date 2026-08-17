import "./GameOver.css";

const ROWS = ["GAME", "OVER!"];

export type GameOverProps = {
  onRestart: () => void;
};

export const GameOver = ({ onRestart }: GameOverProps) => {
  return (
    <div className="game-over">
      <div className="game-over__sign">
        {ROWS.map((row) => (
          <div className="game-over__row" key={row}>
            {[...row].map((letter, i) => (
              <span
                className={
                  letter === "!"
                    ? "game-over__tile game-over__tile--bang"
                    : "game-over__tile"
                }
                key={`${row}-${i}`}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button type="button" className="game-over__restart" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};
