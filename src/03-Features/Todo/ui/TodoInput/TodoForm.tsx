import { useAppDispatch, useAppSelector } from "00-App/store";
import TodoModel from "03-Features/Todo/models/TodoModel";
import { addTodo } from "03-Features/Todo/models/TodoSlice";
import { TTodo } from "03-Features/Todo/models/type";
import { FC, useState } from "react";

const TodoForm: FC = () => {
  const [task, setTask] = useState<string>("");

  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    // Создаем новый уникальный id для Todo
    const newTodoId: number = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;

    // Создаем модель Todo
    const newTodoModel: TodoModel = new TodoModel({ id: newTodoId, task: task });

    // Создаем объект Todo для хранения в dispath & localStorage
    const newTodo: TTodo = {
      id: newTodoModel.id,
      task: newTodoModel.task,
    };

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
