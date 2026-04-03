"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";

type VerifyState = "loading" | "success" | "error" | "expired";

const VerifyPaymentPage = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [state, setState] = useState<VerifyState>("loading");

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get(
      "reference",
    );

    if (!reference) {
      toast.error("Invalid payment reference.");
      router.push("/cart");
      return;
    }

    const verify = async () => {
      try {
        await api.post(`/orders/verify/${reference}`);
        clearCart();
        localStorage.removeItem("pendingOrder");
        setState("success");
      } catch (error: unknown) {
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "")
          : "";

        if (message.toLowerCase().includes("expired")) {
          setState("expired");
          setTimeout(() => router.push("/cart"), 5000);
        } else {
          setState("error");
          toast.error("Payment verification failed. Redirecting to cart...");
          setTimeout(() => router.push("/cart"), 3000);
        }
      }
    };

    verify();
  }, [router, clearCart]);

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

  if (state === "error") {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 gap-5">
        <XCircle size={40} className="text-burgundy" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-charcoal">Payment failed</p>
          <p className="text-xs text-secondary text-center">
            We couldn&apos;t verify your payment. Redirecting you back to
            cart...
          </p>
        </div>
      </div>
    );
  }

  if (state === "expired") {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 gap-5">
        <XCircle size={40} className="text-burgundy" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-charcoal">Order Expired</p>
          <p className="text-xs text-secondary text-center">
            This order has expired. Please start checkout again.
          </p>
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
          href="/orders/me"
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
