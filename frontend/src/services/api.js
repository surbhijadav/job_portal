import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh/",
          {
            refresh,
          }
        );

        localStorage.setItem(
          "access_token",
          response.data.access
        );

        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

/* ===========================
   JOB APIs
=========================== */

export const getJobs = async () => {
  const response = await api.get("jobs/");
  return response.data;
};

export const getJob = async (id) => {
  const response = await api.get(`jobs/${id}/`);
  return response.data;
};

/* ===========================
   SAVED JOB APIs
=========================== */

export const saveJob = async (jobId) => {
  const response = await api.post("savedjobs/", {
    job: jobId,
  });

  return response.data;
};

export const getSavedJobs = async () => {
  const response = await api.get("savedjobs/");
  return response.data;
};

export const removeSavedJob = async (savedId) => {
  await api.delete(`savedjobs/${savedId}/`);
};

/* ===========================
   CANDIDATE APIs
=========================== */

export const getRecommendations = async () => {
  const response = await api.get("recommendations/");
  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "resumes/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getCandidateProfile = async () => {
  const response = await api.get("candidates/profile/");
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get("applications/");
  return response.data;
};

/* ===========================
   APPLICATION APIs
=========================== */

export const applyJob = async (jobId) => {
  const response = await api.post("applications/", {
    job: jobId,
  });

  return response.data;
};

/* ===========================
   RECRUITER APIs
=========================== */

export const getRecruiterJobs = async () => {
  const response = await api.get("jobs/");
  return response.data;
};

export const postJob = async (jobData) => {
  const response = await api.post("jobs/", jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.put(`jobs/${id}/`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  await api.delete(`jobs/${id}/`);
};

export async function getDashboardStats() {
  const res = await api.get("analytics/candidate-dashboard/");
  return res.data;
}

export default api;