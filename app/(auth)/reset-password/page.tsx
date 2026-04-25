"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/lib/validation/auth";
import { resetPassword } from "@/lib/api/auth";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import AuthHeader from "@/components/ui/AuthHeader";
import AuthWrapper from "@/components/auth/AuthWrapper";

type FormErrors = {
  password?: string;
  confirmPassword?: string;
  form?: string;
};
type FormData = { password: string; confirmPassword: string };

const INITIAL: FormData = { password: "", confirmPassword: "" };

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      setErrors({
        form: "Invalid or missing reset token. Please request a new link.",
      });
      return;
    }

    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        password: fieldErrors.password?.[0] || "",
        confirmPassword: fieldErrors.confirmPassword?.[0] || "",
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, formData.password, formData.confirmPassword);
      router.push("/reset-password/success");
    } catch {
      setErrors({ form: "Failed to reset password. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthWrapper>
      <main className="flex items-center justify-center bg-white p-6 rounded-2xl mx-4">
        <div className="w-full max-w-md space-y-4">
          <AuthHeader
            title="Create New Password"
            description="Enter a password you can remember, to secure your account"
          />

          {errors.form && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              error={errors.password}
            />
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
            />
            <Button
              type="submit"
              label="Reset Password"
              fullWidth
              loading={loading}
              loadingText="Resetting Password..."
            />
          </form>
        </div>
      </main>
    </AuthWrapper>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
