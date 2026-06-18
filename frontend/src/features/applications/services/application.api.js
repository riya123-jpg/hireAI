import API from "../../auth/utils/api";

export async function applyToJob(jobId, { resumeUrl, coverLetter }) {
  const response = await API.post(`/application/apply/${jobId}`, {
    resumeUrl,
    coverLetter,
  });
  //   console.log("ho raha hai in appytojob");
  return response.data;
}

export async function getMyApplication() {
  const response = await API.get("/application/me");
  return { applications: [response.data] };
}
