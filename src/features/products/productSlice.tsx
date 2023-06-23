import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import { RootState } from "../../store";
import { AxiosResponse } from "axios";
import type { Product } from "../../components/Product";

interface productState {
    status: string;
    error: boolean;
    message: string;
    products: Array<Product> | null;
}

const initialState: productState = {
    status: "idle",
    error: false,
    message: "",
    products: null,
};

export const getProducts = createAsyncThunk<Product[]>(
    "/products",
    async () => {
        console.log("getProducts async thunk is running");
        const response: AxiosResponse = await api.get("/products");
        return response.data;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = "pending";
                state.error = false;
            })
            .addCase(
                getProducts.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.status = "succeeded";
                    state.error = false;
                    state.products = action.payload;
                }
            )
            .addCase(getProducts.rejected, (state) => {
                state.status = "failed";
                state.error = true;
            });
    },
});

export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
