import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GeneralReducerState,
  ShowEditorSideBarPayload,
  OnlineContributorsPayload,
  LockedFilesPayload,
} from "./types";

const initialState: GeneralReducerState = {
  showEditorSideBar: true,
  onlineContributors: [],
  lockedFiles: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setShowEditorSideBar: (
      state: GeneralReducerState,
      action: PayloadAction<ShowEditorSideBarPayload>
    ) => {
      state.showEditorSideBar = action.payload.showEditorSideBar;
    },
    setOnlineContributorsPayload: (
      state: GeneralReducerState,
      action: PayloadAction<OnlineContributorsPayload>
    ) => {
      state.onlineContributors = action.payload.onlineContributors;
    },
    setLockedFilesPayload: (
      state: GeneralReducerState,
      action: PayloadAction<LockedFilesPayload>
    ) => {
      state.lockedFiles = action.payload.lockedFiles;
    },
  },
});

export const {
  setShowEditorSideBar,
  setOnlineContributorsPayload,
  setLockedFilesPayload,
} = generalSlice.actions;

export default generalSlice.reducer;
