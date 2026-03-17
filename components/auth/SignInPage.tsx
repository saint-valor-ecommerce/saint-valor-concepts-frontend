"use client";

import { useState } from "react";
import PasswordInput from "@/components/ui/PasswordInput";
import EmailInput from "@/components/ui/EmailInput";
import Link from "next/link";
import Image from "next/image";
import { signInSchema } from "@/lib/validation/auth";
import Button from "@/components/ui/Button";
import GoogleSSOButton from "@/components/ui/GoogleSSOButton";
import OrDivider from "@/components/ui/OrDivider";
import AuthHeader from "@/components/ui/AuthHeader";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

type SignInFormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
  form?: string;
};

const initialSignInData: SignInFormData = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const [formData, setFormData] = useState<SignInFormData>(initialSignInData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const { setAuth } = useAuthStore();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const { firstName } = await login(formData);
      setAuth(firstName);
      toast.success("Signed in successfully!");
      router.push("/");
    } catch {
      toast.error("Invalid email or password. Please try again.");
      setErrors({ form: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2 w-full">
      <div className="relative hidden lg:block min-h-screen">
        <Image
          src="/images/sign-in.png"
          alt="sign in image"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 lg:px-16">
        <div className="w-full max-w-md bg-white p-6">
          <AuthHeader
            title="Sign In"
            description="Welcome back to Saint Valor — continue your journey through curated luxury jewelry."
          />

          <form onSubmit={handleSubmit} className="mt-3 space-y-2">
            <EmailInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              error={errors.email}
            />

            <div className="space-y-1">
              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                error={errors.password}
              />
              {errors.form && (
                <p className="text-xs text-red-500">{errors.form}</p>
              )}
              <Link href="/forgot-password" className="text-xs text-charcoal">
                Forgot password?
              </Link>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                label="Sign In"
                fullWidth
                loading={loading}
                loadingText="Signing in..."
              />
            </div>

            <p className="text-center text-xs text-secondary">
              Don&apos;t have an account?
              <Link href="/sign-up" className="text-charcoal underline pl-1">
                Sign Up
              </Link>
            </p>
          </form>

          <OrDivider />
          <GoogleSSOButton />
        </div>
      </div>
    </main>
  );
}
