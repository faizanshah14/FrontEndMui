import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";
//axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
axios.defaults.headers.post["Content-Type"] = "application/json";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("jwt", response.data?.data?.accessToken);
    localStorage.setItem("authenticated", true);
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return response;
  }
};
export const register = async (email) => {
  try {
    const response = await axios.post("/auth/signup", {
      email,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return response.message;
  }
};
