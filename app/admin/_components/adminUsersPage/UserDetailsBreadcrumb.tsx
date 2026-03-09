import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const UserDetailsBreadcrumb = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-sm text-secondary">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft size={14} /> Back
      </button>
      <span className="text-secondary">|</span>
      <button
        type="button"
        onClick={() => router.back()}
        className="cursor-pointer underline text-secondary"
      >
        User
      </button>
      <span className="text-secondary">|</span>
      <span className="text-charcoal font-medium underline">User Details</span>
    </div>
  );
};

export default UserDetailsBreadcrumb;
