import type { FC, ReactElement } from "react";

import TodoList from "../TodoList/TodoList";
import TodoNewForm from "../TodoNewForm/TodoNewForm";

const Todo: FC = (): ReactElement => {
  return (
    <>
      <TodoNewForm />
      <TodoList />
    </>
  );
};

export default Todo;
