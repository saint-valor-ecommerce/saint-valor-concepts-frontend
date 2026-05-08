import { Address } from "@/types/address";
import { NIGERIAN_STATES } from "@/lib/utils";

const COUNTRIES = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Ghana",
  "South Africa",
];
const STATES: Record<string, string[]> = {
  Nigeria: NIGERIAN_STATES,
  "United States": ["California", "New York", "Texas", "Florida", "Illinois"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  Ghana: ["Greater Accra", "Ashanti", "Western", "Eastern"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
};

interface AddressFormModalProps {
  formData: Address;
  isEditing: boolean;
  isSaving: boolean;
  onChange: (field: keyof Address, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const AddressFormModal = ({
  formData,
  isEditing,
  isSaving,
  onChange,
  onSave,
  onClose,
}: AddressFormModalProps) => {
  const availableStates = STATES[formData.country] ?? [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-charcoal">
            {isEditing ? "Edit Address" : "Add Address"}
          </h2>
          <button
            onClick={onClose}
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
              onChange={(e) => onChange("street", e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none transition"
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
                  onChange("country", e.target.value);
                  onChange("state", "");
                }}
                className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none transition bg-white"
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
                onChange={(e) => onChange("state", e.target.value)}
                disabled={!formData.country}
                className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none transition bg-white disabled:text-secondary disabled:cursor-not-allowed"
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
                onChange={(e) => onChange("city", e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none transition"
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
                onChange={(e) => onChange("zipCode", e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-sm text-charcoal outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="mt-6 w-full py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddressFormModal;
