import { deletecategory } from "@/actions/categories";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsCate,
  getProductsSeach,
  sortProducts,
  updateProduct,
} from "@/actions/product";
import { IProduct } from "@/interfaces/IProduct";
import { createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  products: IProduct[];
  allProducts: IProduct[]; // Lưu trữ danh sách sản phẩm ban đầu
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  allProducts: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(getProducts.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.allProducts = action.payload;
    });
    builder.addCase(getProducts.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //one
    builder.addCase(getProduct.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });

    // adding
    builder.addCase(addProduct.fulfilled, (state: any, action) => {
      state.products.push(action.payload);
    });
    // updating
    builder.addCase(updateProduct.fulfilled, (state: any, action) => {
      const newProduct = action.payload;
      state.products = state.products.map((item: any) =>
        item.id == newProduct.id ? newProduct : item
      );
    });
    // updating categoryId
    builder.addCase(deletecategory.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.products = action.payload.updatedProducts;
      state.allProducts = action.payload.updatedProducts;
    });
    // Delete
    builder.addCase(deleteProduct.fulfilled, (state: any, action) => {
      const id = action.payload;
      state.products = state.products.filter((item: any) => item.id !== id);
    });

    // loc
    builder.addCase(getProductsCate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      // Lưu trữ danh sách ban đầu khi nhận được dữ liệu
      if (state.allProducts.length === 0) {
        state.allProducts = action.payload;
      }
    });

    // timkiem
    builder.addCase(getProductsSeach.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    // sapxep
    builder.addCase(sortProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
