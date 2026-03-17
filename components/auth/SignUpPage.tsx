"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "@/components/ui/PasswordInput";
import EmailInput from "@/components/ui/EmailInput";
import TextInput from "@/components/ui/TextInput";
import { signUpSchema } from "@/lib/validation/auth";
import Button from "@/components/ui/Button";
import GoogleSSOButton from "@/components/ui/GoogleSSOButton";
import OrDivider from "@/components/ui/OrDivider";
import AuthHeader from "@/components/ui/AuthHeader";
import { signUp } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type SignUpFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type FormErrors = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  form?: string;
};

const initialSignUpData: SignUpFormData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>(initialSignUpData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = signUpSchema.safeParse(formData);

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
      await signUp(formData);
      toast.success("Account created successfully!");
      router.push(`/otp?email=${encodeURIComponent(formData.email)}`);
    } catch {
      toast.error("Could not create your account. Please try again.");
      setErrors({ form: "Could not create your account. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2 w-full">
      <div className="relative hidden lg:block min-h-screen">
        <Image
          src="/images/sign-up.png"
          alt="sign up image"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-6">
          <AuthHeader
            title="Sign Up"
            description="Join Saint Valor and unlock exclusive access to our curated fine
            jewelry collections."
          />

          <form onSubmit={handleSubmit} className="mt-3 space-y-2">
            <div className="space-y-1.5">
              <EmailInput
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                error={errors.email}
              />
            </div>

            <div className="relative">
              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                error={errors.password}
              />
            </div>

            <div className="grid gap-3 grid-cols-2">
              <TextInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                error={errors.firstName}
              />

              <TextInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                error={errors.lastName}
              />
            </div>

            <Button
              type="submit"
              label="Create Account"
              fullWidth
              loading={loading}
              loadingText="Creating account..."
            />

            <p className="pt-1 text-center text-xs text-secondary">
              Already have an account?
              <Link href="/sign-in" className="text-charcoal underline pl-2">
                Log In
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
