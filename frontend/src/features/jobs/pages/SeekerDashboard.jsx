import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJob";
const SeekerDashboard = () => {
  const { handleGetAllJobs } = useJobs();
  const navigate = useNavigate();
  //read from store
  const job = useSelector((state) => state.jobs.jobs);

  const loading = useSelector((state) => state.jobs.loading);

  //fetch when page loads
  useEffect(() => {
    handleGetAllJobs();
  }, []);
  if (loading) return <h1>loading.....</h1>;

  async function OpenDetailPage(jobId) {
    // <Navigate to={`jobs/${id}`} />;
    navigate(`/jobs/${jobId}`);
  }

  return (
    <div>
      {job.map((job) => (
        <div key={job._id} onClick={() => OpenDetailPage(job._id)}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
};

export default SeekerDashboard;
