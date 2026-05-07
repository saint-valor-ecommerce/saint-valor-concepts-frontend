import InventoryTable from "../../_components/adminProducts/InventoryTable";

const InventoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold p-6 text-charcoal">Inventory Management</h1>
      <InventoryTable />
    </div>
  );
};

export default InventoryPage;
