import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { fetchUsers } from "./fetchUsers";
import { UserState } from "../slice";
import { initializeUsers } from "./initializedUsers";

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    })
    .addCase(initializeUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
};
