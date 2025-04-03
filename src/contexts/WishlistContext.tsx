
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Define types
type ItemType = "hotel" | "package" | "transport";

interface WishlistItem {
  id: string;
  itemType: ItemType;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  isLoading: boolean;
  addToWishlist: (itemId: string, itemType: ItemType) => Promise<void>;
  removeFromWishlist: (itemId: string, itemType: ItemType) => Promise<void>;
  isInWishlist: (itemId: string, itemType: ItemType) => boolean;
}

// Create context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Create provider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load wishlist from localStorage on mount and whenever user changes
  useEffect(() => {
    const loadWishlist = () => {
      if (!user) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      try {
        const savedWishlist = localStorage.getItem(`wishlist-${user.id}`);
        if (savedWishlist) {
          setItems(JSON.parse(savedWishlist));
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user && items.length > 0) {
      localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(items));
    }
  }, [items, user]);

  // Add item to wishlist
  const addToWishlist = async (itemId: string, itemType: ItemType) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save items to your wishlist",
        variant: "destructive",
      });
      return;
    }

    if (isInWishlist(itemId, itemType)) {
      return;
    }

    try {
      // In a real implementation, you would make an API call here
      // For now, we'll just update the local state
      const newItem: WishlistItem = {
        id: itemId,
        itemType,
        addedAt: new Date(),
      };

      setItems((prev) => [...prev, newItem]);
      
      toast({
        title: "Added to wishlist",
        description: `This ${itemType} has been added to your favorites`,
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast({
        title: "Failed to add to wishlist",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (itemId: string, itemType: ItemType) => {
    if (!user) return;

    try {
      // In a real implementation, you would make an API call here
      // For now, we'll just update the local state
      setItems((prev) => 
        prev.filter(item => !(item.id === itemId && item.itemType === itemType))
      );
      
      toast({
        title: "Removed from wishlist",
        description: `This ${itemType} has been removed from your favorites`,
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Failed to remove from wishlist",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Check if an item is in the wishlist
  const isInWishlist = (itemId: string, itemType: ItemType) => {
    return items.some(item => item.id === itemId && item.itemType === itemType);
  };

  const value = {
    items,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for using the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
