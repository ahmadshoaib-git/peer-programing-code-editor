/**
 * This file imports all default reducers from slices and exports them as an object
 */

import authSlice from "./auth";
import ProjectEditorSlice from "src/pages/Editor/slice";
const allReducers = { auth: authSlice, projectEditor: ProjectEditorSlice };
export default allReducers;
