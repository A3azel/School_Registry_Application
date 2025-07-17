import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getSchools = (filters = {}) => {
  return axios.get(`${API_BASE_URL}/schools`, {
    params: filters,
  });
};

export const createSchool = (school) => {
  return axios.post(`${API_BASE_URL}/schools`, school);
};

export const deactivateSchool = (id) => {
  return axios.patch(`${API_BASE_URL}/schools/${id}/deactivate`);
};

export const activateSchool = (id) => {
  return axios.patch(`${API_BASE_URL}/schools/${id}/activate`);
};
