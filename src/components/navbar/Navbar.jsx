import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ToggleTheme from "../ui/ThemeToggle"; // ✅ your toggle component
import Logo from "../ui/Logo";

const Navbar = ({ handleScrollComponent }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("Hero");

  const navItems = ["Hero", "Blog", "Projects", "Sponsors", "Contact"];

  // Spy scrolling - detect which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Spy scrolling logic
      const sections = navItems.map((item) => ({
        id: item,
        element: document.getElementById(item),
      }));

      // Find which section is currently in view
      let current = "Hero";
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // Section is considered active when it's in the top half of viewport
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            current = section.id;
            break;
          }
          // Fallback: if section top is above middle and bottom is below top
          if (rect.top <= 200 && rect.bottom > 0) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (item) => {
    setActiveSection(item);
    handleScrollComponent(item);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-500
    backdrop-blur-md bg-base-100/90 border-b border-primary/20
    ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
  `}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div
          className="w-auto h-12 cursor-pointer"
          onClick={() => handleNavClick("Hero")}
        >
          <Logo className="w-full h-full fill-current text-primary transition-transform hover:scale-110" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              onClick={() => handleNavClick(item)}
              key={item}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${
                  activeSection === item
                    ? "text-primary"
                    : "text-base-content hover:text-primary"
                }
              `}
            >
              {item}

              {/* Active indicator - animated underline */}
              <span
                className={`
                  absolute bottom-0 left-1/2 h-0.5 bg-primary rounded-full
                  transition-all duration-300 ease-out
                  ${
                    activeSection === item
                      ? "w-3/4 -translate-x-1/2 opacity-100"
                      : "w-0 -translate-x-1/2 opacity-0"
                  }
                `}
              />

              {/* Active indicator - glow effect */}
              {activeSection === item && (
                <span className="absolute inset-0 bg-primary/10 rounded-lg -z-10 animate-pulse" />
              )}
            </button>
          ))}
          <div className="ml-2">
            <ToggleTheme />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ToggleTheme />
          <button
            className="text-base-content hover:text-primary transition p-2 hover:bg-accent/20 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-base-100/95 border-t border-primary/20 shadow-lg backdrop-blur-md">
          <nav className="flex flex-col items-stretch py-2 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`
                  relative px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left
                  ${
                    activeSection === item
                      ? "text-primary bg-primary/10"
                      : "text-base-content hover:text-primary hover:bg-accent/10"
                  }
                `}
              >
                {/* Active indicator dot */}
                <span
                  className={`
                    absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary
                    transition-all duration-300
                    ${activeSection === item ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                  `}
                />
                <span className={activeSection === item ? "ml-3" : "ml-0"}>
                  {item}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
