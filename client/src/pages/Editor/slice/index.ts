import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialStatePayload,
  ProjectEditorReducerState,
  ProjectDataPayload,
  FetchCodeByNodeIdFuncPayload,
  CodeDataPayload,
  NewCodeDataPayload,
  TreeDataPayload,
  NewTreeDataPayload,
} from "./types";

const initialState: ProjectEditorReducerState = {
  projectData: null,
  fetchCodeByNodeId: null,
  codeData: null,
  newCodeData: null,
  treeData: null,
  newTreeData: null,
};

const ProjectEditorSlice = createSlice({
  name: "projectEditor",
  initialState,
  reducers: {
    setProjectData: (
      state: ProjectEditorReducerState,
      action: PayloadAction<ProjectDataPayload>
    ) => {
      state.projectData = action.payload.projectData;
    },
    setfetchCodeByNodeIdFunc: (
      state: ProjectEditorReducerState,
      action: PayloadAction<FetchCodeByNodeIdFuncPayload>
    ) => {
      state.fetchCodeByNodeId = action.payload.fetchCodeByNodeId;
    },
    setCodeData: (
      state: ProjectEditorReducerState,
      action: PayloadAction<CodeDataPayload>
    ) => {
      state.codeData = action.payload.codeData;
    },
    setNewCodeData: (
      state: ProjectEditorReducerState,
      action: PayloadAction<NewCodeDataPayload>
    ) => {
      state.newCodeData = action.payload.newCodeData;
    },
    setTreeData: (
      state: ProjectEditorReducerState,
      action: PayloadAction<TreeDataPayload>
    ) => {
      state.treeData = action.payload.treeData;
    }, //NewTreeDataPayload
    setNewTreeData: (
      state: ProjectEditorReducerState,
      action: PayloadAction<NewTreeDataPayload>
    ) => {
      console.log("NewTreeData > Action.Payload > ", action.payload);
      state.newTreeData = action.payload.newTreeData;
    },
    setProjectInitialState: (
      state: ProjectEditorReducerState,
      action: PayloadAction<InitialStatePayload>
    ) => {
      state.projectData = action.payload.projectData;
      state.fetchCodeByNodeId = action.payload.fetchCodeByNodeId;
      state.codeData = action.payload.codeData;
      state.treeData = action.payload.treeData;
    },
  },
});

export const { setProjectData, setProjectInitialState, setNewCodeData } =
  ProjectEditorSlice.actions;

export default ProjectEditorSlice.reducer;
