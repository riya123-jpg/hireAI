import { useDispatch } from "react-redux";
import { setMyapplication, setError, setLoading } from "../application.slice";
import { applyToJob, getMyApplication } from "../services/application.api";

export const useApplication = () => {
  const dispatch = useDispatch();
  async function handleApply(jobId, applicationData) {
    try {
      dispatch(setLoading(true));
      const data = await applyToJob(jobId, applicationData);

      // dispatch(setMyapplication(data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "failed to Apply"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetMyApplication() {
    try {
      dispatch(setLoading(true));
      const data = await getMyApplication();
      dispatch(setMyapplication(data.applications));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "failed to get application"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleApply,
    handleGetMyApplication,
  };
};
