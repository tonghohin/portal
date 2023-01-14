import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const fetchAuthentication = createAsyncThunk("admin/fetchAuthentication", async () => {
  const res = await fetch("/admin/authenticate", { headers: { "x-access-token": localStorage.getItem("token") } });
  const data = await res.json();
  return data;
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthentication.pending, (state) => (state = {}))
      .addCase(fetchAuthentication.fulfilled, (state, action) => action.payload)
      .addCase(fetchAuthentication.rejected, (state) => (state = {}));
  }
});

export default adminSlice.reducer;
