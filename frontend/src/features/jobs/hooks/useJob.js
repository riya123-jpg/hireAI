import { useDispatch } from "react-redux";
import { setError, setLoading, setJobs, setCurrentJob } from "../job.slice";
import { fetchAllJobs, fetchJobById } from "../services/job.api";

export const useJobs = () => {
  const disptach = useDispatch();
  async function handleGetAllJobs() {
    try {
      disptach(setLoading(true));
      const data = await fetchAllJobs();
      disptach(setJobs(data));
      // return response;
    } catch (err) {
      disptach(setError(err.response?.data?.message || "failed to fetch jobs"));
    } finally {
      disptach(setLoading(false));
    }
  }

  async function handleFetchJobById(id) {
    try {
      disptach(setLoading(true));
      const data = await fetchJobById(id);
      disptach(setCurrentJob(data));
    } catch (err) {
      disptach(setError(err.response?.data?.message || "failed to fetch job"));
    } finally {
      disptach(setLoading(false));
    }
  }
  return {
    handleGetAllJobs,
    handleFetchJobById,
  };
};
