import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ToggleTheme from "./UI/ThemeToggle"; // ✅ use your toggle component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 shadow-md transition-colors duration-300 bg-gradient-to-r from-bgPrimary to-bgSecondary">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer text-textPrimary">
          Cyber Nexus
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-3">
          {/* ✅ Use the new toggle (handles both gender + theme) */}
          <ToggleTheme />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button className="text-textPrimary hover:text-accent transition">
            Home
          </button>
          <button className="text-textPrimary hover:text-accent transition">
            Team
          </button>
          <button className="text-textPrimary hover:text-accent transition">
            Events
          </button>
          <button className="text-textPrimary hover:text-accent transition">
            Blogs
          </button>
          <button className="text-textPrimary hover:text-accent transition">
            Projects
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-textPrimary hover:text-accent transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-bgPrimary border-t border-accent/20 shadow-md transition-colors duration-300">
          <nav className="flex flex-col items-center space-y-3 py-4">
            <button className="text-textPrimary hover:text-accent transition">
              Home
            </button>
            <button className="text-textPrimary hover:text-accent transition">
              Team
            </button>
            <button className="text-textPrimary hover:text-accent transition">
              Events
            </button>
            <button className="text-textPrimary hover:text-accent transition">
              Blogs
            </button>
            <button className="text-textPrimary hover:text-accent transition">
              Projects
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
