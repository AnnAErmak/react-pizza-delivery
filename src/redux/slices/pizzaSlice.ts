import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://632856a8a2e90dab7bddbdbc.mockapi.io/api/v1/items?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=asc`
    );
    return data;
  }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading", //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
