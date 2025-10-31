import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Home, Package, Info, Mail, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4ade80] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-[#1f2937]">Ayoub Store</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            <Link 
              to="/pack" 
              className="text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200 font-medium"
            >
              Pack
            </Link>
            <Link 
              to="/about" 
              className="text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200">
              <Search size={20} />
            </button>
            {/* Admin Link - Only show if authenticated */}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="p-2 text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200"
                title="Admin Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart */}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="p-2 text-[#4b5563] hover:text-[#4ade80] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#e5e7eb]">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={20} />
                  <span className="text-lg font-medium">Home</span>
                </Link>
                <Link 
                  to="/products" 
                  className="flex items-center space-x-3 p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={20} />
                  <span className="text-lg font-medium">Products</span>
                </Link>
                <Link 
                  to="/pack" 
                  className="flex items-center space-x-3 p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={20} />
                  <span className="text-lg font-medium">Pack</span>
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center space-x-3 p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info size={20} />
                  <span className="text-lg font-medium">About</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center space-x-3 p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail size={20} />
                  <span className="text-lg font-medium">Contact</span>
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-[#e5e7eb] pt-4">
                <div className="flex items-center justify-end mb-4">
                  <button className="p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200">
                    <Search size={20} />
                  </button>
                </div>
                
                {/* Admin Link Mobile - Only show if authenticated */}
                {isAuthenticated && (
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-3 p-3 text-[#1f2937] hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={20} />
                    <span className="text-lg font-medium">Admin Dashboard</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;