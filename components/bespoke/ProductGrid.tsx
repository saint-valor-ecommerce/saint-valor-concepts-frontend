import React from "react";
import Image from "next/image";

export type Product = {
  id: string;
  imageSrc: string;
  imageAlt: string;
};

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {products.map((product) => (
        <article key={product.id} className="relative overflow-hidden">
          {/* Image */}
          <div className="relative aspect-4/3 w-full overflow-hidden">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </article>
      ))}
    </div>
  );
};
