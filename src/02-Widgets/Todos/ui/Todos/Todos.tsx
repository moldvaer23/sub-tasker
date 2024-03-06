import { TodoForm, TodoList } from "03-Features/Todo";
import { FC } from "react";

const Todos: FC = () => {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
};

export default Todos;
