export type ProjectEditorReducerState = {
  projectData?: any;
  fetchCodeByNodeId?: any;
  codeData?: any;
  newCodeData?: any;
  treeData?: any;
  newTreeData?: any;
  codeChanged?: boolean;
  openProjectDetailModal: boolean;
  openContributorModal: boolean;
  openEditContributorModal: boolean;
};

export type InitialStatePayload = {
  projectData: any;
  fetchCodeByNodeId: any;
  codeData: any;
  treeData: any;
};

export type ProjectDataPayload = {
  projectData: any;
};

export type FetchCodeByNodeIdFuncPayload = {
  fetchCodeByNodeId: any;
};

export type CodeDataPayload = {
  codeData: any;
};

export type NewCodeDataPayload = {
  newCodeData: any;
};

export type TreeDataPayload = {
  treeData: any;
};

export type NewTreeDataPayload = {
  newTreeData: any;
};

export type CodeChangedPayload = {
  codeChanged: any;
};

export type OpenProjectDetailModalPayload = {
  openProjectDetailModal: any;
};

export type OpenContributorModalPayload = {
  openContributorModal: any;
};

export type OpenEditContributorModalPayload = {
  openEditContributorModal: any;
};
