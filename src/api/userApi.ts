import { HttpClient } from "./HttpClient";
import { setAuthHeader } from "./refreshAuth";

const userApi = new HttpClient({
  baseUrl: "http://localhost:3000/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async () => {
  try {
    setAuthHeader(userApi);
    const userResponse = await userApi.get("");
    return userResponse.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
