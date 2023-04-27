import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { UserObject } from "../../routes/User";

interface authState {
  status: string;
  error: boolean;
  message: string;
  user: object | null;
  isLoggedIn: boolean;
}

const initialState: authState = {
  status: "idle",
  error: false,
  message: "",
  user: null,
  isLoggedIn: false,
};
const API_URL = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk<UserObject, UserObject>(
  "auth/login",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    const path = "/auth/login";
    const url = API_URL + path;
    try {
      const response = await axios.post(url, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const logout = createAsyncThunk<string>("auth/logout", async () => {
  const path = "/auth/logout";
  const url = API_URL + path;
  const response = await axios.post(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  });
  return response.data;
});

export const register = createAsyncThunk<object>(
  "auth/register",
  async (values) => {
    const path = "/auth/register";
    const url = API_URL + path;
    const response = await axios.post(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      withCredentials: true,
    });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
        state.error = true;
      })
      .addCase(logout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
