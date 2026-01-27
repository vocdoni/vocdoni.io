import { TodoList } from "./TodoList.js";

export default function Page() {
  return (
    <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h1>To-do List</h1>
      <TodoList />
    </div>
  );
}
