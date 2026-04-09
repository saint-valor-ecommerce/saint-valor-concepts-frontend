interface ShopHeaderProps {
  title: string;
  totalItems: number;
}

//shows 'All Products' and the total number of products in the shop
const ShopHeader = ({ title, totalItems }: ShopHeaderProps) => {
  return (
    <div className="flex items-end gap-3 mb-6">
      <h1 className="text-3xl font-medium text-charcoal capitalize">{title}</h1>
      <span className="text-sm text-secondary mb-0.5">{totalItems}</span>
    </div>
  );
};

export default ShopHeader;
