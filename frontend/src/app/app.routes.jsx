import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import { Navigate } from "react-router-dom";
import Protectedroute from "../component/Protectedroute";
import SeekerDashboard from "../features/jobs/pages/SeekerDashboard";
import RecruiterDashboard from "../features/jobs/pages/RecruiterDashboard";
import JobDetail from "../features/jobs/pages/JobDetail";
import Myapplication from "../features/jobs/pages/Myapplication";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetail />,
  },
  {
    path: "/dashboard/seeker",
    element: (
      <Protectedroute role="seeker">
        <SeekerDashboard />
      </Protectedroute>
    ),
  },
  {
    path: "/dashboard/recruiter",
    element: (
      <Protectedroute role="recruiter">
        <RecruiterDashboard />
      </Protectedroute>
    ),
  },
  {
    path: "/application/me",
    element: (
      <Protectedroute role="seeker">
        <Myapplication />
      </Protectedroute>
    ),
  },
]);
