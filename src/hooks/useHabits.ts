
import { useContext } from "react";
import { HabitContext } from "../context/HabitProvider";

export default function useHabits() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error(
      "useHabits must be used inside HabitProvider"
    );
  }

  return context;
}
