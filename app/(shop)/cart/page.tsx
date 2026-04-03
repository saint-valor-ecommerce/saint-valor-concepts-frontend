"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ChevronLeft, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { getUserProfile } from "@/lib/api/auth";
import { initializeOrder, buildOrderItems } from "@/lib/api/order";
import { NIGERIAN_STATES } from "@/lib/utils";
import AuthPromptModal from "@/components/ui/AuthPromptModal";

type ShippingForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  state: string;
  city: string;
};

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const { isLoggedIn } = useAuthStore();

  const [form, setForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Pre-fill first and last name from profile
  useEffect(() => {
    if (!isLoggedIn) return;
    getUserProfile()
      .then((user) => {
        setForm((prev) => ({
          ...prev,
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
        }));
      })
      .catch(() => {});
  }, [isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    const { firstName, lastName, phoneNumber, address, state, city } = form;
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !state ||
      !city
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await initializeOrder({
        items: buildOrderItems(items),
        firstName,
        lastName,
        countryCode: "+234",
        phoneNumber,
        address,
        country: "Nigeria",
        state,
        city,
        shippingMethod: "standard",
      });

      localStorage.setItem("pendingOrder", data.orderId);
      window.location.href = data.authorization_url;
    } catch {
      toast.error("Could not initialize payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 gap-5">
        <ShoppingBag size={40} className="text-border" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-charcoal">
            Your cart is empty
          </p>
          <p className="text-xs text-secondary text-center">
            Looks like you haven&apos;t added anything yet.
          </p>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-white bg-gold px-6 py-2.5 hover:bg-gold/90 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full border border-border bg-white px-3 py-2.5 text-xs text-charcoal placeholder:text-secondary focus:outline-none focus:border-charcoal transition-colors";

  return (
    <div className="min-h-screen bg-ivory px-4 md:px-16 py-10">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-xs text-secondary hover:text-charcoal transition-colors mb-8"
        >
          <ChevronLeft size={14} />
          Continue Shopping
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-charcoal tracking-wide">
            Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-secondary hover:text-burgundy transition-colors cursor-pointer"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* Left col — cart items + shipping form */}
          <div className="flex-1 flex flex-col">
            {/* Cart items */}
            <div className="flex flex-col divide-y divide-border">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 py-5"
                >
                  <Link
                    href={`/shop/${item.productId}`}
                    className="relative w-20 h-24 md:w-24 md:h-28 shrink-0 overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={item.mainImage}
                      alt={item.productName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col gap-1.5 py-1">
                    <Link
                      href={`/shop/${item.productId}`}
                      className="text-sm font-medium text-charcoal leading-snug hover:text-gold transition-colors"
                    >
                      {item.productName}
                    </Link>

                    {item.size && (
                      <p className="text-xs text-secondary">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="text-sm font-semibold text-charcoal">
                      ₦{(item.productPrice ?? 0).toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            item.quantity === 1
                              ? removeFromCart(item.productId, item.size)
                              : updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity - 1,
                                )
                          }
                          className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-gray-100 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-medium text-charcoal border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-gray-100 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.productId, item.size)
                        }
                        className="flex items-center gap-1 text-xs text-secondary hover:text-burgundy transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping details form */}
            <div className="pt-8 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-charcoal tracking-wide">
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={inputClass}
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={inputClass}
                />
              </div>

              <div className="flex items-center border border-border bg-white overflow-hidden">
                <span className="px-3 text-xs text-secondary border-r border-border py-2.5 bg-white shrink-0">
                  +234
                </span>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="flex-1 px-3 py-2.5 text-xs text-charcoal placeholder:text-secondary focus:outline-none"
                />
              </div>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Delivery address"
                className={inputClass}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-72 shrink-0 border border-border bg-white p-6 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-charcoal tracking-wide">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-xs text-secondary">
              <div className="flex justify-between">
                <span>
                  Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                  items)
                </span>
                <span className="text-charcoal font-medium">
                  ₦{totalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-charcoal font-medium">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-charcoal">Total</span>
              <span className="text-sm font-semibold text-charcoal">
                ₦{totalPrice().toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full bg-gold text-white py-3.5 text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
              {isSubmitting ? "Processing..." : "Proceed to Checkout"}
            </button>

            <p className="text-[11px] text-secondary text-center">
              Secure checkout powered by Paystack
            </p>
          </div>
        </div>
      </div>

      <AuthPromptModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        icon={<ShoppingBag className="w-6 h-6 stroke-gold" />}
        title="Sign in to proceed to checkout"
        description="Create an account or sign in to complete your purchase."
      />
    </div>
  );
};

export default CartPage;
