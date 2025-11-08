import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ToggleTheme from "./ui/ThemeToggle"; // ✅ your toggle component
import Logo from "./ui/Logo";

const Header = ({ handleScrollComponent }) => {
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
    backdrop-blur-md bg-base-100/80 border-b border-accent/20
    ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
  `}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="w-auto h-12">
          <Logo className="w-full h-full fill-current text-primary" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {["Hero", "Blog", "Projects", "Sponsors"].map((item) => (
            <button
              onClick={() => handleScrollComponent(item)}
              key={item}
              className="text-base-content hover:text-primary transition"
            >
              {item}
            </button>
          ))}
          <ToggleTheme />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ToggleTheme />
          <button
            className="text-base-content hover:text-primary transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-base-100/80 border-t border-accent/20 shadow-md transition-colors duration-300">
          <nav className="flex flex-col items-center py-4 space-y-3">
            {["Hero", "Blog", "Projects", "Sponsors"].map((item) => (
              <button
                key={item}
                onClick={() => handleScrollComponent(item)}
                className="text-base-content hover:text-primary transition"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
