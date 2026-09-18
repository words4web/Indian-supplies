import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLogin, useSignup } from "@/services/auth/auth.hook";
import { LoginInput, SignupInput } from "@/schemas/auth";
import { ROUTES } from "@/constants/routes";

export function useAuthFlow({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();

  const loginMutation = useLogin({
    onSuccess: () => {
      router.push(ROUTES.HOME);
    },
  });

  const signupMutation = useSignup({
    onSuccess: () => {
      router.push(ROUTES.LOGIN);
    },
  });

  const handleSubmit = useCallback(
    (data: LoginInput | SignupInput) => {
      if (isLogin) {
        loginMutation.mutate(data as LoginInput);
      } else {
        signupMutation.mutate(data as SignupInput);
      }
    },
    [isLogin, loginMutation, signupMutation],
  );

  const loading = loginMutation.isPending || signupMutation.isPending;

  return {
    handleSubmit,
    loading,
  };
}

export default useAuthFlow;
