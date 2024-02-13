import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";
import characterReducer from "./characterSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    character: characterReducer
  },
});
