import axiosInstance from "../services/AxiosInstance";

export function getAllProjects(auth) {
  return axiosInstance.get(`api/buyer/`);
}
 