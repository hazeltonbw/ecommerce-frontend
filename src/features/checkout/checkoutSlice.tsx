import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../../store";
import { AxiosResponse } from "axios";

interface checkoutState {
    status: string;
    error: boolean;
    message: string;
    clientSecret: string | null;
}

const initialState: checkoutState = {
    status: "idle",
    error: false,
    message: "",
    clientSecret: null,
};

export type OrderTotal = { total: number };
export const createPaymentIntent = createAsyncThunk<string, OrderTotal>(
    "/checkout/create-payment-intent",
    async (order_total: OrderTotal) => {
        console.log("Creating payment intent async thunk is working...");
        console.log(order_total, "HERES THE ORDER TOTAL");
        const response: AxiosResponse = await api.post("/checkout/create-payment-intent", order_total);
        return response.data.clientSecret;
    }
);

export const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        clearCheckoutState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.status = "pending";
                state.error = false;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.error = false;
                state.clientSecret = action.payload;
            })
            .addCase(createPaymentIntent.rejected, (state) => {
                state.status = "failed";
                state.error = true;
            });
    },
});

export const selectClientSecret = (state: RootState) => state.checkout.clientSecret;
export const { clearCheckoutState } = checkoutSlice.actions;

export default checkoutSlice.reducer;
