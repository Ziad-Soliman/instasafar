
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface BookingProgressProps {
  steps: BookingStep[];
  className?: string;
}

const BookingProgress: React.FC<BookingProgressProps> = ({ steps, className }) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Booking Progress</h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2",
                      step.status === 'completed' && "bg-green-500 border-green-500 text-white",
                      step.status === 'current' && "bg-saudi-green border-saudi-green text-white",
                      step.status === 'upcoming' && "bg-muted border-muted-foreground text-muted-foreground"
                    )}
                  >
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : step.status === 'current' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 h-8 mt-2",
                        step.status === 'completed' ? "bg-green-500" : "bg-muted"
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={cn(
                        "font-medium",
                        step.status === 'completed' && "text-green-600",
                        step.status === 'current' && "text-saudi-green",
                        step.status === 'upcoming' && "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </h4>
                    <Badge
                      variant={
                        step.status === 'completed' ? 'default' :
                        step.status === 'current' ? 'saudi' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {step.status === 'completed' ? 'Done' :
                       step.status === 'current' ? 'Current' : 'Pending'}
                    </Badge>
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      step.status === 'upcoming' ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingProgress;
