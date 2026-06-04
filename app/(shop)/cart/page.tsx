"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, Trash2, ChevronLeft, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { getUserProfile } from "@/lib/api/auth";
import {
  initializeOrder,
  buildOrderItems,
  getDeliveryFees,
} from "@/lib/api/order";
import { NIGERIAN_STATES } from "@/lib/utils";
import AuthPromptModal from "@/components/ui/AuthPromptModal";
import USDPaymentModal from "@/components/ui/USDPaymentModal";
import { useCurrencyStore } from "@/store/currencyStore";
import { ShippingForm } from "@/types/shippingForm";
import { DeliveryFeesData } from "@/types/shopOrder";
import dynamic from "next/dynamic";

const USD_SHIPPING_FEE = 80;

const CartPageClient = () => {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { currency, formatPrice, rates } = useCurrencyStore();

  const [form, setForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUSDPaymentModal, setShowUSDPaymentModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryFeesData | null>(
    null,
  );

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
      .catch(() => { });
  }, [isLoggedIn]);

  // Fetch delivery fees
  useEffect(() => {
    getDeliveryFees().then(setDeliveryData).catch(console.error);
  }, []);

  // Calculate delivery fee
  const deliveryFee = useMemo(() => {
    if (currency !== "NGN") {
      const usdRate = rates.USD || 0.00067;
      return USD_SHIPPING_FEE / usdRate;
    }
    if (!form.state) return null;
    if (!deliveryData) return 15000; // Safety fallback

    // Try exact match first
    if (deliveryData.fees[form.state] !== undefined) {
      return deliveryData.fees[form.state];
    }

    // Fallback to the backend's default fee
    return deliveryData.defaultFee;
  }, [currency, form.state, deliveryData, rates]);

  const inputClass =
    "w-full bg-white px-3 py-2.5 text-xs text-charcoal placeholder:text-secondary focus:outline-none focus:border-charcoal transition-colors";

  // 2. Early return AFTER hooks
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currency === "NGN") {
      const cleaned = e.target.value.replace(/\D/g, "").slice(0, 11);
      setForm((prev) => ({ ...prev, phoneNumber: cleaned }));
    } else {
      // International phone format: allow digits and a single leading +, max 15 digits
      const val = e.target.value;
      const hasPlus = val.startsWith("+");
      const digits = val.replace(/\D/g, "");
      const cleaned = (hasPlus ? "+" : "") + digits.slice(0, 15);
      setForm((prev) => ({ ...prev, phoneNumber: cleaned }));
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    const { firstName, lastName, phoneNumber, address, state, city, country } = form;
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !state ||
      !city ||
      (currency !== "NGN" && !country)
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    if (currency === "NGN") {
      if (phoneNumber.length !== 11 || !phoneNumber.startsWith("0")) {
        toast.error("Enter a valid phone number (e.g. 08012345678).");
        return;
      }
    } else {
      const digitCount = phoneNumber.replace(/\D/g, "").length;
      if (digitCount < 7 || digitCount > 15) {
        toast.error("Enter a valid phone number (between 7 and 15 digits).");
        return;
      }
    }

    // International orders using USD/GBP/CAD bypass Paystack and go to Citibank Bank Transfer Modal
    if (currency !== "NGN") {
      setShowUSDPaymentModal(true);
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

      window.location.href = data.authorization_url;
    } catch {
      toast.error("Could not initialize payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmUSDPayment = () => {
    clearCart();
    toast.success("Order request sent! Please contact us on Instagram/Email with your payment receipt.");
    router.push("/profile/orders");
  };

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
                  <div className="relative w-20 h-24 md:w-24 md:h-28 shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={item.mainImage}
                      alt={item.productName}
                      fill
                      sizes="(max-width: 768px) 160px, 192px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1.5 py-1">
                    <p className="text-sm font-medium text-charcoal">
                      {item.productName}
                    </p>

                    {item.size && (
                      <p className="text-xs text-secondary">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="text-sm font-semibold text-charcoal">
                      {formatPrice(item.productPrice ?? 0)}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex flex-col gap-1">
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
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        {item.quantity >= item.stock && (
                          <p className="text-[10px] text-burgundy mt-1 font-medium">
                            Max stock reached
                          </p>
                        )}
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
                <div className="flex items-center bg-white overflow-hidden">
                  <span className="px-3 text-xs text-secondary border-r border-border py-2.5 bg-white shrink-0">
                    First Name
                  </span>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="First name"
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center bg-white overflow-hidden">
                  <span className="px-3 text-xs text-secondary border-r border-border py-2.5 bg-white shrink-0">
                    Last Name
                  </span>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Last name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex items-center border border-border bg-white overflow-hidden">
                <span className="px-3 text-xs text-secondary border-r border-border py-2.5 bg-white shrink-0">
                  Phone Number
                </span>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handlePhoneChange}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="flex-1 px-3 py-2.5 text-xs text-charcoal placeholder:text-secondary focus:outline-none"
                />
              </div>

              <div className="flex items-center bg-white overflow-hidden">
                <span className="px-3 text-xs text-secondary border-r border-border py-2.5 bg-white shrink-0">
                  Address
                </span>

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  className={inputClass}
                />
              </div>

              {currency !== "NGN" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    name="country"
                    value={form.country || ""}
                    onChange={handleChange}
                    placeholder="Country"
                    className={inputClass}
                  />
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State / Province"
                    className={inputClass}
                  />
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={inputClass}
                  />
                </div>
              ) : (
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
              )}
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
                  {formatPrice(totalPrice())}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal font-medium">
                    {currency !== "NGN"
                      ? formatPrice(deliveryFee ?? 0)
                      : form.state && deliveryFee !== null
                      ? formatPrice(deliveryFee)
                      : "Select state to see fee"}
                  </span>
                </div>
                {/* Standard rate disclaimer */}
                {currency === "NGN" &&
                  form.state &&
                  deliveryData &&
                  deliveryData.fees[form.state] === undefined && (
                    <p className="text-[10px] text-secondary/70 italic text-right">
                      * Standard delivery rate applied
                    </p>
                  )}

                {/* Initial disclaimer */}
                {currency === "NGN" && !form.state && deliveryData && (
                  <p className="text-[10px] text-secondary/70 italic text-right">
                    * Standard fee of {formatPrice(deliveryData.defaultFee)} applies to unlisted states
                  </p>
                )}

                {/* International disclaimer */}
                {currency !== "NGN" && (
                  <p className="text-[10px] text-secondary/70 italic text-right">
                    * Flat-rate international express shipping
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-charcoal">Total</span>
              <span className="text-sm font-semibold text-charcoal">
                {formatPrice(totalPrice() + (deliveryFee ?? 0))}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full bg-gold text-white py-3.5 text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer text-center"
            >
              {isSubmitting ? "Processing..." : currency === "NGN" ? "Proceed to Checkout" : "Proceed to Payment"}
            </button>

            <p className="text-[11px] text-secondary text-center">
              {currency === "NGN"
                ? "Secure checkout powered by Paystack"
                : "Secure checkout via Citibank USD Bank Transfer"}
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

      <USDPaymentModal
        isOpen={showUSDPaymentModal}
        onClose={() => setShowUSDPaymentModal(false)}
        cartItems={items}
        totalPriceNaira={totalPrice()}
        deliveryFeeNaira={deliveryFee}
        shippingDetails={form}
        onConfirm={handleConfirmUSDPayment}
      />
    </div>
  );
};

const CartPage = dynamic(() => Promise.resolve(CartPageClient), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-sm font-medium text-charcoal">Loading Cart...</div>
    </div>
  ),
});

export default CartPage;
