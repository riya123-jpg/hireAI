import API from "../../auth/utils/api";

export async function fetchAllJobs() {
  const response = await API.get("/jobs");
  return response.data;
}
export async function fetchJobById(id) {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
}
