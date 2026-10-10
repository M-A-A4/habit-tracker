
type HeaderProps = {
  completed: number;
  total: number;
  weekLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
};

import Button from "./Button";

export default function Header({
  completed,
  total,
  weekLabel,
  onPrevious,
  onNext,
  canGoNext,
}: HeaderProps) {
  return (
    <header className="top-row">
      <div>
        <h1>Habit Tracker</h1>
        <p className="muted">
          {completed} / {total} done today
        </p>
      </div>

      <div className="week-navigation">
        <p className="muted week-label">{weekLabel}</p>

        <div className="navigation-buttons">
          <Button onClick={onPrevious}>Prev</Button>
          <Button onClick={onNext} disabled={!canGoNext}>
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
