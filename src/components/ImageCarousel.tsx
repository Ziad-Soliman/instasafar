
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  height?: number;
  aspectRatio?: number; // Added this property
  allowFullscreen?: boolean; // Added this property
  caption?: string; // Added this property
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  height = 300,
  aspectRatio, // Not used yet, but available for future enhancement
  allowFullscreen = false, // Not used yet, but available for future enhancement
  caption // Not used yet, but available for future enhancement
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length, currentImageIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Fixed the onClick handler to pass the index, not the event
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ height: height }}>
      <AnimatePresence initial={false} custom={1}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={caption || `Carousel Image ${currentImageIndex + 1}`}
          className="absolute w-full h-full object-cover"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
      </AnimatePresence>

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full z-10"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-2 left-0 w-full flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentImageIndex ? 'bg-primary' : 'bg-gray-500'
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
