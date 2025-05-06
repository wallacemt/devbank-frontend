import { getUser } from "@/api/userApi";
import { UserResponse } from "@/types/userTypes";

export const useUser = () => {
  const getUserInfo = async (): Promise<UserResponse | undefined> => {
    try {
      const userResponse = await getUser();
      return userResponse;
    } catch (error) {
      console.error(error);
    }
  };
  return { getUserInfo };
};
