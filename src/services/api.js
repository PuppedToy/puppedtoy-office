import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
}

function errorHandler(error) {
  if (error?.response?.status === 401) {
    logout();
  }
}

export async function login(name, password) {
  try {
    const response = await api.post("/auth/login", {
      name,
      password,
    });
    return response.data;
  } catch (err) {
    errorHandler(err);
    throw err;
  }
}

export async function getResourceList() {
  try {
    const response = await api.get("/resources");
    return response.data;
  } catch (err) {
    errorHandler(err);
    throw err;
  }
}

export async function getResource(resource) {
  try {
    const response = await api.get(`/resources/${resource}`);
    return response.data;
  } catch (err) {
    errorHandler(err);
    throw err;
  }
}

export async function createResource(resource, data) {
  try {
    const response = await api.post(`/resources/${resource}`, data);
    return response.data;
  } catch (err) {
    errorHandler(err);
    throw err;
  }
}

export async function deleteResource(resource, id) {
  try {
    const response = await api.delete(`/resources/${resource}/${id}`);
    return response.data;
  } catch (err) {
    errorHandler(err);
    throw err;
  }
}

export async function updateResource(resource, id, data) {
  try {
    const response = await api.put(`/resources/${resource}/${id}`, data);
    return response.data;
  } catch (err) {
    errorHandler(err);
    throw err;
  }
}
