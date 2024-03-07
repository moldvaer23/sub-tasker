import { FC } from "react";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";

const Todo: FC = () => {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
};

export default Todo;
