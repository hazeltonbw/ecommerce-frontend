import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../../store";
import { AxiosError, AxiosResponse } from "axios";
import { Unauthenticated } from "../auth/authSlice";
import type { Product } from "../../components/Product";

export type Order = {
  products: Array<Product>;
  order_id: number;
  date: Date;
  status: string;
  product_id: number;
  qty: number;
  title: string;
  url: string;
  total: number;
};

export type ProductDetails = {
  product: {
    product_id: number;
    category_id: number;
    title: string;
    price: number;
    description: string;
    url: string;
  };
  qty: number;
  total: number;
};

export type OrderDetails = {
  order_id: number;
  order_total: number;
  date: Date;
  status: string;
  products: Array<ProductDetails>;
};

interface ordersState {
  status: string;
  error: boolean;
  message: string;
  orders: Array<OrderDetails> | null;
  new_order_id: number | null;
  order: Order | null;
}

const initialState: ordersState = {
  status: "idle",
  error: false,
  message: "",
  orders: null,
  new_order_id: null,
  order: null,
};

export const getOrders = createAsyncThunk<Array<OrderDetails> & Unauthenticated>(
  "/orders",
  async () => {
    const response: AxiosResponse = await api.get("/orders");
    // if (response.data?.error === "Unauthenticated") {
    //   return rejectWithValue({ message: "Unauthenticated" });
    // }
    // if (response.data?.message != null) {
    //   return rejectWithValue({ message: response.data.message });
    // }
    // return fulfillWithValue(response.data);
    return response.data;
  }
);

export const createOrder = createAsyncThunk<number>("/orders/new", async () => {
  const response: AxiosResponse = await api.post("/orders/new");
  return response.data.order_id;
});

export const getOrderById = createAsyncThunk<Order, number>(
  "/orders/:order_id",
  async (order_id: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AxiosResponse = await api.get(`/orders/${order_id}`);
      if (response.status === 204) {
        return rejectWithValue("Order not found");
      }
      return fulfillWithValue(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err);
        return rejectWithValue(err.message);
      }
    }
  }
);

export const fetchRecentOrder = createAsyncThunk<Order & Unauthenticated>(
  "/orders/recent",
  async () => {
    const response: AxiosResponse = await api.get("/orders/recent");
    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = false;
        state.new_order_id = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchRecentOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = false;
        state.order = action.payload;
      })
      .addCase(fetchRecentOrder.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchRecentOrder.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(getOrderById.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state) => {
        state.status = "failed";
        state.error = true;
        state.order = null;
      });
  },
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectNewOrderId = (state: RootState) => state.orders.new_order_id;
export const selectOrder = (state: RootState) => state.orders.order;

export default ordersSlice.reducer;
