import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import jobRedeucer from "../features/jobs/job.slice";
import applicationReducer from "../features/applications/application.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobRedeucer,
    application: applicationReducer,
  },
});
