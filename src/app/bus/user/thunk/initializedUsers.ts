import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeUsers = createAsyncThunk(
  "userSlice/initializeUsers",
  async () => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
);
