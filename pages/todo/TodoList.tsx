import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TodoList({ initialTodoItems }: { initialTodoItems: { text: string }[] }) {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [newTodo, setNewTodo] = useState("");
  return (
    <>
      <ul className="space-y-2 mb-4">
        {todoItems.map((todoItem, index) => (
          // biome-ignore lint: example
          <li key={index} className="p-2 bg-muted rounded-md">
            {todoItem.text}
          </li>
        ))}
      </ul>
      <div>
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            // Optimistic UI update
            setTodoItems((prev) => [...prev, { text: newTodo }]);
            setNewTodo("");
          }}
          className="flex gap-2"
        >
          <Input
            type="text"
            placeholder="Enter a new todo..."
            onChange={(ev) => setNewTodo(ev.target.value)}
            value={newTodo}
            className="flex-1"
          />
          <Button type="submit">Add to-do</Button>
        </form>
      </div>
    </>
  );
}
