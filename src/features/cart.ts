import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./products";

export interface CartItem{
    name: string;
    size: string;
    price: number;
    id: number;
    style: string;
    sku: number;
    quantity: number;
    currency: string;
    installments: number;
}
interface CartState {
    cart: { [key: number]: {[key:string]:CartItem} }
}

const initialState: CartState = {
    cart: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action:{payload:{product:Product,selectedSizes:string[]}}) => {
            const product = action.payload.product
            const selectedSizes = action.payload.selectedSizes
            if (!selectedSizes[product.id]) {
                selectedSizes[product.id] = product.availableSizes[0]
            }
            const selectedSize = selectedSizes[product.id];
            if (state.cart[product.id] && state.cart[product.id][selectedSizes[product.id]]) {
                state.cart[product.id][selectedSizes[product.id]].quantity += 1
                return
            }
            const cartItem: CartItem = {
                name: product.title,
                size: action.payload.selectedSizes.length ? action.payload.selectedSizes[product.id]:product.availableSizes[0],
                price: product.price,
                id:product.id,
                style: product.style,
                sku: product.sku,
                quantity: 1,
                currency:product.currencyFormat,
                installments: product.installments,
            }
            if (state.cart[product.id]) {
                state.cart[product.id][selectedSize] = cartItem;
            }
            else
            {state.cart[product.id] = {[selectedSize]:cartItem}}
        },
        reduceQuantity: (state, action: { payload: { cartItem: CartItem} }) => {
            const cartItem = action.payload.cartItem;
            state.cart[cartItem.id][cartItem.size].quantity -= 1;
        },
        increaseQuantity: (state, action: { payload: { cartItem: CartItem } }) => {
            const cartItem = action.payload.cartItem;
            state.cart[cartItem.id][cartItem.size].quantity += 1;
        },
        removeItem: (state, action: { payload: { cartItem: CartItem} }) => {
            const cartItem = action.payload.cartItem;
            delete state.cart[cartItem.id][cartItem.size]
            if (Object.values(state.cart[cartItem.id]).length == 0) {
                delete state.cart[cartItem.id]
            }
        }
    }
})


export default cartSlice.reducer;
export const { addToCart, removeItem, reduceQuantity, increaseQuantity } = cartSlice.actions;