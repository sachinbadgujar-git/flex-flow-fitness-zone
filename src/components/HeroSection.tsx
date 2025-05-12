
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax effect and animation reveal on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      
      // Add class to animate stats when in viewport
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        
        if (isInView) {
          statsRef.current.classList.add('in-view');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gym-dark text-white">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-gym-purple/10 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gym-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gym-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Transform Your Body, <span className="text-gradient">Transform Your Life</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Join FlexFlow and discover a new way to achieve your fitness goals with our expert trainers and state-of-the-art facilities.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary flex items-center gap-2">
                Get Started <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 flex items-center gap-2">
                <Play size={16} className="text-gym-accent" fill="currentColor" /> Watch Tour
              </Button>
            </div>
            
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-12 appear-animation">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '50+', label: 'Expert Trainers' },
                { value: '1000+', label: 'Success Stories' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gym-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={heroRef} className="relative hidden md:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gym-accent/30 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Fitness trainer" 
              className="relative z-10 rounded-2xl object-cover max-h-[600px] animate-fade-in"
            />
            <div className="absolute -bottom-5 -right-5 bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 animate-bounce-subtle">
              <div className="flex items-center gap-3">
                <div className="bg-gym-accent h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                  <span>98%</span>
                </div>
                <div>
                  <p className="text-sm">Client</p>
                  <p className="font-bold">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <a href="#programs" className="flex flex-col items-center text-white/70 hover:text-white">
          <span className="mb-2 text-sm">Discover More</span>
          <ArrowRight size={20} className="rotate-90" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
