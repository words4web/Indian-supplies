"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { LoginDetailsForm } from "@/components/auth/LoginDetailsForm";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";

export default function LoginPage() {
  const { step, handleSendOTP, handleVerifyOTP, loading } = useAuthFlow({
    isLogin: true,
  });

  return (
    <div className="w-full max-w-md space-y-6 relative">
      <div className="mt-2">
        {step === "details" ? (
          <LoginDetailsForm
            onSubmit={(data) => handleSendOTP({ email: data.email })}
            isPending={loading}
          />
        ) : (
          <VerifyOtpForm
            description="Enter the 6-digit OTP code sent to your email and mobile number."
            onSubmit={handleVerifyOTP}
            isPending={loading}
          />
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Link
          href="/signup"
          className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          Don&apos;t have an account? Sign up
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}
