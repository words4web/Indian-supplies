import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/common/Input";
import { signupSchema, SignupInput } from "@/schemas/auth";

export function SignupDetailsForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (data: SignupInput) => void;
  isPending: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6">
        <h2 className="font-serif text-2xl font-bold">
          Register Business Details
        </h2>
      </div>
      <div className="mt-7 space-y-5">
        <Input
          label="Full Name"
          placeholder="e.g. Jane Doe"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label="Business Name"
          placeholder="e.g. Spice House Ltd"
          error={errors.businessName?.message}
          {...register("businessName")}
        />

        <Input
          label="Enter your business email"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Mobile Number"
          placeholder="e.g. 07123456789"
          error={errors.mobileNumber?.message}
          {...register("mobileNumber")}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-foreground">Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 w-full rounded-xl border border-input bg-background pl-3 pr-10 text-sm font-normal outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50%] -translate-y-[50%] text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none">
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <p
              className="text-xs font-semibold text-destructive mt-0.5"
              role="alert">
              {errors.password?.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="mt-7 w-full cursor-pointer"
        size="lg"
        disabled={isPending}>
        {isPending ? "Submitting..." : "Sign Up"} <ArrowRight />
      </Button>
    </form>
  );
}

export default SignupDetailsForm;
