import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserObject } from "../../routes/User";
import api from "../../api/";

interface authState {
  status: string;
  error: boolean;
  message: string;
  user: UserObject | null;
  isLoggedIn: boolean;
}

const initialState: authState = {
  status: "idle",
  error: false,
  message: "",
  user: null,
  isLoggedIn: false,
};

export const login = createAsyncThunk<UserObject, UserObject>(
  "auth/login",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post("/auth/login", values);
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
  const response = await api.post("/auth/logout");
  return response.data;
});

export const register = createAsyncThunk<object>(
  "auth/register",
  async (values) => {
    const response = await api.post("/auth/register", values);
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
        state.message = ""; // clear any stale messages
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
        state.message = ""; // clear any stale messages
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
        state.message = ""; // clear any stale messages
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
export const selectFirstName = (state: RootState) => state.auth.user?.fname;

export default authSlice.reducer;
