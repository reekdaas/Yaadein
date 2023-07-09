import axios from "axios";

export const logInService = async (userData) =>
  await axios.post(`/api/auth/login`, userData);

export const signUpService = async (
  firstName,
  lastName,
  username,
  password,
  avatarUrl
) =>
  axios.post("/api/auth/signup", {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    avatarUrl: avatarUrl,
  });
