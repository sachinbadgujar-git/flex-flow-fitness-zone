
import React, { useEffect, useRef } from 'react';
import { Dumbbell, Activity, HeartPulse, Flame } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface Program {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProgramsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const programs: Program[] = [
    {
      icon: <Dumbbell size={28} className="text-gym-accent" />,
      title: "Strength Training",
      description: "Build muscle, boost metabolism and enhance your overall strength with our specialized equipment and trainers."
    },
    {
      icon: <Activity size={28} className="text-gym-accent" />,
      title: "Cardio Fitness",
      description: "Improve your heart health, burn calories, and increase endurance with our cardio-focused programs."
    },
    {
      icon: <HeartPulse size={28} className="text-gym-accent" />,
      title: "Yoga & Wellness",
      description: "Enhance your flexibility, mental focus, and overall well-being with our expert-led yoga sessions."
    },
    {
      icon: <Flame size={28} className="text-gym-accent" />,
      title: "HIIT Workouts",
      description: "Maximize your results in minimal time with high-intensity interval training designed for all fitness levels."
    }
  ];

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
    <section id="programs" className="section-padding bg-gray-50">
      <div ref={sectionRef} className="container-custom appear-animation">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fitness <span className="text-gradient">Programs</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our variety of specialized fitness programs designed to help you achieve your personal goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="appear-animation"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="p-6 h-full card-hover border-t-4 border-t-gym-accent bg-white">
                <div className="bg-gym-accent/10 rounded-full h-14 w-14 flex items-center justify-center mb-4">
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center appear-animation" style={{ transitionDelay: '0.4s' }}>
          <a href="#pricing" className="btn-primary inline-flex items-center">
            View All Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
