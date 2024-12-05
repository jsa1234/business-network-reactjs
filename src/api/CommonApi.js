import axios from "axios";

class CommonAPI {
  defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: ``,
  };

  constructor() {
    // Set the Authorization header if the token is available in sessionStorage (client-side only)
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        this.defaultHeaders.Authorization = `Bearer ${token}`;
      }
    }
  }

  // GET request with optional headers and query params
  getData(url, headers = {}, params = {}) {
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    return axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        headers: combinedHeaders,
        params: params,
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return { data: error.response.data };
        }
        return { error: "An unexpected error occurred." };
      });
  }

  // POST request with body and optional headers
  postData(url, headers = {}, data) {
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, data, {
        headers: combinedHeaders,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("POST error:", error);
        return { error: "An unexpected error occurred." };
      });
  }

  // PUT request with body and optional headers
  putData(url, headers = {}, data) {
    // Check if data is FormData
    const isFormData = data instanceof FormData;

    // Combine headers, exclude Content-Type if data is FormData
    const combinedHeaders = isFormData
      ? { ...this.defaultHeaders, ...headers, "Content-Type": undefined }
      : { ...this.defaultHeaders, ...headers };

    return axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, data, {
        headers: combinedHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return { status: "Failed" };
      })
      .catch((error) => {
        console.error("PUT error:", error);
        return { error: "An unexpected error occurred." };
      });
  }

  deleteData(url, headers = {}, data) {
    // Combine default and custom headers
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    return axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        headers: combinedHeaders,
        data, // Include data in the request body if provided
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("DELETE error:", error);
        if (error.response) {
          return { data: error.response.data };
        }
        return { error: "An unexpected error occurred." };
      });
  }
}

export default new CommonAPI();
