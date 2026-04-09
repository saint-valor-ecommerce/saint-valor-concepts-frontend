import { Trash2 } from "lucide-react";

interface DeleteCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  error?: string;
}

const DeleteCollectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  error,
}: DeleteCollectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-sm mx-4 px-8 py-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <Trash2 size={32} className="text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-charcoal mb-3">
          Delete Collection
        </h2>
        <p className="text-sm text-secondary leading-relaxed mb-4">
          Are you sure you want to Delete this collection, all products attached
          to this collection will be affected
        </p>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 cursor-pointer text-white font-medium py-3 rounded-full transition-colors mb-3"
        >
          {isDeleting ? "Deleting..." : "Delete Collection"}
        </button>
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="w-full text-gold font-medium py-3 rounded-full border border-gold cursor-pointer hover:bg-gold/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCollectionModal;
