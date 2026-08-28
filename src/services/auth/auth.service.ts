import { axiosInstance } from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";
import { SignupInput } from "@/schemas/auth";

export const authService = {
  login: async (payload: { email: string }) => {
    const response = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, payload);
    return response.data;
  },

  signup: async (payload: SignupInput) => {
    const response = await axiosInstance.post(API_ROUTES.AUTH.SIGNUP, payload);
    return response.data;
  },

  verifyOtp: async (payload: { email: string; otp: string }) => {
    const response = await axiosInstance.post(
      API_ROUTES.AUTH.VERIFY_OTP,
      payload,
    );
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
    return response.data;
  },

  refreshToken: async () => {
    const response = await axiosInstance.post(API_ROUTES.AUTH.REFRESH_TOKEN);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get(API_ROUTES.PROFILE);
    return response.data;
  },
};
