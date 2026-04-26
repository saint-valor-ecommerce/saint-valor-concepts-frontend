"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { getCollections } from "@/lib/api/products";
import { ProductCollection } from "@/types/product";

export default function ShopCollectionSection() {
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        // only show collections that have an image
        setCollections(data.filter((c: ProductCollection) => c.image));
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-medium tracking-tight text-charcoal">
            Shop the Saint Valor <br className="hidden sm:block" />
            Collection
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal">
            A curated selection of fine jewelry designed to reflect elegance,
            confidence, <br className="hidden sm:block" />
            and enduring style.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-full aspect-4/3 bg-gray-100 animate-pulse rounded" />
                <div className="h-3 w-24 bg-gray-100 animate-pulse rounded" />
              </div>
            ))
          ) : collections.length === 0 ? (
            <div className="col-span-full flex flex-col items-center gap-2 py-12">
              <p className="text-sm font-medium text-charcoal">Coming Soon</p>
              <p className="text-xs text-secondary text-center">
                New collections are on the way. Stay tuned.
              </p>
            </div>
          ) : (
            collections.map((item) => (
              <Link
                key={item._id}
                href={`/shop?collection=${item.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={item.image!}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium text-charcoal">
                  {item.name}
                </h3>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
