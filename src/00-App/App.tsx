import { FC, ReactElement } from "react";
import { setTodos } from "03-Features/Todo/models/TodoSlice";
import { TTodo } from "03-Features/Todo/models/type";
import { Home } from "01-Pages/Home";
import { useAppDispatch } from "./store";
import "./styles/global.scss";

const App: FC = (): ReactElement => {
  const localTodos: TTodo[] | null = JSON.parse(localStorage.getItem("todos") as string);
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
