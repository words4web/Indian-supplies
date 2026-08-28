import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { SignupInput } from "@/schemas/auth";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/store/cartSlice";

export const useLogin = (options?: {
  onSuccess?: (data: any, variables: { email: string }) => void;
}) => {
  return useMutation({
    mutationFn: (payload: { email: string }) => authService.login(payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "OTP sent to your email.");
      options?.onSuccess?.(data, variables);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Sign in failed. Please check your credentials.",
      );
    },
  });
};

export const useSignup = (options?: {
  onSuccess?: (data: any, variables: SignupInput) => void;
}) => {
  return useMutation({
    mutationFn: (payload: SignupInput) => authService.signup(payload),
    onSuccess: (data, variables) => {
      toast.success(data?.message || "OTP sent to your number and email.");
      options?.onSuccess?.(data, variables);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });
};

export const useVerifyOtp = (options?: {
  onSuccess?: (res: any, variables: { email: string; otp: string }) => void;
}) => {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (payload: { email: string; otp: string }) =>
      authService.verifyOtp(payload),
    onSuccess: (res, variables) => {
      toast.success("Successfully verified!");
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      signIn(
        {
          id: user?.id,
          name: user?.fullName,
          email: user?.email,
          business: user?.businessName || "",
          addresses: user?.addresses || [],
        },
        accessToken,
      );
      options?.onSuccess?.(res, variables);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    },
  });
};
