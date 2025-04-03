
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageSquare, Flag, User, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

// Mock data for reviews
const mockReviews = [
  {
    id: "1",
    userName: "Ahmed Khan",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format",
    rating: 5,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    content: "The hotel was excellent, with clean rooms and attentive staff. The location was perfect, just a short walk to the Haram. I would definitely recommend this hotel to anyone planning an Umrah visit.",
    likes: 12,
    replies: 2,
    photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format"],
  },
  {
    id: "2",
    userName: "Fatima Rahman",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format",
    rating: 4,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    content: "Good accommodations overall. The room was spacious and clean. Breakfast had a decent variety, though it became repetitive after a few days. Staff were helpful and accommodating.",
    likes: 8,
    replies: 1,
    photos: [],
  },
  {
    id: "3",
    userName: "Mohammed Ali",
    userImage: "",
    rating: 3,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    content: "Average experience. The location was convenient but the rooms were smaller than expected. The air conditioning was not working properly. The staff were friendly but slow to respond to requests.",
    likes: 4,
    replies: 0,
    photos: [],
  },
];

interface ReviewsSectionProps {
  itemId: string;
  itemType: "hotel" | "package" | "transport";
  averageRating?: number;
  totalReviews?: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  itemId,
  itemType,
  averageRating = 4.5,
  totalReviews = mockReviews.length,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [reviews, setReviews] = useState(mockReviews);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a review",
        variant: "destructive",
      });
      return;
    }
    
    if (!reviewText.trim()) {
      toast({
        title: "Review text required",
        description: "Please enter your review before submitting",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, here we would send the review data to the server
    const newReview = {
      id: `new-${Date.now()}`,
      userName: user.name || "User",
      userImage: user.avatar || "",
      rating,
      date: new Date(),
      content: reviewText,
      likes: 0,
      replies: 0,
      photos: selectedImages.map(file => URL.createObjectURL(file)),
    };
    
    // Add the new review to the list
    setReviews([newReview, ...reviews]);
    
    // Reset form
    setReviewText("");
    setRating(5);
    setSelectedImages([]);
    
    toast({
      title: "Review submitted",
      description: "Thank you for sharing your experience!",
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...fileArray]);
    }
  };
  
  const handleLike = (reviewId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like reviews",
        variant: "destructive",
      });
      return;
    }
    
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, likes: review.likes + 1 } 
          : review
      )
    );
  };
  
  const filteredReviews = currentTab === "all" 
    ? reviews 
    : reviews.filter(review => 
        currentTab === "5star" 
          ? review.rating === 5 
          : currentTab === "positive" 
            ? review.rating >= 4 
            : review.rating <= 3
      );
  
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // For ratings 1-5
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background rounded-lg border p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="col-span-1">
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={cn(
                    star <= Math.round(averageRating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Based on {totalReviews} reviews
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="w-12 text-sm text-muted-foreground">{star} stars</div>
                <div className="flex-1 mx-3">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ 
                        width: totalReviews 
                          ? `${(ratingCounts[star - 1] / totalReviews) * 100}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-10 text-sm text-right text-muted-foreground">
                  {ratingCounts[star - 1]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Review Form */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>
                Share your experience to help others make better choices
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleReviewSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Your Rating</Label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={cn(
                            "transition-colors",
                            star <= rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Share your experience... What did you like? What could be improved?"
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="photos">Add Photos (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="photos"
                      className="flex items-center justify-center h-20 w-20 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <Input
                        id="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                    
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative h-20 w-20">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Submit Review</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="mt-8">
        <Tabs defaultValue="all" onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="5star">5 Star</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab} className="mt-6">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No reviews yet</h3>
                <p className="text-muted-foreground">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.userImage} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  className={cn(
                                    star <= review.rating 
                                      ? "text-yellow-400 fill-yellow-400" 
                                      : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(review.date, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="mt-3 text-sm">{review.content}</p>
                    
                    {review.photos && review.photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {review.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Review photo ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-lg cursor-pointer"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex mt-4 pt-2 border-t text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-muted-foreground hover:text-foreground"
                        onClick={() => handleLike(review.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.likes})
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-muted-foreground hover:text-foreground"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply ({review.replies})
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ReviewsSection;
