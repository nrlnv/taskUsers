import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("userSlice/fetchUsers", async () => {
  const response = await fetch("/src/app/api/users.json");
  const data = await response.json();
  return data;
});
