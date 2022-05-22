/**
 * This file imports all default reducers from slices and exports them as an object
 */

import authSlice from "./auth";

const allReducers = { auth: authSlice };
export default allReducers;
