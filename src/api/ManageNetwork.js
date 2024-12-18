import axios from "axios";
class ManageNetwork {
  defaultHeaders = {
    "Content-Type": "application/json",
    // You can add other common headers here
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // If you need an Authorization token
  };
  getData(url, headers = {}) {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const combinedHeaders = { ...this.defaultHeaders, ...headers };
    return axios
      .get(`https://fakestoreapi.com/${url}`, { headers: combinedHeaders })
      .then((response) => {
        console.log("MN.js", response.data);
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return { data: error.response.data };
        }
        return { error: "An unexpected error occurred." };
      });
  }
  // POST request with body and optional headers
  postData(url, data, headers = {}) {
    const combinedHeaders = { ...this.defaultHeaders, ...headers };
    console.log(
      "Making POST request to:",
      `${process.env.NEXT_PUBLIC_API_URL}/${url}`
    );
    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, data, {
        headers: combinedHeaders,
      })
      .then((response) => {
        console.log("POST response data:", response.data);
        return response.data;
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }
}

export default new ManageNetwork();
