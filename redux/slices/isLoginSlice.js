import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
};
const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      state.data = { ...payload };
    },
  },
});
export const { add } = ChatSlice.actions;
export default ChatSlice.reducer;
