import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
};

type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
        const existingItem = state.find(item => item.id === action.payload.id);
        if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        } else {
            state.push(action.payload);
        }
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
        return state.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity(state, action: PayloadAction<{ id: string }>) {
        const item = state.find(item => item.id === action.payload.id);
        if (item) {
        item.quantity += 1;
        }
    },
    decrementQuantity(state, action: PayloadAction<{ id: string }>) {
        const item = state.find(item => item.id === action.payload.id);
        if (item && item.quantity > 1) {
        item.quantity -= 1;
        }
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
        return action.payload;
    },
    clearCart() {
        return [];
    },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setCartItems,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;