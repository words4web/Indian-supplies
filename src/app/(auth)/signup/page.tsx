"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { SignupDetailsForm } from "@/components/auth/SignupDetailsForm";

export default function SignupPage() {
  const { handleSubmit, loading } = useAuthFlow({
    isLogin: false,
  });

  return (
    <div className="w-full max-w-md space-y-6 relative">
      <div className="mt-2">
        <SignupDetailsForm onSubmit={handleSubmit} isPending={loading} />
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
