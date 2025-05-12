
import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";

interface Trainer {
  name: string;
  role: string;
  image: string;
  socialLinks: {
    icon: string;
    url: string;
  }[];
}

const TrainersSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trainersRef = useRef<(HTMLDivElement | null)[]>([]);

  const trainers: Trainer[] = [
    {
      name: "Alex Morgan",
      role: "Strength Coach",
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
      socialLinks: [
        { icon: "facebook", url: "#" },
        { icon: "instagram", url: "#" },
        { icon: "twitter", url: "#" }
      ]
    },
    {
      name: "Samantha Lee",
      role: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { icon: "facebook", url: "#" },
        { icon: "instagram", url: "#" }
      ]
    },
    {
      name: "Marcus Wilson",
      role: "HIIT Specialist",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { icon: "instagram", url: "#" },
        { icon: "twitter", url: "#" }
      ]
    },
    {
      name: "Layla Chen",
      role: "Nutrition Expert",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { icon: "facebook", url: "#" },
        { icon: "instagram", url: "#" },
        { icon: "twitter", url: "#" }
      ]
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

    trainersRef.current.forEach((trainer) => {
      if (trainer) {
        observer.observe(trainer);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      trainersRef.current.forEach((trainer) => {
        if (trainer) {
          observer.unobserve(trainer);
        }
      });
    };
  }, []);

  return (
    <section id="trainers" className="section-padding bg-gray-50">
      <div ref={sectionRef} className="container-custom appear-animation">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our <span className="text-gradient">Trainers</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of certified fitness professionals are here to help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              ref={(el) => (trainersRef.current[index] = el)} 
              className="appear-animation"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="overflow-hidden card-hover h-full border-none bg-transparent">
                <div className="relative group">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-72 object-cover object-center rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <div className="flex space-x-3">
                      {trainer.socialLinks.map((link, i) => (
                        <a 
                          key={i}
                          href={link.url}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gym-purple hover:text-white transition-colors"
                          aria-label={`${trainer.name}'s ${link.icon}`}
                        >
                          <i className={`fab fa-${link.icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center bg-white rounded-b-lg">
                  <h3 className="font-bold text-lg mb-1">{trainer.name}</h3>
                  <p className="text-gym-purple">{trainer.role}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
