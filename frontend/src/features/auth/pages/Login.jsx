import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Sending to backend:", email, password);
      const data = await handleLogin({ email, password });
      console.log(data);

      if (data.user.role === "seeker") {
        navigate("/dashboard/seeker");
      } else {
        navigate("/dashboard/recruiter");
      }
    } catch (Err) {
      console.log(Err.message);
    }
    // console.log(email, password);
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
