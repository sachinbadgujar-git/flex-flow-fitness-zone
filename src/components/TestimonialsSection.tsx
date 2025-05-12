
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Member for 2 years",
      quote: "FlexFlow completely transformed my fitness journey. The trainers are incredibly supportive, and the community keeps me motivated. I've achieved goals I never thought were possible!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Michael Robinson",
      role: "Member for 1 year",
      quote: "The variety of classes at FlexFlow keeps my workouts fresh and exciting. The trainers really know their stuff and have helped me improve my technique dramatically.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Jennifer Lee",
      role: "Member for 3 years",
      quote: "I've been to many gyms before, but FlexFlow truly stands out. The atmosphere is welcoming, the equipment is top-notch, and the results speak for themselves. I'm in the best shape of my life!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
    }
  ];

  const prevSlide = () => {
    setActiveIndex(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Automatic slide change
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [activeIndex]);
  
  return (
    <section id="testimonials" className="section-padding bg-gym-dark text-white">
      <div ref={sectionRef} className="container-custom appear-animation">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our <span className="text-gradient">Members</span> Say</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied members about their experiences
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/3 mb-6 md:mb-0 flex-shrink-0">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gym-purple to-gym-accent blur-lg opacity-50"></div>
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="relative z-10 rounded-full w-32 h-32 object-cover mx-auto border-4 border-white/10"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-3">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-lg italic mb-6">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <h4 className="font-bold text-xl">{testimonial.name}</h4>
                          <p className="text-gray-300">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all focus:outline-none"
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-gym-accent w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
