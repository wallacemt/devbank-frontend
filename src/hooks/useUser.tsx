import { getUser } from "@/api/userApi";
import { UserResponse } from "@/types/userTypes";

export const useUser = () => {
  const getUserInfo = async (): Promise<UserResponse | undefined> => {
    try {
      const userResponse = await getUser();
      return userResponse;
    } catch (error: any) {
      throw error;
    }
  };
  return { getUserInfo };
};
