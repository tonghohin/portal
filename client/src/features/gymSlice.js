import { createSlice } from "@reduxjs/toolkit";

const initialState = { coor: { x: 0, y: 0 }, id: "", text: "" };

export const gymSlice = createSlice({
  name: "userGym",
  initialState,
  reducers: {
    rightClicked: (state, action) => (state = action.payload)
  }
});

export const { rightClicked } = gymSlice.actions;

export default gymSlice.reducer;
