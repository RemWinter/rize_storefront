import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "./store";

type severityTypes = 'error' | 'success' | 'info' | 'warning'

type SnackbarState = {
  snackbarIsOpen: boolean;
  snackbarSeverity: severityTypes;
  snackbarText: string;
};

const initialState: SnackbarState = {
  snackbarIsOpen: false,
  snackbarSeverity: 'success',
  snackbarText: ''
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarIsOpen: (state, action: PayloadAction<boolean>) => {
      const open = action.payload
      state.snackbarIsOpen = open;
      if (!open) {
        state.snackbarText = ''
        state.snackbarSeverity = 'success'
      }
    },
    setSnackbarSeverity: (state, action: PayloadAction<severityTypes>) => {
      state.snackbarSeverity = action.payload;
    },
    setSnackbarText: (state, action: PayloadAction<string>) => {
      state.snackbarText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { setSnackbarIsOpen, setSnackbarSeverity, setSnackbarText } =
  snackbarSlice.actions;

const snackbarReducer = snackbarSlice.reducer;
export default snackbarReducer;