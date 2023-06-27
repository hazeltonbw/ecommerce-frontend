import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import type { UserObject } from "../../routes/User";
import { AxiosResponse, AxiosError } from "axios";
import api from "../../api/";

export type Unauthenticated = {
  success: boolean;
  redirectUrl: string;
  error: string;
};

interface authState {
  loginStatus: string;
  logoutStatus: string;
  registerStatus: string;
  loginError: boolean;
  logoutError: boolean;
  registerError: boolean;
  message: string | unknown;
  user: UserObject | null;
  isLoggedIn: boolean;
}

const initialState: authState = {
  loginStatus: "idle",
  logoutStatus: "idle",
  registerStatus: "idle",
  loginError: false,
  logoutError: false,
  registerError: false,
  message: "",
  user: null,
  isLoggedIn: false,
};

export const login = createAsyncThunk<any, UserObject>(
  "auth/login",
  async (values: UserObject, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post("/auth/login", values);
      return fulfillWithValue({ status: response.status, data: response.data });
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const logout = createAsyncThunk<string>(
  "auth/logout",
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await api.post("/auth/logout");
      // clear the logged in state
      dispatch(clearState());
      return fulfillWithValue(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return rejectWithValue(err.response?.data);
        // rejectWithValue(err);
      }
    }
  }
);

export const register = createAsyncThunk<UserObject, object>(
  "auth/register",
  async (values, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api.post("/auth/register", values);
      return fulfillWithValue(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: () => {
      // left empty on purpose, logic is in store rootReducer
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = "pending";
        state.message = ""; // clear any stale messages
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.message = action.payload;
        state.loginError = true;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "pending";
        state.message = ""; // clear any stale messages
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.message = "Failed to logout. Please try again"; // clear any stale messages
        state.message = action.payload;
      })
      // this resets everything back to initialState
      .addCase(logout.fulfilled, () => initialState)
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = true;
        state.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.registerStatus = "pending";
        state.message = ""; // clear any stale messages
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectFirstName = (state: RootState) => state.auth.user?.fname;

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
