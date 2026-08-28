"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { SignupDetailsForm } from "@/components/auth/SignupDetailsForm";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";

export default function SignupPage() {
  const { step, handleSendOTP, handleVerifyOTP, loading } = useAuthFlow({
    isLogin: false,
  });

  return (
    <div className="w-full max-w-md space-y-6 relative">
      <div className="mt-2">
        {step === "details" ? (
          <SignupDetailsForm onSubmit={handleSendOTP} isPending={loading} />
        ) : (
          <VerifyOtpForm
            description="Enter the 6-digit OTP code sent to your email and mobile."
            onSubmit={handleVerifyOTP}
            isPending={loading}
          />
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          Already have an account? Sign in
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
