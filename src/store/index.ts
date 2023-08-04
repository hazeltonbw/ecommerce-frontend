import {
  configureStore,
  combineReducers,
  AnyAction,
  Reducer,
} from "@reduxjs/toolkit";
// import slices
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import ordersReducer from "../features/orders/ordersSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/clearState") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem("persist:root");

    state = {} as RootState;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
