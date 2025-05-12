
import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProgramsSection from '../components/ProgramsSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TrainersSection from '../components/TrainersSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Add scroll animation for elements with appear-animation class
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    const elements = document.querySelectorAll('.appear-animation');
    elements.forEach((el) => {
      observer.observe(el);
    });

    // Script to add Font Awesome icons
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProgramsSection />
        <PricingSection />
        <TestimonialsSection />
        <TrainersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
