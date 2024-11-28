
import axios from "axios";

class CommonAPI {
  defaultHeaders = {
    "Content-Type": "application/json",
    // You can add other common headers here
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // If you need an Authorization token
  };
  getData(url, headers = {},params = {}) {
    // console.log(process.env.NEXT_PUBLIC_API_URL);
    const combinedHeaders = { ...this.defaultHeaders, ...headers };
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, { headers: combinedHeaders,  params: params}).then((response) => {
        // console.log("MN.js", response.data);
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
    postData(url,headers = {}, data) {
      const combinedHeaders = { ...this.defaultHeaders, ...headers };
      // console.log("Making POST request to:", `${process.env.NEXT_PUBLIC_API_URL}/${url}`);
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, data, { headers: combinedHeaders })
        .then((response) => {
          // console.log("POST response data:", response.data);
          return response.data;
        })
        .catch((error) => {
          return JSON.stringify(error);
        });
    }
    putData(url, headers = {}, data) {
      const combinedHeaders = { ...this.defaultHeaders, ...headers };
      // console.log("Making PUT request to:", `${process.env.NEXT_PUBLIC_API_URL}/${url}`);
      return axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, data, { headers: combinedHeaders })
        .then((response) => {
          // console.log("PUT response data:", response);
          if(response.status==200){
            return {status:"success"};
          }
          else{
            return {status:"Failed"};
          }
        })
        .catch((error) => {
          return { error: "An unexpected error occurred." };
        });
    }
}

export default new CommonAPI();
