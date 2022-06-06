import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralReducerState, ShowEditorSideBarPayload } from "./types";

const initialState: GeneralReducerState = {
  showEditorSideBar: true,
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
  },
});

export const { setShowEditorSideBar } = generalSlice.actions;

export default generalSlice.reducer;
