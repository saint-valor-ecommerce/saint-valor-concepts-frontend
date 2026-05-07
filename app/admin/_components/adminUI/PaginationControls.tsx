import { Pagination } from "@/types/pagination";

interface Props {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ pagination, onPageChange }: Props) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4 pb-10">
      <p className="text-xs text-secondary">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="px-4 py-2 text-xs border border-border rounded-full text-charcoal hover:bg-ivory disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 text-xs border border-border rounded-full text-charcoal hover:bg-ivory disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
