export type GeneralReducerState = {
  showEditorSideBar: boolean;
  showOutputSection: boolean;
  onlineContributors: Array<any>;
  lockedFiles: Array<any>;
};

export type ShowEditorSideBarPayload = {
  showEditorSideBar: boolean;
}; //onlineContributors

export type ShowOutputSideBarPayload = {
  showOutputSection: boolean;
};

export type OnlineContributorsPayload = {
  onlineContributors: Array<any>;
};

export type LockedFilesPayload = {
  lockedFiles: Array<any>;
};
