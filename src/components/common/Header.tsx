"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { resetUser } from "@/redux/userSlice";
import { resetAuthState } from "@/redux/authSlice";
import useAttemptLogin from "@/hooks/useAttemptLogin";
import { axiosWithCredentials } from "@/lib/custom-axios-request";
import { API_ROUTES } from "@/lib/constants";
// import Cookies from "js-cookie";

const NavLinks = [
  { href: "/", label: "Home" },
  { href: "/new", label: "New" },
  { href: "/popular", label: "Popular" },
  { href: "/categories", label: "Categories" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user);
  const {isUserLoggedIn} = useAttemptLogin();
  const dispatch = useDispatch();

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
            </ul>
            
            {/* Desktop Auth Links */}
            <ul className="flex items-center space-x-4 ml-8">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
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
            </ul>
            
            {/* Mobile Auth Links */}
            <div className="border-t border-blue-400 mt-4 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
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
