import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "./type";

interface TodosState {
  todos: TTodo[];
}

const initialState: TodosState = {
  todos: [
    {
      id: 0,
      task: "Привет 1",
    },
    {
      id: 1,
      task: "Привет 2",
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TTodo>) {
      state.todos.push(action.payload);
    },
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
