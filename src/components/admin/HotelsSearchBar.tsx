
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HotelsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

const HotelsSearchBar: React.FC<HotelsSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search hotels..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onRefresh}>Refresh</Button>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelsSearchBar;
