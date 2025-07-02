import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      vehicle: "2022 BMW X3",
      equity: "$4,200",
      rating: 5,
      text: "I had no idea I had positive equity in my lease! OverLeased made the process incredibly simple. I got multiple offers within 24 hours and walked away with over $4,000. The whole transaction took less than a week.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      location: "San Diego, CA",
      vehicle: "2021 Tesla Model Y",
      equity: "$6,800",
      rating: 5,
      text: "The Tesla market was hot and I suspected I had equity. OverLeased confirmed it and connected me with dealers who were eager to buy. The process was transparent and professional throughout.",
      avatar: "MC"
    },
    {
      name: "Jennifer Martinez",
      location: "Miami, FL",
      vehicle: "2023 Audi Q5",
      equity: "$2,900",
      rating: 5,
      text: "I was worried about lease-end fees for some minor scratches. Instead of paying penalties, I sold my lease through OverLeased and actually made money. Best decision I made!",
      avatar: "JM"
    },
    {
      name: "David Thompson",
      location: "Chicago, IL",
      vehicle: "2022 Mercedes GLC",
      equity: "$5,100",
      rating: 5,
      text: "The market analysis was spot-on and the dealer network is impressive. I received competitive offers from three different dealers and chose the best one. Highly recommend this service.",
      avatar: "DT"
    },
    {
      name: "Lisa Park",
      location: "Seattle, WA",
      vehicle: "2021 Lexus RX",
      equity: "$3,400",
      rating: 5,
      text: "As someone who's not car-savvy, I appreciated how OverLeased explained everything clearly. The customer support was excellent and they guided me through each step of the process.",
      avatar: "LP"
    },
    {
      name: "Robert Williams",
      location: "Denver, CO",
      vehicle: "2022 Porsche Macan",
      equity: "$7,200",
      rating: 5,
      text: "I was skeptical at first, but the equity calculation was accurate and the dealer offers were fair. The whole experience exceeded my expectations. Will definitely use again for my next lease.",
      avatar: "RW"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            Customer Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Stories from Real Customers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how thousands of customers have successfully captured their lease equity and 
            turned their car leases into cash with OverLeased.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100 hover:border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Vehicle:</strong> {testimonial.vehicle}
                    </div>
                    <div className="text-sm font-semibold text-emerald-600">
                      <strong>Equity Captured:</strong> {testimonial.equity}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Join Thousands of Satisfied Customers
          </h3>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Don't let your lease equity go to waste. Start your journey to capturing hidden value today.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-200 mb-2">4.9/5</div>
              <div className="text-emerald-100 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-200 mb-2">$3,200</div>
              <div className="text-emerald-100 text-sm">Average Equity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-200 mb-2">5 Days</div>
              <div className="text-emerald-100 text-sm">Average Process Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-200 mb-2">100%</div>
              <div className="text-emerald-100 text-sm">Would Recommend</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-emerald-100 font-medium">Based on 2,847 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
