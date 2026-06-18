import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJobs } from "../hooks/useJob";
import { useNavigate, useParams } from "react-router-dom";
import { useApplication } from "../../applications/hooks/useApplication";
const JobDetail = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { handleFetchJobById } = useJobs();
  const { handleApply } = useApplication();

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
  console.log("Applying to job id:", id);
  async function handleApplyJob() {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "seeker") {
      alert("recruiter cannot apply for the job");
      return;
    }
    try {
      await handleApply(id, {
        resumeUrl,
        coverLetter,
      });

      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "failed to apply");
    }
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

      <input
        type="text"
        value={resumeUrl}
        onChange={(e) => {
          setResumeUrl(e.target.value);
        }}
        placeholder="Paste your resume link(google drive,etc..)"
      />
      <br />
      <br />
      <textarea
        value={coverLetter}
        onChange={(e) => {
          setCoverLetter(e.target.value);
        }}
        placeholder="why are you a good fit?"
      ></textarea>
      <br />
      <br />
      <button onClick={handleApplyJob}>Apply Now</button>
    </div>
  );
};

export default JobDetail;
