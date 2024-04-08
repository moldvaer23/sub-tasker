import { TSubTodo, TTodo } from "05-Shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodosState {
  activeEdit: string;
  uuidTodos: string;
  todos: Record<string, TTodo>;
}

/*
 * Типы Action для Sub Todo
 */
type TActionSubTodoInstance = {
  uuidPinTodo: string;
};

type TActionAddSubTodo = TActionSubTodoInstance & {
  subTodo: TSubTodo;
};

type TActionUpdateSubTodo = TActionSubTodoInstance & {
  uuidSubTodo: string;
  task: string;
};

type TActionDelSubTodo = TActionSubTodoInstance & {
  uuidSubTodo: string;
};

const initialState: ITodosState = {
  uuidTodos: "",
  activeEdit: "",
  todos: {},
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Установка uuid объекта задач (его ключа)
    setUuidTodos(state, action: PayloadAction<string>) {
      state.uuidTodos = action.payload;
    },

    // Работа с задачами
    // Добавление новой задачи
    addTodo(state, action: PayloadAction<TTodo>) {
      const todo: TTodo = action.payload;

      state.todos[todo.uuid] = todo;
      localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
    },

    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setTodos(state, action: PayloadAction<Record<string, TTodo>>) {
      state.todos = action.payload;
    },

    // Обновление задачи
    updateTodo(state, action: PayloadAction<{ uuid: string; task: string }>) {
      const todoUuid: string = action.payload.uuid;

      if (todoUuid in state.todos) {
        state.todos[todoUuid].task = action.payload.task;
        localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Удаление задачи
    deleteTodo(state, action: PayloadAction<string>) {
      const todoUuid: string = action.payload;

      if (todoUuid in state.todos) {
        delete state.todos[todoUuid];
        localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Установка uuid задачи которая редактируется
    setActiveEdit(state, action: PayloadAction<string>) {
      if (state.activeEdit !== action.payload) state.activeEdit = action.payload;
    },

    // Установка пометки важно у задачи
    setImportantTodo(state, action: PayloadAction<{ uuid: string; value: boolean }>) {
      const todoUuid: string = action.payload.uuid;

      if (todoUuid in state.todos) {
        state.todos[todoUuid].important = action.payload.value;
        localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Работа с подзадачами
    // Добавление новой подзадачи
    addSubTodo(state, action: PayloadAction<TActionAddSubTodo>) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodo: TSubTodo = action.payload.subTodo;

      if (todoUuid in state.todos) {
        state.todos[todoUuid].subTodos[subTodo.uuid] = subTodo;
        localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Обновление подзадачи
    updateSubTodo(state, action: PayloadAction<TActionUpdateSubTodo>) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodoUuid: string = action.payload.uuidSubTodo;

      if (todoUuid in state.todos) {
        if (subTodoUuid in state.todos[todoUuid].subTodos) {
          state.todos[todoUuid].subTodos[subTodoUuid].task = action.payload.task;
          localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoUuid} not found.`);
        }
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Удаление подзадачи
    deleteSubTodo(state, action: PayloadAction<TActionDelSubTodo>) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodoUuid: string = action.payload.uuidSubTodo;

      if (todoUuid in state.todos) {
        if (subTodoUuid in state.todos[todoUuid].subTodos) {
          delete state.todos[todoUuid].subTodos[subTodoUuid];
          localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoUuid} not found.`);
        }
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },

    // Установка пометки важно у подзадачи
    setImportantSubTodo(
      state,
      action: PayloadAction<{ uuidPinTodo: string; uuidSubTodo: string; value: boolean }>
    ) {
      const todoUuid: string = action.payload.uuidPinTodo;
      const subTodoUuid: string = action.payload.uuidSubTodo;

      if (todoUuid in state.todos) {
        if (subTodoUuid in state.todos[todoUuid].subTodos) {
          state.todos[todoUuid].subTodos[subTodoUuid].important = action.payload.value;

          localStorage.setItem(state.uuidTodos, JSON.stringify(state.todos));
        } else {
          console.error(`Sub Task with id ${subTodoUuid} not found.`);
        }
      } else {
        console.error(`Task with id ${todoUuid} not found.`);
      }
    },
  },
});

export const {
  addSubTodo,
  addTodo,
  deleteSubTodo,
  deleteTodo,
  setActiveEdit,
  setImportantSubTodo,
  setImportantTodo,
  setTodos,
  setUuidTodos,
  updateSubTodo,
  updateTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
