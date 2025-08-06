import { Link, useLocation } from "react-router-dom";
import NavigationButton from "../NavigationButton/NavigationButton";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-[#23272c] text-gray-400 py-8 px-4 mt-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <span className="font-poppins sm:text-lg flex flex-col text-center sm:flex-row">&copy; {new Date().getFullYear()} CHS Outreach . <span>All Rights Reserved</span></span>
        </div>
        {/* Navigation Links */}
        <nav className='hidden gap-4'>
          <Link to="/" className='hover:text-gray-300 transition-colors'>
            Home
          </Link>
          <Link to="/works" className='hover:text-gray-300 transition-colors'>
            Literary Works
          </Link>
          <Link to="/posters" className='hover:text-gray-300 transition-colors'>
            Achievements
          </Link>
          <Link to="/contact" className='hover:text-gray-300 transition-colors'>
            Contact
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
