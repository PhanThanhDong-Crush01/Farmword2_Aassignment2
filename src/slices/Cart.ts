import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  quantity: number;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Product>) => {
      const newProduct = action.payload;
      const existProductIndex = state.items.findIndex(
        (item) => item.id === newProduct.id
      );
      if (existProductIndex === -1) {
        state.items.push(newProduct);
      } else {
        state.items[existProductIndex].quantity += newProduct.quantity;
      }
    },
    increaseCart: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.quantity++;
      }
    },
    decreaseCart: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.quantity--;
        if (product.quantity < 1) {
          const confirmDelete = window.confirm(
            "Bạn có muốn xoá sản phẩm này không?"
          );
          if (confirmDelete) {
            state.items = state.items.filter((item) => item.id !== product.id);
          } else {
            product.quantity = 1;
          }
        }
      }
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      const confirmDelete = window.confirm(
        "Bạn có muốn xoá sản phẩm này không?"
      );
      if (confirmDelete) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addCart, increaseCart, decreaseCart, deleteCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
