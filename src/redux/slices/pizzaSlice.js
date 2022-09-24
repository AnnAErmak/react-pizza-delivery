import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, search, currentPage } = params;
    const { data } = await axios.get(
      `https://632856a8a2e90dab7bddbdbc.mockapi.io/api/v1/items?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=asc`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
