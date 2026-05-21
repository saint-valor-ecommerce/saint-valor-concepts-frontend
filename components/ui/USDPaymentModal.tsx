"use client";

import { useEffect, useRef, useState } from "react";
import { X, Copy, Check, Instagram, Mail, ExternalLink, ClipboardCheck } from "lucide-react";
import { useCurrencyStore } from "@/store/currencyStore";
import { CartItem } from "@/types/cart";
import { toast } from "react-toastify";

interface USDPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPriceNaira: number;
  deliveryFeeNaira: number | null;
  shippingDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    state: string;
    city: string;
    country?: string;
  };
  onConfirm: () => void;
}

interface BankDetails {
  bankName: string;
  transferType: string;
  bankAddress: string;
  routingABA: string;
  swiftCode: string;
  accountNumber: string;
  accountType: string;
  beneficiaryName: string;
}

export default function USDPaymentModal({
  isOpen,
  onClose,
  cartItems,
  totalPriceNaira,
  deliveryFeeNaira,
  shippingDetails,
  onConfirm,
}: USDPaymentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { currency: activeCurrency, formatPrice } = useCurrencyStore();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Defer state updates to prevent synchronous cascading render warning
      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 0);

      fetch("/api/bank-details")
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && resData.data) {
            setBankDetails(resData.data);
          }
        })
        .catch((err) => {
          console.error("Failed to load bank details dynamically:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCopyField = async (label: string, value: string) => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      toast.success(`${label} copied to clipboard!`, { autoClose: 1500 });
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      console.error(`Failed to copy ${label}:`, err);
      toast.error(`Failed to copy ${label} to clipboard. Please copy it manually.`);
    }
  };

  const getOrderSummaryText = () => {
    const formattedSubtotal = formatPrice(totalPriceNaira);
    const formattedShipping = deliveryFeeNaira !== null ? formatPrice(deliveryFeeNaira) : "TBD";
    const formattedTotal = formatPrice(totalPriceNaira + (deliveryFeeNaira ?? 0));
    const countryName = shippingDetails.country || "Nigeria";

    const itemsText = cartItems
      .map(
        (item) =>
          `- ${item.productName} ${item.size ? `(Size: ${item.size})` : ""} x ${item.quantity} - ${formatPrice(
            item.productPrice * item.quantity
          )}`
      )
      .join("\n");

    return `--- SAINT VALOR ORDER SUMMARY ---
Customer: ${shippingDetails.firstName} ${shippingDetails.lastName}
Phone Number: ${shippingDetails.phoneNumber}
Shipping Address: ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${countryName}

Order Items:
${itemsText}

Subtotal: ${formattedSubtotal}
Shipping Fee: ${formattedShipping}
Total Amount Due: ${formattedTotal}
Payment Method: Citibank USD Bank Transfer (${activeCurrency})
---------------------------------`;
  };

  const handleCopySummary = async () => {
    const summary = getOrderSummaryText();
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await navigator.clipboard.writeText(summary);
      setCopiedSummary(true);
      toast.success("Order summary copied to clipboard!", { autoClose: 2000 });
      setTimeout(() => {
        setCopiedSummary(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy summary:", err);
      toast.error("Failed to copy order summary. Please copy it manually.");
    }
  };

  const grandTotalFormatted = formatPrice(totalPriceNaira + (deliveryFeeNaira ?? 0));

  // Pre-filled Email mailto link
  const emailBody = encodeURIComponent(
    `Hi Saint Valor Team,\n\nI have just made a bank transfer payment for my order. Here is my order summary:\n\n${getOrderSummaryText()}\n\nAttached is my proof of payment.\n\nThank you!`
  );
  const mailtoLink = `mailto:saintvalorconcepts@gmail.com?subject=${encodeURIComponent(
    "Proof of Payment - Saint Valor Order"
  )}&body=${emailBody}`;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="backdrop:bg-black/60 bg-transparent p-4 m-auto max-w-lg w-full outline-none"
      aria-labelledby="payment-modal-title"
    >
      <div className="relative bg-ivory rounded-xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-6 text-charcoal outline-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-charcoal transition cursor-pointer p-1 rounded-full hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-2 border-b border-gold/10">
          <h2
            id="payment-modal-title"
            className="text-lg md:text-xl font-bold tracking-wide uppercase text-charcoal"
          >
            USD Citibank Payment
          </h2>
          <p className="text-xs text-secondary mt-1">
            Complete your international order of <span className="font-semibold text-charcoal">{grandTotalFormatted}</span> ({activeCurrency})
          </p>
        </div>

        {/* Bank Details Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-gold/10 rounded-lg p-4 md:p-5 flex flex-col gap-3.5 min-h-[350px] justify-center">
          <p className="text-sm uppercase tracking-wider font-semibold text-secondary border-b border-black/5 pb-1">
            Citibank Account Details
          </p>

          {isLoading || !bankDetails ? (
            <div className="flex flex-col gap-4 py-4 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between items-center gap-4">
                  <div className="h-3 w-1/3 bg-charcoal/10 rounded"></div>
                  <div className="h-3 w-1/2 bg-charcoal/10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            [
              { label: "Beneficiary Name", value: bankDetails.beneficiaryName },
              { label: "Bank Name", value: bankDetails.bankName },
              { label: "Account Number", value: bankDetails.accountNumber },
              { label: "Account Type", value: bankDetails.accountType },
              { label: "Routing (ABA)", value: bankDetails.routingABA },
              { label: "SWIFT Code", value: bankDetails.swiftCode },
              { label: "Transfer Type", value: bankDetails.transferType },
              { label: "Bank Address", value: bankDetails.bankAddress },
            ].map((field) => (
              <div key={field.label} className="flex justify-between items-start gap-4 text-xs">
                <span className="text-secondary font-medium shrink-0 pt-0.5">{field.label}:</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-semibold text-charcoal text-right break-all select-all">
                    {field.value}
                  </span>
                  <button
                    onClick={() => handleCopyField(field.label, field.value)}
                    className="text-secondary cursor-pointer transition p-1 hover:bg-black/5 rounded shrink-0"
                    title={`Copy ${field.label}`}
                  >
                    {copiedField === field.label ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Copy Order Details Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopySummary}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gold/30 rounded-md text-xs font-semibold text-charcoal shadow-sm transition duration-200 cursor-pointer"
          >
            {copiedSummary ? (
              <>
                <ClipboardCheck className="w-4 h-4 text-green-600 animate-bounce" />
                <span>Order Summary Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gold" />
                <span>Copy Full Order Summary to Clipboard</span>
              </>
            )}
          </button>
          <p className="text-[10px] text-secondary text-center">
            Tip: Copying the summary lets you quickly paste your cart & shipping details to our team.
          </p>
        </div>

        {/* Post Payment Instructions */}
        <div className="border-t border-gold/10 pt-4 flex flex-col gap-4">
          <div className="bg-gold/5 border border-gold/20 rounded-lg p-4">
            <p className="text-xs font-medium text-charcoal leading-relaxed text-center">
              ⚠️ <span className="font-semibold">Important Instruction:</span> After making the Citibank local transfer, please reach out to the <span className="font-semibold">Saint Valor team</span> with your payment receipt using any of the channels below to instantly finalize your order.
            </p>
          </div>

          {/* Social Channels Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://www.instagram.com/saint.valor_?igsh=eWQwcXVjb3Bpb3Fy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 bg-charcoal hover:bg-charcoal/90 text-white rounded-md text-xs font-semibold tracking-wide transition duration-200 shadow-md"
            >
              <span className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-gold" />
                Instagram (@saint.valor_)
              </span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={mailtoLink}
              className="flex items-center justify-between px-4 py-3 bg-white hover:bg-black/5 border border-border text-charcoal rounded-md text-xs font-semibold tracking-wide transition duration-200 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                Email Support
              </span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-secondary mt-1">
            <span>Other socials:</span>
            <a
              href="https://x.com/saintvalor_?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold flex items-center gap-1 font-medium transition"
            >
              Twitter/X
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gold/10">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full py-3.5 bg-gold text-white text-sm font-semibold hover:bg-gold/90 transition duration-200 shadow-lg cursor-pointer text-center tracking-wide"
          >
            I Have Made the Transfer
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 border border-border text-secondary text-xs rounded hover:bg-black/5 transition cursor-pointer text-center"
          >
            Cancel and Go Back
          </button>
        </div>
      </div>
    </dialog>
  );
}
