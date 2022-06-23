import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GeneralReducerState,
  ShowEditorSideBarPayload,
  ShowOutputSideBarPayload,
  OnlineContributorsPayload,
  LockedFilesPayload,
} from "./types";

const initialState: GeneralReducerState = {
  showEditorSideBar: true,
  showOutputSection: false,
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
    setShowOutputSection: (
      state: GeneralReducerState,
      action: PayloadAction<ShowOutputSideBarPayload>
    ) => {
      state.showOutputSection = action.payload.showOutputSection;
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
  setShowOutputSection,
} = generalSlice.actions;

export default generalSlice.reducer;
