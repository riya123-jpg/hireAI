import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    currentJob: null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
  },
});

export const { setJobs, setError, setLoading, setCurrentJob } =
  jobSlice.actions;

export default jobSlice.reducer;
