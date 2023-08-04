import { RootState } from "@/app/store";
import { IProduct } from "@/interfaces/IProduct";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/products/?_expand=category`
    );
    const products = data.map((pro: any) => {
      return { ...pro, cateName: pro.category.name };
    });

    return products;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
});

export const getProductsCate = createAsyncThunk<
  IProduct[],
  number,
  { state: RootState }
>("product/getProductsCate", async (id: number, { getState }) => {
  const state = getState();
  const allProducts = state.products.allProducts;

  try {
    if (id === 0) {
      return allProducts;
    } else {
      const filteredProducts = allProducts.filter(
        (pro: IProduct) => pro.categoryId === id
      );
      return filteredProducts;
    }
  } catch (error: any) {
    return error.message;
  }
});

export const getProductsSeach = createAsyncThunk<
  IProduct[],
  string,
  { state: RootState }
>("product/getProductsSeach", async (value: string, { getState }) => {
  const state = getState();
  const allProducts = state.products.allProducts;
  try {
    if (value == "") {
      return allProducts;
    } else {
      let filteredProducts = allProducts;
      filteredProducts = allProducts.filter((pro: IProduct) =>
        pro.name.toLowerCase().includes(value.toLowerCase())
      );
      return filteredProducts;
    }
  } catch (error: any) {
    return error.message;
  }
});

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id: number) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product: any) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/products`,
        product
      );
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: any) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const updateProductCateId = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("product/updateProductCateId", async (category: any, { getState }) => {
  const state = getState();
  const allProducts = state.products.allProducts;
  try {
    const data = await Promise.all(
      allProducts.map(async (pro: any) => {
        if (pro.categoryId === category.cateOld) {
          const response = await axios.patch(
            `http://localhost:3000/products/${pro.id}`,
            category.cateNew
          );
          return response.data;
        }
        return pro;
      })
    );
    return data;
  } catch (error: any) {
    return error.message;
  }
});
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: any) => {
    const userConfirmation = confirm(`Are you sure you want to delete?`) as any;
    if (userConfirmation) {
      await axios.delete(`http://localhost:3000/products/${id}`);
      return id;
    }
  }
);

export const sortProducts = createAsyncThunk<any, any, { state: RootState }>(
  "product/sortProducts",
  async (ascending = true, { getState }) => {
    const state = getState();
    const allProducts = state.products.allProducts;
    const sortedProducts = [...allProducts].sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sortedProducts;
  }
);
