import { OrderStatus } from "@/types/order";

interface StatusConfirmModalProps {
  isOpen: boolean;
  newStatus: OrderStatus | null;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function StatusConfirmModal({
  isOpen,
  newStatus,
  isLoading,
  onConfirm,
  onCancel,
}: StatusConfirmModalProps) {
  if (!isOpen || !newStatus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl px-8 py-8 w-full max-w-sm mx-4 text-center">
        <h2 className="text-xl font-semibold text-charcoal mb-2">
          Change Status
        </h2>
        <p className="text-secondary text-sm mb-6">
          Are you sure you want to change the status of this order to{" "}
          <span className="font-medium text-charcoal">{newStatus}</span>?
        </p>

        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full py-3 bg-gold text-white rounded-xl font-medium text-sm hover:bg-[#c09a2f] transition-colors disabled:opacity-60 mb-3"
        >
          {isLoading ? "Updating..." : "Yes"}
        </button>

        <button
          onClick={onCancel}
          disabled={isLoading}
          className="w-full py-2 text-gold font-medium text-sm hover:underline transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
