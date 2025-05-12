
import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PricingSection: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const monthlyPlans: PricingPlan[] = [
    {
      name: "Basic",
      price: "$29",
      period: "month",
      description: "Perfect for beginners and those starting their fitness journey",
      features: [
        "Access to main gym area",
        "Standard equipment usage",
        "2 group classes per month",
        "Locker room access"
      ]
    },
    {
      name: "Premium",
      price: "$59",
      period: "month",
      description: "Our most popular plan with additional perks and benefits",
      features: [
        "Full gym access",
        "Unlimited group classes",
        "1 free personal training session",
        "Access to app workouts",
        "Nutritional guidance"
      ],
      isPopular: true
    },
    {
      name: "Elite",
      price: "$99",
      period: "month",
      description: "The complete package for those serious about their fitness goals",
      features: [
        "24/7 gym access",
        "Unlimited group classes",
        "4 personal training sessions",
        "Premium app content",
        "Nutritional planning",
        "Recovery zone access",
        "Guest passes"
      ]
    }
  ];
  
  const yearlyPlans: PricingPlan[] = monthlyPlans.map(plan => ({
    ...plan,
    price: `$${parseInt(plan.price.substring(1)) * 10}`,
    period: "year",
    description: plan.description + " (Save 17%)"
  }));

  const plans = isMonthly ? monthlyPlans : yearlyPlans;

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section id="pricing" className="section-padding bg-white">
      <div ref={sectionRef} className="container-custom appear-animation">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership <span className="text-gradient">Plans</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect membership option that fits your fitness goals and budget
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${!isMonthly ? 'text-gray-400' : 'font-medium'}`}>Monthly</span>
            <button 
              onClick={() => setIsMonthly(!isMonthly)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gym-purple focus:ring-offset-2"
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isMonthly ? 'translate-x-1' : 'translate-x-7'
                }`}
              />
            </button>
            <span className={`ml-3 ${isMonthly ? 'text-gray-400' : 'font-medium'}`}>Yearly</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="appear-animation"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card 
                className={`p-6 h-full card-hover relative overflow-hidden ${
                  plan.isPopular 
                    ? 'border-gym-accent shadow-lg shadow-gym-accent/10' 
                    : 'border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-5 right-0 bg-gym-accent text-white text-xs py-1 px-3 rotate-45 translate-x-6">
                    Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-end justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-gym-purple mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <Button 
                    className={`w-full ${
                      plan.isPopular ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Choose Plan
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center appear-animation" style={{ transitionDelay: '0.4s' }}>
          <p className="text-gray-600">
            All plans include a 7-day free trial. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
