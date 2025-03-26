
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle, Star, Hotel, Package, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  listing_type: "internal_hotel" | "internal_package";
  item_id: string;
  item_name: string;
  rating: number;
  comment: string;
  created_at: string;
  status: "published" | "pending" | "rejected";
}

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      user_id: "user1",
      user_name: "Mohammed Ali",
      user_email: "mohammed@example.com",
      listing_type: "internal_hotel",
      item_id: "hotel1",
      item_name: "Grand Makkah Hotel",
      rating: 5,
      comment: "Excellent hotel with perfect location just steps away from the Haram. Staff was extremely helpful and the room was clean and comfortable.",
      created_at: "2023-10-25",
      status: "published",
    },
    {
      id: "2",
      user_id: "user2",
      user_name: "Fatima Khan",
      user_email: "fatima@example.com",
      listing_type: "internal_package",
      item_id: "package1",
      item_name: "Complete Umrah Package",
      rating: 4,
      comment: "Great package overall. The hotel was excellent and the transportation was on time. The only issue was that the airport pickup was slightly delayed.",
      created_at: "2023-10-28",
      status: "pending",
    },
    {
      id: "3",
      user_id: "user3",
      user_name: "Ahmed Hassan",
      user_email: "ahmed@example.com",
      listing_type: "internal_hotel",
      item_id: "hotel2",
      item_name: "Madinah Luxury Hotel",
      rating: 3,
      comment: "The location was good, but the room was smaller than expected and the air conditioning wasn't working properly. The staff was friendly though.",
      created_at: "2023-10-15",
      status: "pending",
    },
    {
      id: "4",
      user_id: "user4",
      user_name: "Zainab Omar",
      user_email: "zainab@example.com",
      listing_type: "internal_package",
      item_id: "package2",
      item_name: "Makkah Luxury Stay",
      rating: 2,
      comment: "This package was disappointing. The hotel was far from the Haram and the transportation was often late. Would not recommend.",
      created_at: "2023-10-20",
      status: "rejected",
    },
  ]);
  
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const updateReviewStatus = (reviewId: string, newStatus: "published" | "pending" | "rejected") => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: newStatus } 
        : review
    ));
    
    setSelectedReview(prev => prev ? { ...prev, status: newStatus } : null);
  };
  
  const getStatusBadge = (status: string) => {
    if (status === "published") {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
    } else if (status === "pending") {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
    }
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`h-4 w-4 ${index < rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted stroke-muted-foreground'}`} 
          />
        ))}
      </div>
    );
  };
  
  const getPendingReviews = () => reviews.filter(review => review.status === "pending");
  const getPublishedReviews = () => reviews.filter(review => review.status === "published");
  const getRejectedReviews = () => reviews.filter(review => review.status === "rejected");
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Reviews</h1>
            <p className="text-muted-foreground">Manage customer reviews</p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search reviews by customer or hotel/package..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending Review ({getPendingReviews().length})</TabsTrigger>
            <TabsTrigger value="published">Published ({getPublishedReviews().length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({getRejectedReviews().length})</TabsTrigger>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
          </TabsList>
          
          {["pending", "published", "rejected", "all"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="space-y-4">
                {reviews
                  .filter(review => tab === "all" ? true : review.status === tab)
                  .map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-2">
                                {review.user_name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{review.user_name}</div>
                                <div className="text-xs text-muted-foreground">{review.user_email}</div>
                              </div>
                            </div>
                            <div className="md:ml-auto flex flex-wrap items-center gap-2">
                              {renderStars(review.rating)}
                              {getStatusBadge(review.status)}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex items-center text-sm text-muted-foreground mb-1">
                              <div className="flex items-center mr-4">
                                {review.listing_type === "internal_hotel" ? (
                                  <Hotel className="h-3 w-3 mr-1" />
                                ) : (
                                  <Package className="h-3 w-3 mr-1" />
                                )}
                                <span>{review.item_name}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{formatDate(review.created_at)}</span>
                              </div>
                            </div>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col gap-2 md:justify-start">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                                onClick={() => setSelectedReview(review)}
                              >
                                <Eye className="h-4 w-4 mr-2" /> View
                              </Button>
                            </DialogTrigger>
                            {selectedReview && (
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Review Details</DialogTitle>
                                </DialogHeader>
                                
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-2">
                                          {selectedReview.user_name.charAt(0)}
                                        </div>
                                        <div>
                                          <div className="font-medium">{selectedReview.user_name}</div>
                                          <div className="text-xs text-muted-foreground">{selectedReview.user_email}</div>
                                        </div>
                                      </div>
                                      <div>{renderStars(selectedReview.rating)}</div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">For</div>
                                    <div className="flex items-center">
                                      {selectedReview.listing_type === "internal_hotel" ? (
                                        <Hotel className="h-4 w-4 mr-1 text-primary" />
                                      ) : (
                                        <Package className="h-4 w-4 mr-1 text-primary" />
                                      )}
                                      <span>{selectedReview.item_name}</span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Date</div>
                                    <div>{formatDate(selectedReview.created_at)}</div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                                    <div>{getStatusBadge(selectedReview.status)}</div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Comment</div>
                                    <div className="p-3 bg-muted rounded-md">{selectedReview.comment}</div>
                                  </div>
                                  
                                  {selectedReview.status === "pending" && (
                                    <div>
                                      <div className="text-sm text-muted-foreground mb-1">Rejection Reason (optional)</div>
                                      <Textarea 
                                        placeholder="If rejecting, provide a reason..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                      />
                                    </div>
                                  )}
                                </div>
                                
                                <DialogFooter className="mt-6">
                                  {selectedReview.status === "pending" && (
                                    <>
                                      <Button 
                                        variant="destructive" 
                                        onClick={() => updateReviewStatus(selectedReview.id, "rejected")}
                                      >
                                        <XCircle className="h-4 w-4 mr-2" /> Reject
                                      </Button>
                                      <Button 
                                        onClick={() => updateReviewStatus(selectedReview.id, "published")}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" /> Approve
                                      </Button>
                                    </>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                          
                          {review.status === "pending" && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                                onClick={() => updateReviewStatus(review.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Reject
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                className="w-full"
                                onClick={() => updateReviewStatus(review.id, "published")}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" /> Approve
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {reviews.filter(review => tab === "all" ? true : review.status === tab).length === 0 && (
                  <div className="bg-muted p-8 rounded-lg text-center">
                    <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                    <p className="text-muted-foreground">
                      {tab === "pending" ? "There are no reviews waiting for approval." :
                       tab === "published" ? "There are no published reviews yet." :
                       tab === "rejected" ? "There are no rejected reviews." :
                       "There are no reviews in the system."}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminReviews;
