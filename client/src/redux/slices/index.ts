/**
 * This file imports all default reducers from slices and exports them as an object
 */

import authSlice from "./auth";
import generalSlice from "./general";
import ProjectEditorSlice from "src/pages/Editor/slice";
const allReducers = {
  auth: authSlice,
  projectEditor: ProjectEditorSlice,
  general: generalSlice,
};
export default allReducers;
