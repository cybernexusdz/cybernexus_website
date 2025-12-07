import { useEffect, useState } from "react";
import { Cpu, Binary, LucideIcon } from "lucide-react";

interface Theme {
  name: string;
  robot: string;
  label: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const themes: Theme[] = [
  {
    name: "boyDark",
    robot: "boy",
    label: "Boy Mode",
    icon: Cpu,
    color: "text-cyan-400",
    glowColor: "from-cyan-400/50 to-blue-500/50",
  },
  {
    name: "girlDark",
    robot: "girl",
    label: "Girl Mode",
    icon: Binary,
    color: "text-fuchsia-400",
    glowColor: "from-fuchsia-400/50 to-pink-500/50",
  },
];

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const currentTheme: Theme = themes.find((t) => t.name === theme) || themes[0];
  const nextTheme: Theme = themes.find((t) => t.name !== theme) || themes[1];

  const handleToggle = (): void => {
    setIsAnimating(true);
    // Glitch effect before switching
    setTimeout(() => {
      setTheme(nextTheme.name);
      localStorage.setItem("robot", nextTheme.robot);
    }, 150);
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const CurrentIcon: LucideIcon = currentTheme.icon;

  return (
    <button
      onClick={handleToggle}
      className="relative group btn btn-square bg-transparent border-none overflow-hidden"
      aria-label={`Switch to ${nextTheme.label}`}
    >
      {/* Animated background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${currentTheme.glowColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl`}
      />
      {/* Border */}
      <div
        className={`absolute inset-0 border-2 ${
          isAnimating ? "border-primary animate-pulse" : "border-primary/30"
        } rounded-lg group-hover:border-primary/60 transition-all duration-300`}
      />
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50" />
      {/* Icon with glitch animation */}
      <div
        className={`relative transition-all duration-300 ${
          isAnimating
            ? "opacity-0 scale-50 blur-sm"
            : "opacity-100 scale-100 blur-0"
        }`}
      >
        <CurrentIcon
          className={`w-5 h-5 ${currentTheme.color} group-hover:scale-110 transition-transform duration-300`}
        />
      </div>
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan" />
      </div>
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <div className="relative bg-base-200/95 px-3 py-1.5 rounded-lg border border-primary/30 shadow-lg">
          <span className="text-xs font-mono font-bold text-primary">
            {nextTheme.label}
          </span>
          {/* Arrow */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-base-200/95 border-l border-t border-primary/30 rotate-45" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
