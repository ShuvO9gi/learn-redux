import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themeCheck",
  initialState: { value: "" },
  reducers: {
    themeChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { themeChange } = themeSlice.actions;

export default themeSlice.reducer;
