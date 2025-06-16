
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hotel, Package, Bus } from "lucide-react";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import ExternalListingCard, { type ExternalListing } from "@/components/cards/ExternalListingCard";
import { useNavigate } from "react-router-dom";

interface WishlistTabContentProps {
  activeTab: string;
  savedHotels: any[];
  savedPackages: any[];
  savedTransport: ExternalListing[];
}

const WishlistTabContent: React.FC<WishlistTabContentProps> = ({
  activeTab,
  savedHotels,
  savedPackages,
  savedTransport
}) => {
  const navigate = useNavigate();

  if (activeTab === "all") {
    return (
      <>
        {savedHotels.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Hotel size={18} className="mr-2" /> Hotels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedHotels.map(hotel => (
                hotel && <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        )}
        
        {savedPackages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Package size={18} className="mr-2" /> Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPackages.map(pkg => (
                pkg && <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        )}
        
        {savedTransport.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bus size={18} className="mr-2" /> Transport
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTransport.map(listing => (
                listing && <ExternalListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  if (activeTab === "hotels") {
    return savedHotels.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedHotels.map(hotel => (
          hotel && <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    ) : (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">You haven't saved any hotels yet.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/search")}>
            Explore Hotels
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (activeTab === "packages") {
    return savedPackages.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedPackages.map(pkg => (
          pkg && <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    ) : (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">You haven't saved any packages yet.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/packages")}>
            Explore Packages
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (activeTab === "transport") {
    return savedTransport.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTransport.map(listing => (
          listing && <ExternalListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    ) : (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">You haven't saved any transport options yet.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/transport")}>
            Explore Transport Options
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default WishlistTabContent;
