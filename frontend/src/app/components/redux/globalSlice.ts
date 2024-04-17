import { getProjectsAPI, getTabsAPI } from "@/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Dimentions {
  x:number;
  y:number;
}

type GlobalState = {
  dimensions: Dimentions | null;
  scrollOffsetY: number;
  navVisible: boolean
};

const initialState: GlobalState = {
  dimensions: null,
  scrollOffsetY: 0,
  navVisible: true
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDimensions: (state, action: PayloadAction<Dimentions>) => {
      state.dimensions = action.payload;
    },
    setScrollOffsetY: (state, action: PayloadAction<number>) => {
      state.scrollOffsetY = action.payload;
    },
    setNavVisible: (state, action: PayloadAction<boolean>) => {
      state.navVisible = action.payload;
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

export const { setDimensions, setScrollOffsetY, setNavVisible } =
  globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;