import { createSlice } from "@reduxjs/toolkit";

const initialState = { coor: { x: 0, y: 0 }, id: "", text: "", slot: "" };

export const userGymSlice = createSlice({
  name: "userGym",
  initialState,
  reducers: {
    rightClicked: (state, action) => (state = action.payload)
  }
});

export const { rightClicked } = userGymSlice.actions;

export default userGymSlice.reducer;
