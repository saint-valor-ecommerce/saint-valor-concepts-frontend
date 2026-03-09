const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-border animate-pulse">
          <td className="py-4">
            <div className="h-4 bg-gray-200 rounded w-32" />
          </td>
          <td className="py-4">
            <div className="h-4 bg-gray-200 rounded w-48" />
          </td>
          <td className="py-4">
            <div className="h-4 bg-gray-200 rounded w-36" />
          </td>
          <td className="py-4 flex justify-end">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </td>
        </tr>
      ))}
    </>
  );
};
export default TableSkeleton;
