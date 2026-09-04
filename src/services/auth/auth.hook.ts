import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { LoginInput, SignupInput } from "@/schemas/auth";

export const useLogin = (options?: {
  onSuccess?: (data: any, variables: LoginInput) => void;
}) => {
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: (res, variables) => {
      toast.success(res?.message || "Logged in successfully.");
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      if (accessToken && user) {
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
      }
      options?.onSuccess?.(res, variables);
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
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (payload: SignupInput) => authService.signup(payload),
    onSuccess: (res, variables) => {
      toast.success(res?.message || "Registration successful.");
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      if (accessToken && user) {
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
      }
      options?.onSuccess?.(res, variables);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });
};
