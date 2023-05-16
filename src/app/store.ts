import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products"
import cartReducer from "../features/cart";
export const store = configureStore({
    reducer: {
        products: productReducer,
        cart:cartReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
