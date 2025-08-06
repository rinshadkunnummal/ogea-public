
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart2, FileText, PlusCircle, Image } from 'react-feather'


const AdminSideBar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Hamburger icon (Lucide or SVG)
  const HamburgerButton = (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-[#23272c] text-white shadow-lg"
      aria-label="Open sidebar"
      onClick={() => setOpen(true)}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
    </button>
  );

  // Sidebar content
  const sidebarContent = (
    <aside className="admin-sidebar w-64 min-h-screen bg-[#23272c] shadow-md p-1 sm:p-2 flex flex-col" role="navigation" aria-label="Admin navigation">
      <header>
        <h2 className="text-xl font-bold mb-8 text-center text-white pt-2">Admin Tools</h2>
      </header>
      <nav className="flex-1">
        <ul className="space-y-2" role="list">
          <li>
            <button
              className={`flex gap-2 w-full text-left px-4 py-2 rounded transition-colors font-medium text-white ${location.pathname.endsWith('/stats') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => { navigate('/admin/'); setOpen(false); }}
              role="menuitem"
            >
              <BarChart2 size={20} />
              Stats
            </button>
          </li>
          <li>
            <button
              className={`flex gap-2 w-full text-left px-4 py-2 rounded transition-colors font-medium text-white ${location.pathname.endsWith('/manage') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => { navigate('/admin/manage'); setOpen(false); }}
              role="menuitem"
            >
              <FileText size={20} />
              Manage Articles
            </button>
          </li>
          <li>
            <button
              className={`flex gap-2 w-full text-left px-4 py-2 rounded transition-colors font-medium text-white ${location.pathname.endsWith('/add') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => { navigate('/admin/add'); setOpen(false); }}
              role="menuitem"
            >
              <PlusCircle size={20} />
              Add Content
            </button>
          </li>
          <li>
            <button
              className={`flex gap-2 w-full text-left px-4 py-2 rounded transition-colors font-medium text-white ${location.pathname.endsWith('/posters') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => { navigate('/admin/posters'); setOpen(false); }}
              role="menuitem"
            >
              <Image size={20} />
              Manage Posters
            </button>
          </li>
        </ul>
      </nav>
      <section className="mt-8">
        <button
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
      <footer className="mt-6 text-xs text-gray-400 text-center">
        <p>&copy; 2025 CHS Outreach Board</p>
        <p>Developed by <a href="https://github.com/Inkuit" className="underline">Inkuit</a></p>
      </footer>
    </aside>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      {HamburgerButton}
      {/* Sidebar for desktop */}
      <div className="hidden md:block">{sidebarContent}</div>
      {/* Sidebar for mobile (drawer) */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setOpen(false)} role="presentation"></div>
          {/* Drawer */}
          <aside className="relative w-64 min-h-screen shadow-lg flex flex-col animate-slideInLeft" role="dialog" aria-modal="true" aria-label="Mobile admin navigation">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              aria-label="Close sidebar"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
      {/* Mobile sidebar animation */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default AdminSideBar;
