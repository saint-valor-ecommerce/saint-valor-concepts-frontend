"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useFavouritesStore } from "@/store/favouritesStore";
import { useAuthStore } from "@/store/authStore";
import ProductCard from "@/components/ui/ProductCard";
import { Heart } from "lucide-react";

const FavouritesPage = () => {
  const { isLoggedIn } = useAuthStore();
  const { favouriteIds, favourites, fetchFavourites } = useFavouritesStore();

  useEffect(() => {
    if (isLoggedIn) fetchFavourites();
  }, [isLoggedIn, fetchFavourites]);

  return (
    <div className="min-h-screen bg-ivory px-6 py-8 mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-secondary mb-6">
        <Link href="/" className="hover:text-charcoal transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal">Favourites</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-charcoal mb-8">
        Favourite ({favouriteIds.size})
      </h1>

      {favouriteIds.size === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 gap-5 py-24">
          <Heart size={40} className="text-border" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-charcoal">
              No favourites yet
            </p>
            <p className="text-xs text-secondary text-center">
              Items you heart will appear here
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-white bg-gold px-6 py-2.5 hover:bg-gold/90 transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {favourites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
