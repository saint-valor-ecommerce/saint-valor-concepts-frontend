"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/lib/axios";
import Button from "@/components/ui/Button";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  const masked = "***" + local.slice(-4);
  return `${masked}@${domain}`;
}

export default function OtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(null);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = Array(6).fill("");
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const lastIndex = Math.min(pasted.length, 5);
    inputRefs.current[lastIndex]?.focus();
  }

  async function handleSubmit() {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/v1/auth/verify-email", { email, otp: otpValue });
      toast.success("Email verified successfully!");
      router.push("/sign-in");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Invalid OTP. Please try again."
        : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (countdown > 0) return;
    try {
      setResending(true);
      await api.post("/api/v1/auth/resend-otp", { email });
      toast.success("OTP resent successfully!");
      setCountdown(60);
      setOtp(Array(6).fill(""));
      setError(null);
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Failed to resend OTP."
        : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm">
        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
            <Image
              src="/images/auth/otp.png"
              alt="OTP lock"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-charcoal text-center mb-2">
          OTP Verification
        </h1>

        {/* Subtitle */}
        <p className="text-xs text-secondary text-center mb-8">
          Enter the code we sent to your email address{" "}
          {email && (
            <span className="font-medium text-charcoal">
              {maskEmail(email)}
            </span>
          )}
        </p>

        {/* OTP Inputs */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={[
                "w-11 h-11 text-center text-sm font-semibold text-charcoal",
                "border rounded-lg outline-none transition-colors",
                "focus:border-gold focus:ring-1 focus:ring-gold",
                digit ? "border-gold" : "border-black/20",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Resend */}
        <div className="flex justify-start mb-6 mt-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || resending}
            className="text-xs text-charcoal disabled:cursor-not-allowed"
          >
            <span className={countdown > 0 ? "text-secondary" : "underline"}>
              Resend Code
            </span>
            {countdown > 0 && (
              <span className="text-secondary ml-1">
                in 0:{String(countdown).padStart(2, "0")}s
              </span>
            )}
          </button>
        </div>

        {/* Continue button */}
        <Button
          label="Continue"
          fullWidth
          loading={loading}
          loadingText="Verifying..."
          onClick={handleSubmit}
        />
      </div>
    </main>
  );
}
