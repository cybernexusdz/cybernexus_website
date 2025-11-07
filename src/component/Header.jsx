import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ToggleTheme from "./ui/ThemeToggle"; // ✅ your toggle component
import Logo from "./ui/Logo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Hide/show header based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down → hide
        setIsVisible(false);
      } else {
        // scrolling up → show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 
         backdrop-blur-md bg-bgPrimary/90 border-b border-accent/20
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="w-auto h-12">
          <Logo className="w-full h-full fill-current text-textPrimary" />
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button className="text-textPrimary hover:text-primary transition">
              Home
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Team
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Events
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Blogs
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Projects
            </button>
          </nav>

          <div className="hidden md:flex">
            <ToggleTheme />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-1">
          <ToggleTheme />

          <button
            className="text-textPrimary hover:text-primary transition"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-bgPrimary border-t border-accent/20 shadow-md transition-colors duration-300">
          <nav className="flex flex-col items-center space-y-3 py-4">
            <button className="text-textPrimary hover:text-primary transition">
              Home
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Team
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Events
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Blogs
            </button>
            <button className="text-textPrimary hover:text-primary transition">
              Projects
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
