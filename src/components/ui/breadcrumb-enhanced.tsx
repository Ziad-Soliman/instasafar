
import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbEnhancedProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
}

const BreadcrumbEnhanced: React.FC<BreadcrumbEnhancedProps> = ({ 
  items, 
  className,
  showHome = true,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />
}) => {
  const allItems = showHome 
    ? [{ label: "Home", href: "/" }, ...items]
    : items;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      {allItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="flex items-center">
              {separator}
            </span>
          )}
          
          {item.current || !item.href ? (
            <span 
              className="text-foreground font-medium"
              aria-current={item.current ? "page" : undefined}
            >
              {index === 0 && showHome ? (
                <Home className="h-4 w-4" />
              ) : (
                item.label
              )}
            </span>
          ) : (
            <Link
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {index === 0 && showHome ? (
                <Home className="h-4 w-4" />
              ) : (
                item.label
              )}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbEnhanced;
