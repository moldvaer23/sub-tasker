import { combineReducers } from "@reduxjs/toolkit";
import TodoSlice from "03-Features/Todo/models/TodoSlice";
import SubTodoSlice from "03-Features/Todo/models/SubTodoSlice";

export const rootReducer = combineReducers({
  todos: TodoSlice,
  subTodos: SubTodoSlice,
});
