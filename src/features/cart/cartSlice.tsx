import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../../store";
import { AxiosResponse } from "axios";
import type { CartProductT } from "../../components/CartProduct";

interface cartState {
  addToCartStatus: string;
  addToCartError: boolean;
  updateCartStatus: string;
  updateCartError: boolean;
  removeFromCartStatus: string;
  removeFromCartError: boolean;
  syncCartToDatabaseStatus: string;
  syncCartToDatabaseError: boolean;
  status: string;
  error: boolean;
  message: string;
  cart: Array<CartProductT> | null;
}

type ProductIdQty = {
  product_id: number;
  qty: number;
};

const initialState: cartState = {
  addToCartStatus: "idle",
  addToCartError: false,
  updateCartStatus: "idle",
  updateCartError: false,
  removeFromCartStatus: "idle",
  removeFromCartError: false,
  syncCartToDatabaseStatus: "idle",
  syncCartToDatabaseError: false,
  status: "idle",
  error: false,
  message: "",
  cart: null,
  total: 0,
};

export const getCart = createAsyncThunk<Array<CartProductT>>(
  "/cart",
  async () => {
    try {
      const response: AxiosResponse = await api.get("/cart");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const addToCart = createAsyncThunk<CartProductT, CartProductT>(
  "/cart/add",
  async (product: CartProductT, { getState }: RootState) => {
    if (getState().auth.isLoggedIn) {
      // Add product to cart in database if the user is logged in
      try {
        const response: AxiosResponse = await api.post("/cart/add", product);
      } catch (err) {
        console.error(err);
      }
    }
    // If the user isn't logged in, store the added product in
    // LocalStorage using Redux.
    // Return the value and handle it in extraReducers
    return product;
  }
);

//dispatch(updateCart({ product_id: product.product_id, qty }));
export const updateCart = createAsyncThunk<ProductIdQty, ProductIdQty>(
  "/updateCart",
  async (values: ProductIdQty, { getState }: RootState) => {
    if (getState().auth.isLoggedIn) {
      try {
        const response: AxiosResponse = await api.put("/cart", values);
      } catch (err) {
        console.error(err);
      }
    }
    return values;
  }
);

export const removeFromCart = createAsyncThunk<number, number>(
  "/removeFromCart",
  async (product_id: number, { getState }: RootState) => {
    if (getState().auth.isLoggedIn) {
      try {
        // Unlike axios.post() and axios.put(), the 2nd param to axios.delete()
        // is the Axios options, not the request body. To send a request body
        // with a DELETE request, you should use the data option.
        const response: AxiosResponse = await api.delete("/cart", {
          data: {
            product_id: product_id,
          },
        });
      } catch (err) {
        console.error(err, "AXIOS ERROR");
      }
    }
    return product_id;
  }
);

export const syncCartToDatabase = createAsyncThunk<any, Array<CartProductT>>(
  "/syncCarts",
  async (cart: Array<CartProductT>) => {
    if (cart == null || cart.length === 0) {
      return [];
    }

    try {
      cart.map(async (product: CartProductT) => {
        await api.post("/cart/add", {
          product_id: product.product_id,
          qty: product.qty,
        });
      });

      // Get the updated cart and update state in extraReducers
      const response = await api.get<Array<CartProductT>>("/cart");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(
        getCart.fulfilled,
        (state, action: PayloadAction<Array<CartProductT>>) => {
          state.status = "succeeded";
          state.error = false;
          state.cart = action.payload;
        }
      )
      .addCase(getCart.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(addToCart.pending, (state) => {
        state.addToCartStatus = "pending";
        state.addToCartError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addToCartStatus = "succeeded";
        state.addToCartError = false;
        // If the cart is still null from initialState,
        // lets make a new array with the new product added.
        if (state.cart === null) {
          state.cart = [action.payload];
          return;
        }
        // Check if there's a match in the cart for the
        // product the user is trying to add.
        // Save the index to modify the product quantity in the cart later.
        const idx = state.cart?.findIndex(
          (obj) => obj.product_id === action.payload.product_id
        );

        // If findIndex didn't find a matching product,
        // it'll return -1. Add the product to the cart.
        if (idx === undefined || idx === -1) {
          state.cart.push(action.payload);
          return;
        }

        // If there's already an item in the cart
        // that matches what the user is trying to add,
        // add the additional quantity to the product in the cart.
        state.cart[idx].qty += action.payload.qty;
      })
      .addCase(addToCart.rejected, (state) => {
        state.addToCartStatus = "failed";
        state.addToCartError = true;
      })
      .addCase(updateCart.rejected, (state) => {
        state.updateCartStatus = "failed";
        state.updateCartError = true;
      })
      .addCase(updateCart.pending, (state) => {
        state.updateCartStatus = "pending";
        state.updateCartError = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        // action.payload is of type ProductIdQty
        state.updateCartStatus = "succeeded";
        state.updateCartError = false;
        const idx = state.cart?.findIndex(
          (obj) => obj.product_id === action.payload.product_id
        );

        // This if statement is probably unnecessary,
        // but it doesn't hurt to have code that doesn't potentially crash
        if (state.cart && idx !== undefined && idx !== -1) {
          state.cart[idx].qty = action.payload.qty;
        }
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.removeFromCartStatus = "failed";
        state.removeFromCartError = true;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.removeFromCartStatus = "pending";
        state.removeFromCartError = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // action.payload contains the product_id we are trying to delete
        state.removeFromCartStatus = "succeeded";
        state.removeFromCartError = false;
        if (state.cart) {
          state.cart = state.cart.filter(
            (product) => product.product_id !== action.payload
          );
        }
      })
      .addCase(syncCartToDatabase.pending, (state) => {
        state.syncCartToDatabaseStatus = "pending";
        state.syncCartToDatabaseError = false;
      })
      .addCase(syncCartToDatabase.rejected, (state) => {
        state.syncCartToDatabaseStatus = "failed";
        state.syncCartToDatabaseError = true;
      })
      .addCase(syncCartToDatabase.fulfilled, (state, action) => {
        state.syncCartToDatabaseStatus = "succeeded";
        state.syncCartToDatabaseError = false;
        state.cart = action.payload;
      });
  },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const selectTotalPrice = (state: RootState) => {
  return state.cart.cart != null
    ? state.cart.cart.reduce((acc: number, product: CartProductT) => {
        return acc + product.qty * product.price;
      }, 0)
    : 0;
};

export default cartSlice.reducer;
