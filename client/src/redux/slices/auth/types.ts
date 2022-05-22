export type AuthReducerState = {
  loggedIn: boolean;
  isLoading: boolean;
  authToken: string;
  user?: any;
};

export type LoginActionPayload = {
  loggedIn: boolean;
};

export type LoadingActionPayload = {
  isLoading: boolean;
};

export type AuthTokenActionPayload = {
  authToken: string;
};
export type UserActionPayload = {
  user: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
  callback: any;
};

export type ForceResetPayload = {
  email: string;
  newPassword: string;
  resetCode: string;
};

export type MFAPayload = {
  user: any;
  code: string;
};
