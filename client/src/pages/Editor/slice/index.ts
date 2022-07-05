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
  CodeChangedPayload,
  OpenProjectDetailModalPayload,
  OpenContributorModalPayload,
  OpenEditContributorModalPayload,
} from "./types";

const initialState: ProjectEditorReducerState = {
  projectData: null,
  fetchCodeByNodeId: null,
  codeData: null,
  newCodeData: null,
  treeData: null,
  newTreeData: null,
  codeChanged: false,
  openProjectDetailModal: false,
  openContributorModal: false,
  openEditContributorModal: false,
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
    setCodeChanged: (
      state: ProjectEditorReducerState,
      action: PayloadAction<CodeChangedPayload>
    ) => {
      state.codeChanged = action.payload.codeChanged;
    },
    setOpenProjectDetailModal: (
      state: ProjectEditorReducerState,
      action: PayloadAction<OpenProjectDetailModalPayload>
    ) => {
      state.openProjectDetailModal = action.payload.openProjectDetailModal;
    },
    setOpenContributorModal: (
      state: ProjectEditorReducerState,
      action: PayloadAction<OpenContributorModalPayload>
    ) => {
      state.openContributorModal = action.payload.openContributorModal;
    },
    setOpenEditContributorModal: (
      state: ProjectEditorReducerState,
      action: PayloadAction<OpenEditContributorModalPayload>
    ) => {
      state.openEditContributorModal = action.payload.openEditContributorModal;
    },
  },
});

export const {
  setProjectData,
  setProjectInitialState,
  setNewCodeData,
  setCodeChanged,
  setOpenProjectDetailModal,
  setOpenContributorModal,
  setOpenEditContributorModal,
} = ProjectEditorSlice.actions;

export default ProjectEditorSlice.reducer;
