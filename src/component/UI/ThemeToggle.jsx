import { useState, useEffect } from "react";
import { Sun, Moon, Heart, Star } from "lucide-react"; // optional icons, included with DaisyUI setup

const themes = ["boyLight", "boyDark", "girlLight", "girlDark"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "boyLight"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
  };

  const renderIcon = () => {
    switch (theme) {
      case "boyLight":
        return <Sun className="w-5 h-5 text-blue-500" />;
      case "boyDark":
        return <Moon className="w-5 h-5 text-cyan-400" />;
      case "girlLight":
        return <Heart className="w-5 h-5 text-pink-500" />;
      case "girlDark":
        return <Star className="w-5 h-5 text-fuchsia-400" />;
      default:
        return null;
    }
  };

  const renderLabel = () => {
    switch (theme) {
      case "boyLight":
        return "Boy • Light";
      case "boyDark":
        return "Boy • Dark";
      case "girlLight":
        return "Girl • Light";
      case "girlDark":
        return "Girl • Dark";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggle}
        className="btn btn-primary flex items-center gap-2 transition-all duration-300"
      >
        {renderIcon()}
        {renderLabel()}
      </button>
    </div>
  );
}
