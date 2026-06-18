import { createSlice } from "@reduxjs/toolkit";
// import { setLoading } from "../jobs/job.slice";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    myApplication: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMyapplication: (state, action) => {
      state.myApplication = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMyapplication, setLoading, setError } =
  applicationSlice.actions;

export default applicationSlice.reducer;
