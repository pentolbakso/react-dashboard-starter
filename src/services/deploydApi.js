import axios from "axios";

const API_URL = "http://162.246.59.94:2403";

const createAxios = () => {
  let instance = axios.create({
    timeout: 30000,
    withCredentials: true
  });

  instance.interceptors.request.use(request => {
    console.log("Request", request);
    return request;
  });

  instance.interceptors.response.use(response => {
    console.log("Response:", response);
    return response;
  });

  return instance;
};

export const login = (username, password) => {
  const url = `${API_URL}/admins/login`;
  console.log(url);
  return createAxios().post(url, {
    username: username,
    password: password
  });
};

export const logout = () => {
  const url = `${API_URL}/admins/logout`;
  console.log(url);
  return createAxios().post(url, {});
};

export const getProfile = () => {
  const url = `${API_URL}/admins/me`;
  console.log(url);
  return createAxios().get(url);
};

export const updateProfile = (id, admin) => {
  const url = `${API_URL}/admins/${id}`;
  console.log(url, admin);
  if (!admin.password) delete admin.password;
  return createAxios().put(url, admin);
};
