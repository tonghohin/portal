import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSlice";
import userReducer from "./features/userSlice";
import userGymReducer from "./features/userGymSlice";
import gymReducer from "./features/gymSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    userGym: userGymReducer,
    gym:gymReducer
  }
});

export default store;
