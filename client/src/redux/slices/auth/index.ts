import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthReducerState,
  LoginActionPayload,
  LoadingActionPayload,
  AuthTokenActionPayload,
  UserActionPayload,
} from "./types";

const initialState: AuthReducerState = {
  loggedIn: false,
  isLoading: false,
  authToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (
      state: AuthReducerState,
      action: PayloadAction<LoginActionPayload>
    ) => {
      state.loggedIn = action.payload.loggedIn;
    },
    setLoading: (
      state: AuthReducerState,
      action: PayloadAction<LoadingActionPayload>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
    setLogout: (state: AuthReducerState) => {
      state.loggedIn = false;
      state.user = null;
    },
    setAuthToken: (
      state: AuthReducerState,
      action: PayloadAction<AuthTokenActionPayload>
    ) => {
      state.authToken = action.payload.authToken;
    },
    setUser: (
      state: AuthReducerState,
      action: PayloadAction<UserActionPayload>
    ) => {
      state.user = action.payload.user;
    },
  },
});

export const { setLoggedIn, setLoading, setLogout, setAuthToken, setUser } =
  authSlice.actions;

export default authSlice.reducer;
