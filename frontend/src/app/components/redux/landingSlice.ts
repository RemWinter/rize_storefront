import { getProjectsAPI, getTabsAPI } from "@/app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProjectCard {
  image: string;
  title: string;
  description1: string;
  description2: string;
  cardSize: number;
}
interface ProjectTab {
  title: string;
}

interface Dimentions {
  x:number;
  y:number;
}

type LandingState = {
  projectTabs: ProjectTab[] | null;
  projectData: ProjectCard[] | null;
  dimensions: Dimentions
};

const initialState: LandingState = {
  projectTabs: [{title:'all'}],
  projectData: null,
  dimensions: {x:1920, y:1080}
}

export const getTabs = createAsyncThunk(
  "landing/tabs",
  async (
    params: null,
    thunkAPI
  ) => {
    try {
      const res = await getTabsAPI();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProjectData = createAsyncThunk(
  "landing/projects",
  async (
    params: {tab:string},
    thunkAPI
  ) => {
    try {
      const res = await getProjectsAPI();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setProjectTabs: (state, action: PayloadAction<ProjectTab[] | null>) => {
      state.projectTabs = action.payload;
    },
    setProjectData: (state, action: PayloadAction<ProjectCard[] | null>) => {
      state.projectData = action.payload;
    },
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

export const { setProjectTabs, setProjectData, setDimensions } =
  landingSlice.actions;

const landingReducer = landingSlice.reducer;
export default landingReducer;