import API from "../utils/api";

export async function Login({ email, password }) {
  const response = await API.post("/auth/user/login", { email, password });
  return response.data;
}

export async function Register({ name, email, password, role }) {
  const response = await API.post("/auth/user/register", {
    name,
    email,
    password,
    role,
  });
  return response.data;
}

export async function Getme() {
  const response = await API.get("/auth/user/getme");
  return response.data;
}

// export default { Login, Register };
