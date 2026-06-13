import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJobs } from "../hooks/useJob";
import { useNavigate, useParams } from "react-router-dom";
const JobDetail = () => {
  const { handleFetchJobById } = useJobs();

  const { id } = useParams();

  //
  const job = useSelector((state) => state.jobs.currentJob);

  const loading = useSelector((state) => state.jobs.loading);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchJobById(id);
  }, []);

  if (loading) return <h1>loading....</h1>;

  async function handleApply() {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "seeker") {
      alert("recruiter cannot apply for the job");
      return;
    }
    console.log("applying to job:", id);
  }

  return (
    <div>
      <h1>{job?.title}</h1>
      <h3>{job?.company}</h3>
      <p>{job?.location}</p>
      <p>{job?.description}</p>
      <p>{job?.jobType}</p>
      <p>
        Salary: {job?.salary?.min} - {job?.salary?.max}
      </p>

      <button onClick={handleApply}>Apply Now</button>
    </div>
  );
};

export default JobDetail;
