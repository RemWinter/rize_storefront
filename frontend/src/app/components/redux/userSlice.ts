import { getProjectsAPI, getTabsAPI } from "@/app";
import { getInitialUserInfo, login, logout, register } from "@/app/api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type UserState = {
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  [key: string]: any;
  userLoggedIn: boolean
};

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  isStaff: false,
  userLoggedIn: false
}

export const registerProcess = createAsyncThunk(
  "user/register",
  async (
    params: {
      email: string;
      password: string,
      passwordConfirm: string,
      firstName: string,
      lastName: string
    },
    thunkAPI
  ) => {
    try {
      const res = await register(params)
      return res
    } 
    catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const loginProcess = createAsyncThunk(
  "user/login",
  async (
    params: {
      email: string;
      password: string,
    },
    thunkAPI
  ) => {
    try {
      const res = await login(params)
      return res
    } 
    catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const logoutProcess = createAsyncThunk(
  "user/logout",
  async (
    params?: null,
    thunkAPI?
  ) => {
    try {
      const res = await logout()
      return res
    } 
    catch (error) {
      return thunkAPI?.rejectWithValue(error);
    }
  }
)

export const getInitialUserInfoProcess = createAsyncThunk(
  "user/inital",
  async (
    params?: null,
    thunkAPI?
  ) => {
    try {
      const res = await getInitialUserInfo()
      return res
    } 
    catch (error) {
      return thunkAPI?.rejectWithValue(error);
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      state.email = email;
      state.userLoggedIn = !!email
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setIsStaff: (state, action: PayloadAction<boolean>) => {
      state.isStaff = action.payload;
    },
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialUserInfoProcess.fulfilled, (state, action) => {
        const data = action.payload
        state.userLoggedIn = !!data['email']
        const keysToSet = [
          'email',
          'firstName',
          'lastName',
          'isStaff'
      ];
      keysToSet.forEach((key: keyof UserState) => {
        state[key] = data[key] as UserState[typeof key];
      });
    })
    .addCase(logoutProcess.fulfilled, (state) => {
      Object.assign(state, initialState);
    })
  },
});

export const { setEmail, setFirstName, setLastName, setIsStaff } =
  userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;