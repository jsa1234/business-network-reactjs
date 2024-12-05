
import axios from "axios";

class LoginAPI {
  defaultHeaders = {
    "Content-Type": "application/json",
  };
    // POST request with body and optional headers
    login(url='Vendor/login',headers = {}, data) {
      const combinedHeaders = { ...this.defaultHeaders, ...headers };
      console.log("Making Login request to:", `${process.env.NEXT_PUBLIC_API_URL}/${url}`);
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, data, { headers: combinedHeaders })
        .then((response) => {
          console.log("Login response data:", response.data);
          return response.data;
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
          return JSON.stringify(error);
        });
    }
}

export default new LoginAPI();
