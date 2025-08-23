import * as productsApi from '@/api/product/fetch-api';
import type { Product, ProductEdit } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
  items: ProductEdit[];
  error: string | null;
  successMessage: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  error: null,
  successMessage: '',
  status: 'idle',
};

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData: Omit<Product, 'id'>, { rejectWithValue }) => {
    try {
      const res = await productsApi.addProduct(productData);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (productData: ProductEdit, { rejectWithValue }) => {
    try {
      const { id, ...product} = productData;
      const res = await productsApi.editProduct(id, product);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      await productsApi.deleteProduct(productId);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetStore(state) {
      state.items = [];
      state.error = null;
      state.successMessage = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Product added successfully';
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // edit Product
      .addCase(editProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Product edited successfully';
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Product deleted successfully';
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Handle rejected states for CUD operations if specific UI feedback is needed
      .addMatcher(
        (action) => [addProduct.rejected, editProduct.rejected, deleteProduct.rejected].includes(action.type),
        (state, action) => {
          state.error = `Failed to modify product: ${action.payload as string}`;
        }
      );
  },
});

export const { resetStore } = productsSlice.actions;

export default productsSlice.reducer;
