
import type { Habit } from "../context/HabitProvider";
import Button from "./Button";

type HabitListProps = {
  habits: Habit[];
  dates: Date[];
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStreak(habit: Habit) {
  const completed = new Set(habit.completedDays);
  const cursor = new Date();

  if (!completed.has(getDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;

  while (completed.has(getDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export default function HabitList({
  habits,
  dates,
  onToggle,
  onDelete,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="empty-message">
        No habits yet. Add your first habit!
      </p>
    );
  }

  return (
    <section className="habit-list">
      {habits.map((habit) => (
        <article className="habit-card" key={habit.id}>
          <div className="habit-heading">
            <div className="habit-title">
              <h2>{habit.name}</h2>
              <span className="streak">
                🔥 {getStreak(habit)}
              </span>
            </div>

            <button
              className="delete-button"
              type="button"
              onClick={() => onDelete(habit.id)}
            >
              Delete
            </button>
          </div>

          <div className="days-grid">
            {dates.map((date, index) => {
              const key = getDateKey(date);
              const done = habit.completedDays.includes(key);
              const today = key === getDateKey(new Date());

              return (
                <button
                  key={key}
                  type="button"
                  className={[
                    "day-button",
                    done ? "day-done" : "",
                    today ? "day-today" : "",
                  ].join(" ")}
                  onClick={() => onToggle(habit.id, key)}
                  aria-pressed={done}
                  aria-label={`${weekdays[index]} ${date.getDate()}: ${
                    done ? "completed" : "not completed"
                  }`}
                >
                  <span>{weekdays[index]}</span>
                  <span>{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}
