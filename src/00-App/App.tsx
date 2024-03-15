import type { FC, ReactElement } from "react";

import { Home } from "01-Pages/Home";
import type { TSubTodo, TTodo } from "03-Features/Todo/models/type";
import { setTodos } from "03-Features/Todo/models/TodoSlice";

import { useAppDispatch } from "./store";

import "./styles/global.scss";
import { setSubTodos } from "03-Features/Todo/models/SubTodoSlice";

const App: FC = (): ReactElement => {
  const localTodos: TTodo[] | null = JSON.parse(localStorage.getItem("todos") as string);
  const localSubTodos: TSubTodo[] | null = JSON.parse(localStorage.getItem("subTodos") as string);
  const dispatch = useAppDispatch();

  // В случае если в кеше есть тодушки то передаем их в store
  if (localTodos) {
    dispatch(setTodos(localTodos));

    if (localSubTodos) {
      dispatch(setSubTodos(localSubTodos));
    }
  }

  return (
    <>
      <Home />
    </>
  );
};

export default App;
