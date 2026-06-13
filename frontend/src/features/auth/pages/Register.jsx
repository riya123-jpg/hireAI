import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(role);
    const data = await handleRegister({
      name,
      email,
      password,
      role,
    });
    console.log(data);
    if (data.user.role === "seeker") {
      navigate("/dashboard/seeker");
    } else {
      navigate("/dashboard/recruiter");
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter name"
      />
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
      <select
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
        }}
      >
        <option value="seeker">Job Seeker</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
