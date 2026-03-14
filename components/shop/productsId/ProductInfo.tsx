interface ProductInfoProps {
  categoryName?: string;
  productName: string;
  productPrice: number;
}

const ProductInfo = ({
  categoryName,
  productName,
  productPrice,
}: ProductInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] text-secondary tracking-widest uppercase">
        {categoryName}
      </p>
      <h1 className="text-xl md:text-2xl font-semibold text-charcoal leading-snug">
        {productName}
      </h1>
      <p className="text-lg md:text-xl font-semibold text-charcoal">
        ₦{productPrice.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductInfo;
