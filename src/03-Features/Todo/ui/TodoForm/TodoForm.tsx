import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "00-App/store";
import TodoModel from "../../models/TodoModel";
import { addTodo } from "../../models/TodoSlice";
import { TTodo } from "../../models/type";

const TodoForm: FC = () => {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateTask = (): void => {
      if (task.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    };

    validateTask();
  }, [task]);

  const handleSubmit = (): void => {
    // Создаем новый уникальный id для Todo
    const newTodoId: number = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;

    // Создаем новый объект Todo
    const newTodo: TTodo = new TodoModel({ id: newTodoId, task: task }).getTodo;

    dispatch(addTodo(newTodo));

    // Обнуляем значение поля Task
    setTask("");
  };

  return (
    <form>
      <label>
        У Вас новая задача?
        <input
          type="text"
          name="task"
          id="task"
          placeholder="Напишите её тут"
          onChange={(e) => setTask(e.target.value)}
          // Необходимо для отчистки значения при submit
          value={task}
        />
      </label>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        disabled={error}>
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
