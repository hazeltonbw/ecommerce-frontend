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
  status: string;
  error: boolean;
  message: string;
  cart: Array<CartProductT> | null;
}

type ProductIdQty = {
  product_id: number;
  qty: number;
};

type ProductIdCartId = {
  product_id: number;
  cart_id: number;
};

const initialState: cartState = {
  addToCartStatus: "idle",
  addToCartError: false,
  updateCartStatus: "idle",
  updateCartError: false,
  removeFromCartStatus: "idle",
  removeFromCartError: false,
  status: "idle",
  error: false,
  message: "",
  cart: null,
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
        if (state.cart === null) {
          state.cart = [action.payload];
          return;
        }
        // Check if there's a match in the cart for the
        // product the user is trying to add.
        // Save the index to modify the product quantity in the cart later.
        const idx = state.cart.findIndex(
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
        state.updateCartStatus = "succeeded";
        state.updateCartError = false;
        const idx = state.cart?.findIndex(
          (obj) => obj.product_id === action.payload.product_id
        );

        if (state.cart && idx !== undefined) {
          state.cart[idx].qty = action.payload.qty;
        } else {
          state.updateCartStatus = "failed";
          state.updateCartError = true;
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
        state.removeFromCartStatus = "succeeded";
        state.removeFromCartError = false;
        if (state.cart !== null) {
          state.cart = state.cart.filter(
            (product) => product.product_id !== action.payload
          );
        }
      });
  },
});

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
