
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WishlistEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="bg-muted/50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Start saving your favorite hotels, packages, and transport options to plan your perfect journey.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => navigate("/search")}>
            Explore Hotels
          </Button>
          <Button variant="outline" onClick={() => navigate("/packages")}>
            View Packages
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WishlistEmptyState;
