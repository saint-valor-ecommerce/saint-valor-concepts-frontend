import TableSkeleton from "./TableSkeleton";

const UserTableSkeleton = () => {
  return (
    <div className="px-15 py-6">
      <div className="h-7 bg-gray-200 rounded w-24 mb-6 animate-pulse" />
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-secondary border-b border-border">
            <th className="pb-3 font-normal">Users</th>
            <th className="pb-3 font-normal">Email</th>
            <th className="pb-3 font-normal">Member since</th>
            <th className="pb-3 font-normal"></th>
          </tr>
        </thead>
        <tbody>
          <TableSkeleton />
        </tbody>
      </table>
    </div>
  );
};

export default UserTableSkeleton;
