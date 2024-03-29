import type { FC, ReactElement } from "react";

import { Home } from "01-Pages/Home";
import { TTodo } from "05-Shared/types";
import { setTodos } from "02-Widgets/Todo/models/TodoSlice";

import { useAppDispatch } from "./store";

import "./styles/global.scss";

const App: FC = (): ReactElement => {
  const localTodos: Record<string, TTodo> | null = JSON.parse(
    localStorage.getItem("todos") as string
  );

  const dispatch = useAppDispatch();

  // В случае если в кеше есть тодушки то передаем их в store
  if (localTodos) {
    dispatch(setTodos(localTodos));
  }

  return (
    <>
      <Home />
    </>
  );
};

export default App;
