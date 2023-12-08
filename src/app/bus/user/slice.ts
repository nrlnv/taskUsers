import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extraReducers } from "./thunk";
import { User } from "../../types";

export type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((el) => el.email !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updatePermissions: (
      state,
      action: PayloadAction<{ email: string; permissions: string[] }>
    ) => {
      const { email, permissions } = action.payload;
      const userToUpdate = state.users.find((user) => user.email === email);
      if (userToUpdate) {
        userToUpdate.permissions = permissions;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
  extraReducers,
});

export const { addUser, removeUser, updatePermissions } = userSlice.actions;
