import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import slices
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    // include slices here
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
