import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="bg-ivory rounded-full p-8">
        <Image
          src="/images/admin/user-icon.png"
          alt="No users"
          width={200}
          height={200}
        />
      </div>
      <div className="text-center">
        <p className="font-semibold text-charcoal">No Users yet</p>
        <p className="text-sm text-secondary">
          Users need to create account to view your users
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
