
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight, ZoomIn, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: number;
  className?: string;
  showControls?: boolean;
  allowFullscreen?: boolean;
  caption?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  aspectRatio = 16/9,
  className,
  showControls = true,
  allowFullscreen = false,
  caption
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [fullscreenImage, setFullscreenImage] = React.useState<string | null>(null);

  const handleFullscreen = (image: string) => {
    if (allowFullscreen) {
      setFullscreenImage(image);
    }
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className={cn("relative", className)}>
      <Carousel
        className="w-full"
        onSelect={(index) => setCurrentIndex(index)}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={aspectRatio} className="bg-muted overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => handleFullscreen(image)}
                />
                {allowFullscreen && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-2 right-2 opacity-80 hover:opacity-100 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFullscreen(image);
                    }}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                )}
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {showControls && images.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>

      {caption && (
        <p className="text-sm text-muted-foreground text-center mt-2">{caption}</p>
      )}
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      )}

      {/* Fullscreen overlay */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeFullscreen}>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 text-white"
            onClick={closeFullscreen}
          >
            <ExternalLink className="h-6 w-6" />
          </Button>
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIdx = images.indexOf(fullscreenImage);
                  const prevIdx = (currentIdx - 1 + images.length) % images.length;
                  setFullscreenImage(images[prevIdx]);
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIdx = images.indexOf(fullscreenImage);
                  const nextIdx = (currentIdx + 1) % images.length;
                  setFullscreenImage(images[nextIdx]);
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
