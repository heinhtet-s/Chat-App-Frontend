import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "./slices/ChatSlice";
export const store = configureStore({
  reducer: {
    ChatSlice,
  },
});
