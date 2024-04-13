import { getProjectsAPI, getTabsAPI } from "@/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Dimentions {
  x:number;
  y:number;
}

type GlobalState = {
  dimensions: Dimentions | null
};

const initialState: GlobalState = {
  dimensions: null
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDimensions: (state, action: PayloadAction<Dimentions>) => {
      state.dimensions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(getTabs.fulfilled, (state, action) => {
    //     state.projectTabs = action.payload
    // })
    //   .addCase(getProjectData.fulfilled, (state, action) => {
    //     state.projectData = action.payload
    // })
  },
});

export const { setDimensions } =
  globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;