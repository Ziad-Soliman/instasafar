
import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface WishlistButtonProps {
  itemId: string;
  itemType: "hotel" | "package" | "transport";
  className?: string;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  itemId,
  itemType,
  className,
  variant = "icon",
  size = "md"
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const inWishlist = isInWishlist(itemId, itemType);
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to save items to your wishlist",
        variant: "default",
      });
      navigate("/auth/login");
      return;
    }
    
    if (inWishlist) {
      removeFromWishlist(itemId, itemType);
    } else {
      addToWishlist(itemId, itemType);
    }
  };
  
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };
  
  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
  };
  
  if (variant === "icon") {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleWishlist}
        className={cn(
          "rounded-full flex items-center justify-center bg-background/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-200",
          sizeClasses[size],
          inWishlist ? "text-red-500 border-red-200" : "text-gray-500 hover:text-red-500",
          className
        )}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={iconSizes[size]}
          className={cn(
            "transition-all duration-300",
            inWishlist ? "fill-current" : "fill-none"
          )}
        />
      </motion.button>
    );
  }
  
  return (
    <Button
      variant={inWishlist ? "default" : "outline"}
      size="sm"
      onClick={handleToggleWishlist}
      className={cn(
        "gap-2 transition-all duration-200",
        inWishlist ? "bg-red-500 hover:bg-red-600 text-white" : "hover:text-red-500",
        className
      )}
    >
      <Heart
        size={16}
        className={cn(
          "transition-all duration-300",
          inWishlist ? "fill-current" : "fill-none"
        )}
      />
      {inWishlist ? "Saved" : "Save"}
    </Button>
  );
};

export default WishlistButton;
