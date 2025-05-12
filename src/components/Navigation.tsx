
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold text-gym-purple">Flex<span className="text-gym-dark">Flow</span></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {['Home', 'Programs', 'Pricing', 'Trainers', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="font-medium hover:text-gym-purple transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <Button className="btn-primary">Get Started</Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-gym-dark"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-fade-in">
          <ul className="py-4">
            {['Home', 'Programs', 'Pricing', 'Trainers', 'About', 'Contact'].map((item) => (
              <li key={item} className="border-b border-gray-100 last:border-none">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 px-6 hover:bg-gray-50 hover:text-gym-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="px-6 py-4">
              <Button className="btn-primary w-full">Get Started</Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
