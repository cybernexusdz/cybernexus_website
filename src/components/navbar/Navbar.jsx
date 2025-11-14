import { useState, useEffect } from "react";
import ToggleTheme from "../ui/ThemeToggle";
import Logo from "../ui/Logo";
import {
  Menu,
  X,
  Home,
  BookOpen,
  FolderGit2,
  Heart,
  Mail,
  Users,
} from "lucide-react";

const Navbar = ({
  theme,
  setTheme,
  handleScrollComponent = (item) => console.log(item),
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("Hero");

  const navItems = [
    { name: "Hero", icon: Home },
    { name: "Blog", icon: BookOpen },
    { name: "Team Members", icon: Users },
    { name: "Projects", icon: FolderGit2 },
    { name: "Sponsors", icon: Heart },
    { name: "Contact", icon: Mail },
  ];

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
        id: item.name,
        element: document.getElementById(item.name),
      }));

      // Find which section is currently in view
      let current = "Hero";
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            current = section.id;
            break;
          }
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

  const handleNavClick = (itemName) => {
    setActiveSection(itemName);
    handleScrollComponent(itemName);
    setMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-500
          backdrop-blur-md bg-base-100/90 border-b border-primary/20
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div
            className="w-auto h-12 cursor-pointer transition-transform hover:scale-110"
            onClick={() => handleNavClick("Hero")}
          >
            <Logo className="w-full h-full fill-current text-primary" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  onClick={() => handleNavClick(item.name)}
                  key={item.name}
                  className={`
                    relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                    flex items-center gap-2 group
                    ${
                      activeSection === item.name
                        ? "text-primary"
                        : "text-base-content hover:text-primary"
                    }
                  `}
                  aria-label={`Navigate to ${item.name}`}
                >
                  <Icon
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                  {item.name}

                  {/* Active indicator - animated underline */}
                  <span
                    className={`
                      absolute bottom-0 left-1/2 h-0.5 bg-primary rounded-full
                      transition-all duration-300 ease-out
                      ${
                        activeSection === item.name
                          ? "w-3/4 -translate-x-1/2 opacity-100"
                          : "w-0 -translate-x-1/2 opacity-0"
                      }
                    `}
                  />

                  {/* Active indicator - glow effect */}
                  {activeSection === item.name && (
                    <span className="absolute inset-0 bg-primary/10 rounded-lg -z-10 animate-pulse" />
                  )}
                </button>
              );
            })}
            <div className="ml-2">
              <ToggleTheme theme={theme} setTheme={setTheme} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ToggleTheme theme={theme} setTheme={setTheme} />
            <button
              className="text-base-content hover:text-primary transition p-2 hover:bg-primary/10 rounded-lg relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out
          ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Backdrop with blur */}
        <div
          className={`absolute inset-0 bg-neutral/60 backdrop-blur-md transition-opacity duration-500
            ${menuOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Panel - Slide from right */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-base-100 shadow-2xl
            transition-transform duration-500 ease-out border-l border-primary/20
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Menu Content */}
          <nav className="flex flex-col h-full pt-24 px-6">
            {/* Navigation Items */}
            <div className="flex-1 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name)}
                    className={`
                      w-full text-left px-6 py-4 rounded-xl font-semibold text-lg
                      transition-all duration-300 transform flex items-center gap-4
                      ${
                        activeSection === item.name
                          ? "bg-primary text-white shadow-lg scale-105"
                          : "text-base-content hover:bg-accent"
                      }
                      ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}
                    `}
                    style={{
                      transitionDelay: menuOpen ? `${index * 50}ms` : "0ms",
                    }}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <Icon size={24} />
                    <span className="flex-1">{item.name}</span>
                    {activeSection === item.name && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
