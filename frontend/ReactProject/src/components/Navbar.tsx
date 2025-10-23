import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleProfileMenu = () => {

    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full h-20 px-4 py-2 flex justify-between items-center md:h-20">
        <div className="flex items-center">
          <span className="text-lg font-bold"></span>
        </div>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              <Link
                to="/app/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={toggleProfileMenu}>
                Profile
              </Link>

              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                  logout();
                  toggleProfileMenu();
                }}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
