import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type UserState = {
  currentUser: User;
};

const initialState: UserState = {
  currentUser: {
    name: "",
    email: "",
    permissions: [],
    image: "",
  },
};

export const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
