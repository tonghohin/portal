import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const fetchUserAuthentication = createAsyncThunk("user/fetchUserAuthentication", async () => {
  const res = await fetch("/authenticate", { headers: { "x-access-token": localStorage.getItem("token") } });
  const data = await res.json();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAuthentication.pending, (state) => (state = {}))
      .addCase(fetchUserAuthentication.fulfilled, (state, action) => action.payload)
      .addCase(fetchUserAuthentication.rejected, (state) => (state = {}));
  }
});

export default userSlice.reducer;
