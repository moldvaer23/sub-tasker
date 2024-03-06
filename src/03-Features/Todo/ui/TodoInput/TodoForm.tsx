import { useAppDispatch, useAppSelector } from "00-App/store";
import TodoModel from "03-Features/Todo/models/TodoModel";
import { addTodo } from "03-Features/Todo/models/TodoSlice";
import { FC, useState } from "react";

const TodoForm: FC = () => {
  const [task, setTask] = useState<string>("");

  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const newTodo = new TodoModel({ id: todos.length, task: task });

    dispatch(addTodo(newTodo));
  };

  return (
    <form>
      <label>
        У Вас новая задача?
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Напишите её тут"
          onChange={(e) => setTask(e.target.value)}
        />
      </label>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
