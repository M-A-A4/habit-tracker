
import { useState, type FormEvent } from "react";
import Button from "./Button";

type HabitFormProps = {
  onAdd: (name: string) => void;
};

export default function HabitForm({ onAdd }: HabitFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    onAdd(name);
    setName("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="New habit..."
        aria-label="New habit"
      />

      <Button type="submit" disabled={!name.trim()}>
        Add Habit
      </Button>
    </form>
  );
}
