import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import { Menu, X, Home, BookOpen, Heart, Mail, Users } from "lucide-react";

interface NavItem {
  name: string;
  icon: any;
  section: string; // Section ID for scrolling
}

interface Section {
  id: string;
  element: HTMLElement | null;
}

interface NavbarProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  handleScrollComponent?: (item: string) => void;
}

// Component
const Navbar = ({ theme, setTheme, handleScrollComponent }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("Hero");

  const navItems: NavItem[] = [
    { name: "Hero", icon: Home, section: "Hero" },
    { name: "The Team", icon: Users, section: "The Team" },
    { name: "What We Do", icon: BookOpen, section: "What We Do" },
    { name: "Sponsors", icon: Heart, section: "Sponsors" },
    { name: "Contact", icon: Mail, section: "Contact" },
  ];

  const isHomePage = location.pathname === "/";
  const isTeamPage = location.pathname.startsWith("/meet-the-team");

  // Improved spy scrolling - only on home page
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      // Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Better spy scrolling logic
      const sections: Section[] = navItems.map((item) => ({
        id: item.section,
        element: document.getElementById(item.section),
      }));

      let current = "Hero";
      const scrollPosition = currentScrollY + windowHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const absoluteTop = rect.top + currentScrollY;

          if (scrollPosition >= absoluteTop) {
            current = section.id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call immediately to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHomePage]);

  // Set active section based on current route
  useEffect(() => {
    if (isTeamPage) {
      setActiveSection("The Team");
    } else if (isHomePage && window.scrollY < 10) {
      setActiveSection("Hero");
    }
  }, [location.pathname, isHomePage, isTeamPage]);

  // Reset scroll position when navigating to home page
  useEffect(() => {
    if (isHomePage) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, [isHomePage]);

  const handleNavClick = (item: NavItem): void => {
    setMenuOpen(false);

    if (isHomePage) {
      // Already on home page, just scroll to section
      if (handleScrollComponent) {
        handleScrollComponent(item.section);
      }
    } else {
      // Navigate to home page first, then scroll
      navigate("/");
      // Wait for navigation and page render, then scroll
      setTimeout(() => {
        if (handleScrollComponent) {
          handleScrollComponent(item.section);
        }
      }, 100);
    }
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
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Determine if a nav item is active
  const isItemActive = (item: NavItem): boolean => {
    return activeSection === item.section;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="relative backdrop-blur-md bg-base-100/90 border-b border-primary/20 shadow-lg">
          {/* Subtle glow line at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <div
              className="w-auto h-12 cursor-pointer transition-transform hover:scale-110 duration-300"
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 0);
              }}
            >
              <Logo className="w-full h-full fill-current text-primary drop-shadow-[0_0_8px_rgba(var(--p),0.3)]" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item);

                return (
                  <button
                    onClick={() => handleNavClick(item)}
                    key={item.name}
                    className={`
                      relative px-4 py-2 rounded-lg font-medium font-mono transition-all duration-300
                      flex items-center gap-2 group
                      ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-base-content/70 hover:text-primary hover:bg-base-200"
                      }
                    `}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <Icon
                      size={18}
                      className="transition-transform group-hover:scale-110 duration-300"
                    />
                    <span>{item.name}</span>

                    {/* Simple underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                    )}
                  </button>
                );
              })}

              <div className="ml-2 pl-2 border-l border-primary/20">
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <button
                className="relative text-base-content hover:text-primary transition-all duration-300 p-2 hover:bg-primary/10 rounded-lg"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300
          ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-base-300/95 backdrop-blur-lg transition-opacity duration-300
            ${menuOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-base-100 shadow-2xl
            transition-transform duration-300 ease-out border-l border-primary/30
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Menu Content with proper spacing from navbar */}
          <nav className="flex flex-col h-full pt-20 px-6 pb-6">
            {/* Navigation Items */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isItemActive(item);

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`
                      w-full text-left px-5 py-4 rounded-xl font-semibold text-base font-mono
                      transition-all duration-300 flex items-center gap-4
                      ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                          : "text-base-content hover:bg-base-200 border border-transparent hover:border-primary/20"
                      }
                      ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}
                    `}
                    style={{
                      transitionDelay: menuOpen ? `${index * 50}ms` : "0ms",
                    }}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <Icon size={22} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className={`pt-4 mt-4 border-t border-primary/20 font-mono text-xs text-base-content/60 transition-all duration-300
              ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
            >
              <span className="text-primary">&gt;_</span> CyberNexus 2025
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
