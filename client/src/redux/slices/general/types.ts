export type GeneralReducerState = {
  showEditorSideBar: boolean;
  onlineContributors: Array<any>;
  lockedFiles: Array<any>;
};

export type ShowEditorSideBarPayload = {
  showEditorSideBar: boolean;
}; //onlineContributors

export type OnlineContributorsPayload = {
  onlineContributors: Array<any>;
};

export type LockedFilesPayload = {
  lockedFiles: Array<any>;
};
