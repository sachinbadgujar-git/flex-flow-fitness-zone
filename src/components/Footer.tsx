
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gym-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gym-purple">Flex<span className="text-white">Flow</span></span>
            </a>
            <p className="text-gray-300 mb-6">
              Transforming lives through fitness since 2010. Our mission is to help you achieve your health and fitness goals in a supportive environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-purple transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-purple transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-purple transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-purple transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Programs', 'Pricing', 'Trainers', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Programs</h3>
            <ul className="space-y-3">
              {['Strength Training', 'Cardio Fitness', 'Yoga & Wellness', 'HIIT Workouts', 'Nutrition Planning', 'Personal Training'].map((item) => (
                <li key={item}>
                  <a 
                    href="#programs" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Working Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-300">Monday-Friday:</span>
                <span>6AM-10PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Saturday:</span>
                <span>8AM-8PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sunday:</span>
                <span>8AM-8PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FlexFlow Fitness. All rights reserved.
          </p>
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 bg-gym-purple rounded-full hover:bg-gym-accent transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
