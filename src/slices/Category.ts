import {
  addcategory,
  deletecategory,
  getcategories,
  getcategoryOne,
  updatecategory,
} from "@/actions/categories";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoryOne: {},
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcategories.fulfilled, (state: any, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getcategoryOne.fulfilled, (state: any, action: any) => {
      state.categoryOne = action.payload;
    });
    builder.addCase(addcategory.fulfilled, (state: any, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(updatecategory.fulfilled, (state: any, action) => {
      const newcategory = action.payload;
      state.categories = state.categories.map((item: any) =>
        item.id === newcategory.id ? newcategory : item
      );
    });
    builder.addCase(deletecategory.fulfilled, (state: any, action) => {
      const id = action.payload.id;
      state.categories = state.categories.filter((item: any) => item.id !== id);
    });
  },
});

export const categoryReducer = categorySlice.reducer;
