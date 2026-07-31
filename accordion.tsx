import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, MessageCircle } from "lucide-react";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  rating: z.number().min(1).max(10),
  category: z.enum(["bug", "feature", "general", "complaint"], {
    required_error: "Please select a feedback category",
  }),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  wouldRecommend: z.enum(["yes", "no", "maybe"], {
    required_error: "Please let us know if you'd recommend us",
  }),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;
type FeedbackCategory = FeedbackFormData["category"];
type WouldRecommendOption = FeedbackFormData["wouldRecommend"];

export default function FeedbackForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [rating, setRating] = React.useState([7]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 7,
    },
  });

  const watchCategory = watch("category");
  const watchWouldRecommend = watch("wouldRecommend");

  const onSubmit = async (data: FeedbackFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Feedback data:", data);
    setIsSubmitted(true);
    reset();
    setRating([7]);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value);
    setValue("rating", value[0]);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Share Your Feedback
        </CardTitle>
        <CardDescription>
          Help us improve by sharing your thoughts and experiences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted && (
          <Alert className="mb-4">
            <AlertDescription>
              Thank you for your feedback! We appreciate your input.
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Overall Rating: {rating[0]}/10
            </Label>
            <Slider
              value={rating}
              onValueChange={handleRatingChange}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Feedback Category</Label>
            <RadioGroup
              value={watchCategory}
              onValueChange={(value) => setValue("category", value as FeedbackCategory)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug">Bug Report</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feature" id="feature" />
                <Label htmlFor="feature">Feature Request</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general">General Feedback</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complaint" id="complaint" />
                <Label htmlFor="complaint">Complaint</Label>
              </div>
            </RadioGroup>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              rows={4}
              {...register("feedback")}
              className={errors.feedback ? "border-red-500" : ""}
            />
            {errors.feedback && (
              <p className="text-sm text-red-500">{errors.feedback.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Would you recommend us to others?</Label>
            <RadioGroup
              value={watchWouldRecommend}
              onValueChange={(value) => setValue("wouldRecommend", value as WouldRecommendOption)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maybe" id="maybe" />
                <Label htmlFor="maybe">Maybe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
            {errors.wouldRecommend && (
              <p className="text-sm text-red-500">{errors.wouldRecommend.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
