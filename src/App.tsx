
import { useState } from "react";
import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import { HabitProvider } from "./context/HabitProvider";
import useHabits from "./hooks/useHabits";
import "./index.css";

function getWeekDates(offset: number) {
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay();

  monday.setDate(
    today.getDate() - (day === 0 ? 6 : day - 1) + offset * 7
  );
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });
}

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function HabitTracker() {
  const { habits, addHabit, deleteHabit, toggleDay } = useHabits();
  const [weekOffset, setWeekOffset] = useState(0);

  const dates = getWeekDates(weekOffset);
  const today = dateKey(new Date());

  const completedToday = habits.filter((habit) =>
    habit.completedDays.includes(today)
  ).length;

  const weekLabel = `${formatDate(dates[0])} - ${formatDate(dates[6])}`;

  return (
    <main className="app">
      <div className="container">
        <Header
          completed={completedToday}
          total={habits.length}
          weekLabel={weekLabel}
          onPrevious={() => setWeekOffset((value) => value - 1)}
          onNext={() => setWeekOffset((value) => value + 1)}
          canGoNext={weekOffset < 0}
        />

        <HabitForm onAdd={addHabit} />

        <HabitList
          habits={habits}
          dates={dates}
          onToggle={toggleDay}
          onDelete={deleteHabit}
        />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <HabitProvider>
      <HabitTracker />
    </HabitProvider>
  );
}
