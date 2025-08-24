"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { resetUser } from "@/redux/userSlice";
import { resetAuthState } from "@/redux/authSlice";
import { useCategories } from "@/hooks/useCategories";
import useAttemptLogin from "@/hooks/useAttemptLogin";
import { axiosWithCredentials } from "@/lib/custom-axios-request";
import { API_ROUTES } from "@/lib/constants";

const NavLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const { categories } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user);
  const {isUserLoggedIn} = useAttemptLogin();
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesDropdownOpen(false);
      }
    };

    if (isCategoriesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoriesDropdownOpen]);

  const handleLogout = async () => {
    try {
      const response = await axiosWithCredentials.post(API_ROUTES.auth.signOut);
      console.log("sign out response :", response);
      dispatch(resetUser());
      dispatch(resetAuthState());
    } catch (error) {
      console.log("sign out error :", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };

  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {NavLinks.map((link) => (
                <LeftNavLink key={link.href} href={link.href}>
                  {link.label}
                </LeftNavLink>
              ))}
              
              {/* Categories Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleCategoriesDropdown}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  Categories
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isCategoriesDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug || category.name.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsCategoriesDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 mt-1 pt-1">
                      <Link
                        href="/categories"
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 transition-colors duration-200 font-medium"
                        onClick={() => setIsCategoriesDropdownOpen(false)}
                      >
                        View All Categories
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            </ul>
            
            {/* Desktop Auth Links */}
            <ul className="flex items-center space-x-4 ml-8">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/new-post"
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md transition-colors duration-300 border border-green-500 hover:border-green-400"
                  >
                    New Post
                  </Link>
                  <span className="text-blue-100 text-sm font-medium">
                    Welcome, {user.user?.name || 'User'}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md transition-colors duration-300 border border-blue-500 hover:border-blue-400"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <RightNavLink href="/sign-in">Log In</RightNavLink>
                  <RightNavLink href="/sign-up">Sign Up</RightNavLink>
                </>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-200 hover:border-blue-200 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="fill-current h-4 w-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4'
          }`}
        >
          <nav className="border-t border-blue-400 pt-4 pb-4">
            <ul className="space-y-2">
              {NavLinks.map((link, index) => (
                <MobileNavLink 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  delay={index * 100}
                  isVisible={isMenuOpen}
                >
                  {link.label}
                </MobileNavLink>
              ))}
              
              {/* Mobile Categories Section */}
              <li className="border-t border-blue-400 pt-2 mt-2">
                <div className="px-3 py-2 text-sm font-medium text-blue-100">
                  Categories
                </div>
                <ul className="ml-4 space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug || category.name.toLowerCase()}`}
                        className="block px-3 py-1 text-sm text-blue-200 hover:text-white hover:bg-blue-400 rounded transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/categories"
                      className="block px-3 py-1 text-sm text-blue-300 hover:text-white hover:bg-blue-400 rounded transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View All Categories
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            
            {/* Mobile Auth Links */}
            <div className="border-t border-blue-400 mt-4 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    href="/new-post"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-base font-medium rounded-md transition-colors duration-300"
                  >
                    New Post
                  </Link>
                  <div className="px-3 py-2 text-blue-100 text-sm font-medium">
                    Welcome, {user.user?.name || 'User'}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-base font-medium rounded-md transition-colors duration-300"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <ul className="space-y-2">
                  <MobileNavLink 
                    href="/sign-in" 
                    onClick={() => setIsMenuOpen(false)}
                    delay={400}
                    isVisible={isMenuOpen}
                  >
                    Log In
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/sign-up" 
                    onClick={() => setIsMenuOpen(false)}
                    delay={500}
                    isVisible={isMenuOpen}
                  >
                    Sign Up
                  </MobileNavLink>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <h1 className="text-2xl font-bold hover:text-blue-200 transition-colors duration-300">
        Bloggy
      </h1>
    </Link>
  );
};

const LeftNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-400 hover:text-white transition-colors duration-300"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};

const RightNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        className="px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-400 hover:text-white transition-colors duration-300"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};

const MobileNavLink = ({
  href,
  children,
  onClick,
  delay = 0,
  isVisible = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
  isVisible?: boolean;
}) => {
  return (
    <li 
      className={`transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform -translate-x-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-400 hover:text-white transition-colors duration-300"
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};
