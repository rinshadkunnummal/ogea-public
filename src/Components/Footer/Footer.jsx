import { Link, useLocation } from "react-router-dom";
import NavigationButton from "../NavigationButton/NavigationButton";

const Footer = () => {
  const location = useLocation();
  
  return (
    <footer className="bg-[#23272c] text-white py-8 px-4 mt-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">&copy; {new Date().getFullYear()} CHS Outreach</span>
        </div>
        {/* Navigation Links */}
        <nav className='hidden md:flex gap-2'>
          <Link to="/" className='hover:text-gray-300 transition-colors'>
            <NavigationButton isActive={location.pathname === '/'}>
              Home
            </NavigationButton>
          </Link>
          <Link to="/works" className='hover:text-gray-300 transition-colors'>
            <NavigationButton isActive={location.pathname === '/works' || location.pathname.startsWith('/works/')}>
              Literary Works
            </NavigationButton>
          </Link>
          <Link to="/posters" className='hover:text-gray-300 transition-colors'>
            <NavigationButton isActive={location.pathname === '/posters'}>
              Achievements
            </NavigationButton>
          </Link>
          <Link to="/contact" className='hover:text-gray-300 transition-colors'>
            <NavigationButton isActive={location.pathname === '/contact'}>
              Contact
            </NavigationButton>
          </Link>
        </nav>

        <p className="text-center text-xs text-gray-400">
          Developed By <a target="_blank" href="https://github.com/Inkuit" className="text-teal-300 hover:underline transition-colors">Inkuit</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
