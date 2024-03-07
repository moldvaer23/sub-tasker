import { FC } from "react";

import TodoList from "../TodoList/TodoList";
import TodoNewForm from "../TodoNewForm/TodoNewForm";

const Todo: FC = () => {
  return (
    <>
      <TodoNewForm />
      <TodoList />
    </>
  );
};

export default Todo;
