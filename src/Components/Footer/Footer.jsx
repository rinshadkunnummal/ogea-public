import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#23272c] text-white py-8 px-4 mt-2">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">&copy; {new Date().getFullYear()} CHS Outreach</span>
      </div>
      {/* Navigation Links */}
      <nav className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-teal-300 transition-colors">Home</Link>
        <Link to="/works" className="hover:text-teal-300 transition-colors">Works</Link>
        <Link to="/posters" className="hover:text-teal-300 transition-colors">Achievements</Link>
        <Link to="/contact" className="hover:text-teal-300 transition-colors">Contact</Link>
      </nav>
      <p className="text-center text-xs text-gray-400">
        Developed By <a target="_blank" href="https://github.com/Inkuit" className="text-teal-300 hover:underline transition-colors">Inkuit</a>
      </p>
    </div>
  </footer>
);

export default Footer;
