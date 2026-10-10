
import {
  createContext,
  useState,
  type ReactNode,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Habit = {
  id: string;
  name: string;
  completedDays: string[];
};

type HabitContextType = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleDay: (id: string, date: string) => void;
};

export const HabitContext =
  createContext<HabitContextType | undefined>(undefined);

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>(
    "habit-tracker-habits",
    [
      {
        id: "1",
        name: "Practice CSS",
        completedDays: [],
      },
      {
        id: "2",
        name: "Read Quran",
        completedDays: [],
      },
    ]
  );

  function addHabit(name: string) {
    const cleanName = name.trim();
    if (!cleanName) return;

    setHabits((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        name: cleanName,
        completedDays: [],
      },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((previous) =>
      previous.filter((habit) => habit.id !== id)
    );
  }

  function toggleDay(id: string, date: string) {
    setHabits((previous) =>
      previous.map((habit) => {
        if (habit.id !== id) return habit;

        const isDone = habit.completedDays.includes(date);

        return {
          ...habit,
          completedDays: isDone
            ? habit.completedDays.filter((day) => day !== date)
            : [...habit.completedDays, date],
        };
      })
    );
  }

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, deleteHabit, toggleDay }}
    >
      {children}
    </HabitContext.Provider>
  );
}
