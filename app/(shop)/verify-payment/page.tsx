"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useCartStore } from "@/store/cartStore";

type VerifyState = "loading" | "success" | "processing";

const SUPPORT_EMAIL = "saintvalorconcepts@gmail.com";

const VerifyPaymentPage = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [state, setState] = useState<VerifyState>("loading");
  const [reference] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("reference");
  });

  const verify = useCallback(
    async (ref: string) => {
      try {
        await api.post(`/orders/verify/${ref}`);
        clearCart();
        setState("success");
      } catch {
        setState("processing");
      }
    },
    [clearCart],
  );

  useEffect(() => {
    if (!reference) {
      toast.error("Invalid payment reference.");
      router.push("/cart");
      return;
    }

    const timeout = setTimeout(() => {
      verify(reference);
    }, 0);

    return () => clearTimeout(timeout);
  }, [router, verify, reference]);

  const supportMailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    `Payment processing - ${reference ?? "unknown reference"}`,
  )}&body=${encodeURIComponent(
    `Hi,\n\nI have a question about a payment that's still processing.\n\nReference: ${reference ?? "unknown"}\n\nPlease help.`,
  )}`;

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center gap-4">
        <Loader2 size={36} className="text-gold animate-spin" />
        <p className="text-sm font-medium text-charcoal">
          Verifying your payment...
        </p>
        <p className="text-xs text-secondary">
          Please don&apos;t close this page.
        </p>
      </div>
    );
  }

  if (state === "processing") {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 gap-5">
        <Clock size={40} className="text-gold" />
        <div className="flex flex-col items-center gap-2 max-w-md">
          <p className="text-sm font-medium text-charcoal">
            We&apos;re still processing your payment
          </p>
          <p className="text-xs text-secondary text-center">
            Your payment is being confirmed. This can take a few minutes.
            You&apos;ll see the order in your account once it&apos;s ready. If
            you have your Paystack receipt and need help, contact support with
            the reference below.
          </p>
          {reference && (
            <div className="mt-3 px-4 py-2 bg-white border border-border rounded">
              <p className="text-[10px] text-secondary uppercase tracking-wider">
                Reference
              </p>
              <p className="text-xs font-mono text-charcoal select-all">
                {reference}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/profile/orders"
            className="text-xs font-semibold text-white bg-gold px-6 py-2.5 hover:bg-gold/90 transition-colors duration-200"
          >
            View My Orders
          </Link>
          <a
            href={supportMailto}
            className="text-xs font-medium text-secondary hover:text-charcoal transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 gap-5">
      <CheckCircle size={40} className="text-green-500" />
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-charcoal">Order confirmed!</p>
        <p className="text-xs text-secondary text-center">
          Thank you for your purchase. Your order is being processed.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <Link
          href="/profile/orders"
          className="text-xs font-semibold text-white bg-gold px-6 py-2.5 hover:bg-gold/90 transition-colors duration-200"
        >
          View My Orders
        </Link>
        <Link
          href="/shop"
          className="text-xs font-medium text-secondary hover:text-charcoal transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default VerifyPaymentPage;
