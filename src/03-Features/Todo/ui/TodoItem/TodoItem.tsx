import { FC } from "react";
import TodoModel from "../../models/TodoModel";

interface TProps {
  task: string;
}

const TodoItem: FC<TProps> = ({ task }) => {
  // Создаем новый объект Todo
  const todo = new TodoModel({ task: task }).getTodo;

  // Возвращаем разметку карточки
  return <article>{todo.task}</article>;
};

export default TodoItem;
