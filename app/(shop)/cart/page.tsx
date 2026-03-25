"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ChevronLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCartStore();

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

  return (
    <div className="min-h-screen bg-ivory px-4 md:px-16 py-10">
      {/* Header */}
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
          {/* Cart items */}
          <div className="flex-1 flex flex-col divide-y divide-border">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 py-5"
              >
                {/* Image */}
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

                {/* Details */}
                <div className="flex flex-1 flex-col gap-1.5 py-1">
                  <Link
                    href={`/shop/${item.productId}`}
                    className="text-sm font-medium text-charcoal leading-snug hover:text-gold transition-colors"
                  >
                    {item.productName}
                  </Link>

                  {item.size && (
                    <p className="text-xs text-secondary">Size: {item.size}</p>
                  )}

                  <p className="text-sm font-semibold text-charcoal">
                    ₦{(item.productPrice ?? 0).toLocaleString()}
                  </p>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    {/* Quantity controls */}
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

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
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

            <button className="w-full bg-gold text-white py-3.5 text-sm font-medium hover:bg-gold/90 transition-colors duration-200 cursor-pointer">
              Proceed to Checkout
            </button>

            <p className="text-[11px] text-secondary text-center">
              Secure checkout powered by Paystack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
