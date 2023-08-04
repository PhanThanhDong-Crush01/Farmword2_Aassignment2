import { RootState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const selectCategories = (state: RootState) =>
  state.categories.categories;

export const getMaxCategory = (data: any) => {
  return data.reduce((maxCategory: any, currentCategory: any) => {
    return currentCategory.id > maxCategory.id ? currentCategory : maxCategory;
  });
};

export const getcategories = createAsyncThunk(
  "category/getcategories",
  async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/categories`);
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const getcategoryOne = createAsyncThunk(
  "category/getcategoryOne",
  async (id: number) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/categories/${id}`
      );
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const addcategory = createAsyncThunk(
  "category/addcategory",
  async (category: any) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/categories`,
        category
      );

      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);
export const updatecategory = createAsyncThunk(
  "category/updatecategory",
  async (category: any) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/categories/${category.id}`,
        category
      );
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const deletecategory = createAsyncThunk<
  any,
  number,
  { state: RootState }
>("category/deletecategory", async (id: number, { getState, dispatch }) => {
  const state = getState();
  const categories = state.categories.categories;
  const allProducts = state.products.allProducts;

  const tb = confirm("Are you sure you want to delete this category?");
  if (!tb) {
    return;
  }

  const otherCategory: any = categories.find(
    (cate: any) => cate.name === "Other"
  );

  let updatedProducts = allProducts;

  if (!otherCategory || otherCategory.id === id) {
    const newOtherCategory: any = await dispatch(
      addcategory({ name: "Other" })
    );

    updatedProducts = updatedProducts.map((product: any) => {
      if (product.categoryId === id) {
        axios.patch(`http://localhost:3000/products/${product.id}`, {
          categoryId: newOtherCategory.payload.id,
        });
        return { ...product, categoryId: newOtherCategory.payload.id };
      }
      return product;
    });
  } else {
    updatedProducts = updatedProducts.map((product: any) => {
      if (product.categoryId === id) {
        axios.patch(`http://localhost:3000/products/${product.id}`, {
          categoryId: otherCategory.id,
        });
        return { ...product, categoryId: otherCategory.id };
      }
      return product;
    });
  }

  await axios.delete(`http://localhost:3000/categories/${id}`);

  return { id, updatedProducts };
});
