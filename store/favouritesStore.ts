import { create } from "zustand";
import { toast } from "react-toastify";
import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from "@/lib/api/favourites";
import { Product } from "@/types/product";

interface FavouriteItem {
  _id: string;
  userId: string;
  productId: Product;
  createdAt: string;
}

interface FavouritesStore {
  favouriteIds: Set<string>;
  favourites: Product[];
  isLoading: boolean;
  fetchFavourites: () => Promise<void>;
  toggleFavourite: (productId: string) => Promise<void>;
}

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
  favouriteIds: new Set(),
  favourites: [],
  isLoading: false,

  fetchFavourites: async () => {
    try {
      set({ isLoading: true });
      const data = await getFavourites();
      const ids = new Set<string>(
        data.map((f: FavouriteItem) => f.productId._id),
      );
      const products: Product[] = data.map((f: FavouriteItem) => f.productId);
      set({ favouriteIds: ids, favourites: products });
    } catch (error) {
      const status = (error as { response?: { status?: number } }).response
        ?.status;
      if (status !== 401) {
        toast.error("Could not load favourites. Please try again.");
      }
      // 401 means not logged in — expected, fail silently
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavourite: async (productId: string) => {
    const { favouriteIds, favourites } = get();
    const isFavourited = favouriteIds.has(productId);

    // optimistic update
    const updatedIds = new Set(favouriteIds);
    const updatedProducts = isFavourited
      ? favourites.filter((p) => p._id !== productId)
      : favourites;

    if (isFavourited) {
      updatedIds.delete(productId);
    } else {
      updatedIds.add(productId);
    }

    set({ favouriteIds: updatedIds, favourites: updatedProducts });

    try {
      if (isFavourited) {
        await removeFavourite(productId);
      } else {
        await addFavourite(productId);
        await get().fetchFavourites();
      }
    } catch (error) {
      const status = (error as { response?: { status?: number } }).response
        ?.status;
      // revert optimistic update
      set({ favouriteIds, favourites });
      if (status === 401) {
        toast.error("Please sign in to manage favourites.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  },
}));
