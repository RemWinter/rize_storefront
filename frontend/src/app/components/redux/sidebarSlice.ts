import { getProjectsAPI, getTabsAPI } from "@/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type sidebarSlice = {
  selectedTab: string
};

const initialState: sidebarSlice = {
  selectedTab: 'Featured'
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
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

export const { setSelectedTab } =
  sidebarSlice.actions;

const sidebarReducer = sidebarSlice.reducer;
export default sidebarReducer;