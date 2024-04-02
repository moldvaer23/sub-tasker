import { TField } from "05-Shared/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IFieldsState {
  acitveField: string;
  fields: Record<string, TField>;
}

const initialState: IFieldsState = {
  acitveField: "",
  fields: {},
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    // Установка активного поля
    setActiveField(state, action: PayloadAction<string>) {
      state.acitveField = action.payload;
    },

    // Создания поля
    createField(state, action: PayloadAction<TField>) {
      const field = action.payload;

      state.fields[field.uuid] = field;
      localStorage.setItem("fields", JSON.stringify(state.fields));
    },

    // Инициализация полей
    setFields(state, action: PayloadAction<TField[]>) {
      const fields = action.payload;

      fields.map((field) => {
        state.fields[field.uuid] = field;
      });
    },
  },
});

export const { setActiveField, createField, setFields } = fieldsSlice.actions;

export default fieldsSlice.reducer;
