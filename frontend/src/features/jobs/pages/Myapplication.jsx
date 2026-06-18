import React, { useState, useEffect } from "react";
import { useApplication } from "../../applications/hooks/useApplication";
import { useSelector } from "react-redux";

const Myapplication = () => {
  const { handleGetMyApplication } = useApplication();

  const application = useSelector((state) => state.application.myApplication);

  const loading = useSelector((state) => state.application.loading);

  // console.log("RAW REDUX STATE:", JSON.stringify(application));

  useEffect(() => {
    handleGetMyApplication();
  }, []);

  if (loading) return <h1>loading....</h1>;

  return (
    <div>
      {application[0]?.applications?.map((item) => (
        <div key={item._id}>
          <h1>{item.job.title}</h1>
          <h2>{item.status}</h2>
        </div>
      ))}
    </div>
  );
};

export default Myapplication;
