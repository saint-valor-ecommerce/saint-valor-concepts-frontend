"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Address } from "@/types/address";

interface BillingAddressProps {
  address: Address | null;
  onSave: (address: Address) => void;
}

const COUNTRIES = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Ghana",
  "South Africa",
];
const STATES: Record<string, string[]> = {
  Nigeria: ["Lagos", "Abuja", "Rivers", "Kano", "Oyo", "Delta", "Enugu"],
  "United States": ["California", "New York", "Texas", "Florida", "Illinois"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  Ghana: ["Greater Accra", "Ashanti", "Western", "Eastern"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
};

const EMPTY_FORM: Address = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

const BillingAddress = ({ address, onSave }: BillingAddressProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Address>(EMPTY_FORM);

  const handleChange = (field: keyof Address, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpen = () => {
    setFormData(address ?? EMPTY_FORM);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(formData);
      setShowModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  const availableStates = STATES[formData.country] ?? [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">
          Billing Address
        </h3>
        <button
          onClick={handleOpen}
          className="px-4 py-1.5 border border-gold text-gold text-xs rounded-md hover:bg-gold hover:text-white transition cursor-pointer"
        >
          {address ? "Edit Address" : "Add Address"}
        </button>
      </div>

      {/* Address Display */}
      <div className="border border-border rounded-md bg-white p-6">
        {address ? (
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-secondary">{address.street}</p>
              {address.city && (
                <p className="text-sm text-secondary">
                  {address.city}, {address.state}
                </p>
              )}
              {!address.city && (
                <p className="text-sm text-secondary">{address.state}</p>
              )}
              <p className="text-sm text-secondary">{address.zipCode}</p>
              <p className="text-sm text-secondary">{address.country}</p>
            </div>
            <button
              onClick={handleOpen}
              className="text-secondary hover:text-charcoal transition shrink-0"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-2 min-h-30">
            <p className="text-sm font-medium text-charcoal">No Address</p>
            <p className="text-xs text-secondary">
              You&apos;ve not saved an address yet
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-charcoal">
                {address ? "Edit Address" : "Add Address"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-secondary hover:text-charcoal transition text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Street */}
              <div>
                <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Street Address"
                  value={formData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none focus:border-gold transition"
                />
              </div>

              {/* Country & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => {
                      handleChange("country", e.target.value);
                      handleChange("state", "");
                    }}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none focus:border-gold transition bg-white"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    disabled={!formData.country}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none focus:border-gold transition bg-white disabled:text-secondary disabled:cursor-not-allowed"
                  >
                    <option value="">Select State</option>
                    {availableStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City & ZIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                    City <span className="normal-case">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none focus:border-gold transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-secondary uppercase tracking-wide mb-1.5 block">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none focus:border-gold transition"
                  />
                </div>
              </div>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="mt-6 w-full py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingAddress;
